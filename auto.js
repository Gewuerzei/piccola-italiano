/* Piccola Italiano v0.14 · deterministic, local-first automatic lessons. */
'use strict';

const AUTO_TURN_LIMIT = 8;
const AUTO_HISTORY_LIMIT = 60;
const AUTO_DAY = 24 * 60 * 60 * 1000;
const autoLesson = id => AUTO_LESSONS.find(lesson => lesson.id === id) || null;
const autoQuestion = id => AUTO_QUESTIONS.find(question => question.id === id) || null;
const autoNormalize = value => String(value == null ? '' : value).normalize('NFC')
  .replace(/[’‘]/g, "'").trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '').trim().toLocaleLowerCase('it');

function autoStore() {
  if (!state.autoTutor || typeof state.autoTutor !== 'object' || Array.isArray(state.autoTutor)) {
    state.autoTutor = {active: null, history: []};
  }
  if (!Array.isArray(state.autoTutor.history)) state.autoTutor.history = [];
  if (!state.autoTutor.active || typeof state.autoTutor.active !== 'object') state.autoTutor.active = null;
  return state.autoTutor;
}

function autoNewSession(lessonId, now = Date.now(), variant = 0) {
  if (!autoLesson(lessonId)) return null;
  return {
    id: 'auto-' + now.toString(36) + '-' + Math.random().toString(36).slice(2, 10),
    format: 1, lessonId, startedAt: now, phase: 'intro', level: 1,
    variant: Math.abs(Math.floor(variant)) % 4, currentId: null, answers: [],
    hintShown: false, scaffold: false, draft: '', streak: 0, misses: 0
  };
}

function autoCurrent(session) {
  return session ? autoQuestion(session.currentId) : null;
}

function autoChoose(session) {
  const used = new Set(session.answers.map(answer => answer.questionId));
  const pool = AUTO_QUESTIONS.filter(question => question.lessonId === session.lessonId && !used.has(question.id));
  if (!pool.length) return null;
  const focuses = ['lo', 'la', 'li', 'le'];
  const rotated = focuses.slice(session.variant).concat(focuses.slice(0, session.variant));
  const counts = new Map(focuses.map(focus => [focus, 0]));
  session.answers.forEach(answer => {
    const question = autoQuestion(answer.questionId);
    if (question) counts.set(question.focus, (counts.get(question.focus) || 0) + 1);
  });
  const last = session.answers[session.answers.length - 1];
  const before = session.answers[session.answers.length - 2];
  const lastFocus = last && autoQuestion(last.questionId)?.focus;
  const beforeFocus = before && autoQuestion(before.questionId)?.focus;
  // One immediate repair, then balance coverage so errors cannot trap a learner on one pronoun.
  const repair = last && !last.skipped && (!last.correct || last.hinted) && lastFocus !== beforeFocus ? lastFocus : null;
  const order = rotated.slice().sort((a, b) => (counts.get(a) - counts.get(b)) || rotated.indexOf(a) - rotated.indexOf(b));
  if (repair && pool.some(question => question.focus === repair)) {
    order.splice(order.indexOf(repair), 1);
    order.unshift(repair);
  }
  return pool.sort((a, b) => order.indexOf(a.focus) - order.indexOf(b.focus)
    || Math.abs(a.level - session.level) - Math.abs(b.level - session.level)
    || a.level - b.level || a.id.localeCompare(b.id))[0];
}

function autoBegin(session) {
  if (!session || session.phase !== 'intro') return false;
  const question = autoChoose(session);
  if (!question) return false;
  session.currentId = question.id;
  session.phase = 'question';
  return true;
}

function autoRecord(session, questionId, answer, options = {}) {
  if (!session || session.phase !== 'question' || questionId !== session.currentId
    || session.answers.length >= AUTO_TURN_LIMIT) return false;
  const question = autoCurrent(session);
  if (!question || question.lessonId !== session.lessonId
    || session.answers.some(item => item.questionId === questionId)) return false;
  const skipped = options.skip === true;
  const text = skipped ? '' : String(answer == null ? '' : answer).trim().slice(0, 200);
  if (!skipped && !text) return false;
  const correct = !skipped && question.answers.some(value => autoNormalize(value) === autoNormalize(text));
  const hinted = session.hintShown === true || session.scaffold === true;
  session.answers.push({questionId, answer: text, correct, skipped, hinted,
    evidence: question.evidence, ts: Math.max(session.startedAt, session.answers[session.answers.length - 1]?.ts || 0, Number(options.now) || Date.now())});
  if (correct && !hinted) {
    session.streak += 1;
    session.misses = 0;
    session.scaffold = false;
    if (session.streak >= 2) { session.level = Math.min(3, session.level + 1); session.streak = 0; }
  } else {
    session.streak = 0;
    if (skipped || correct) { session.misses = 0; session.scaffold = false; }
    else {
      session.misses += 1;
      if (session.misses >= 2) { session.level = Math.max(1, session.level - 1); session.scaffold = true; }
    }
  }
  session.draft = text;
  session.phase = 'feedback';
  return true;
}

function autoAdvance(session, questionId, now = Date.now()) {
  if (!session || session.phase !== 'feedback' || session.currentId !== questionId) return false;
  if (session.answers.length >= AUTO_TURN_LIMIT) {
    session.phase = 'done';
    session.completedAt = Math.max(now, session.answers[session.answers.length - 1].ts);
    session.draft = '';
    return true;
  }
  const question = autoChoose(session);
  if (!question) return false;
  session.currentId = question.id;
  session.hintShown = false;
  session.draft = '';
  session.phase = 'question';
  return true;
}

function autoStats(session) {
  const answers = session?.answers || [];
  const unaided = answers.filter(answer => answer.correct && !answer.hinted && !answer.skipped);
  return {
    answered: answers.filter(answer => !answer.skipped).length,
    correct: answers.filter(answer => answer.correct && !answer.skipped).length,
    unaided: unaided.length,
    helped: answers.filter(answer => answer.hinted && !answer.skipped).length,
    skipped: answers.filter(answer => answer.skipped).length,
    focuses: [...new Set(unaided.map(answer => autoQuestion(answer.questionId)?.focus).filter(Boolean))],
    controlled: unaided.filter(answer => autoQuestion(answer.questionId)?.evidence === 'controlled_production').length
  };
}

function autoSanitizeSession(raw, completed = false) {
  if (!raw || typeof raw !== 'object' || raw.format !== 1
    || typeof raw.id !== 'string' || !/^auto-[a-z0-9-]{3,90}$/.test(raw.id)
    || !autoLesson(raw.lessonId) || !Number.isSafeInteger(raw.startedAt) || raw.startedAt < 1
    || !Number.isInteger(raw.variant) || raw.variant < 0 || raw.variant > 3
    || !Array.isArray(raw.answers) || raw.answers.length > AUTO_TURN_LIMIT) return null;
  const session = autoNewSession(raw.lessonId, raw.startedAt, raw.variant);
  session.id = raw.id;
  const seen = new Set();
  for (const answer of raw.answers) {
    if (!answer || typeof answer !== 'object' || seen.has(answer.questionId)) return null;
    const question = autoQuestion(answer.questionId);
    if (!question || question.lessonId !== raw.lessonId || typeof answer.answer !== 'string'
      || answer.answer.length > 200 || !Number.isSafeInteger(answer.ts) || answer.ts < (session.answers[session.answers.length - 1]?.ts || raw.startedAt)
      || typeof answer.skipped !== 'boolean' || typeof answer.hinted !== 'boolean') return null;
    if (question.type === 'choice' && !answer.skipped
      && !question.choices.some(choice => autoNormalize(choice) === autoNormalize(answer.answer))) return null;
    session.currentId = question.id;
    session.phase = 'question';
    session.hintShown = answer.hinted;
    if (!autoRecord(session, question.id, answer.answer, {skip: answer.skipped, now: answer.ts})) return null;
    seen.add(question.id);
  }
  if (completed) {
    if (raw.phase !== 'done' || session.answers.length !== AUTO_TURN_LIMIT
      || !Number.isSafeInteger(raw.completedAt) || raw.completedAt < session.answers[session.answers.length - 1].ts) return null;
    session.phase = 'done';
    session.completedAt = raw.completedAt;
    session.draft = '';
    return session;
  }
  if (!['intro', 'question', 'feedback'].includes(raw.phase)) return null;
  if (raw.phase === 'intro') {
    if (session.answers.length || raw.currentId != null) return null;
    session.currentId = null;
  } else {
    const question = autoQuestion(raw.currentId);
    if (!question || question.lessonId !== raw.lessonId) return null;
    if (raw.phase === 'question' && (seen.has(question.id) || session.answers.length >= AUTO_TURN_LIMIT)) return null;
    if (raw.phase === 'feedback' && session.answers[session.answers.length - 1]?.questionId !== question.id) return null;
    session.currentId = question.id;
  }
  session.phase = raw.phase;
  session.hintShown = raw.phase === 'feedback' ? session.answers[session.answers.length - 1].hinted : raw.hintShown === true;
  session.draft = raw.phase === 'feedback' ? session.answers[session.answers.length - 1].answer
    : String(raw.draft || '').slice(0, 200);
  return session;
}

function autoRestore() {
  const store = autoStore();
  const history = new Map();
  for (const raw of store.history) {
    const run = autoSanitizeSession(raw, true);
    if (run && !history.has(run.id)) history.set(run.id, run);
  }
  store.history = [...history.values()].sort((a, b) => a.completedAt - b.completedAt).slice(-AUTO_HISTORY_LIMIT);
  if (store.active?.phase === 'done') {
    const completed = autoSanitizeSession(store.active, true);
    if (completed && !store.history.some(run => run.id === completed.id)) {
      store.history.push(completed);
      store.history.sort((a, b) => a.completedAt - b.completedAt);
      store.history = store.history.slice(-AUTO_HISTORY_LIMIT);
    }
    store.active = null;
  } else store.active = autoSanitizeSession(store.active);
  if (store.active && store.history.some(run => run.id === store.active.id)) store.active = null;
}

function autoImportFromBackup(incoming) {
  if (!incoming || typeof incoming !== 'object') return;
  const store = autoStore();
  const history = new Map(store.history.map(run => [run.id, run]));
  for (const raw of Array.isArray(incoming.history) ? incoming.history.slice(-AUTO_HISTORY_LIMIT) : []) {
    const run = autoSanitizeSession(raw, true);
    // Local records and an active local attempt always win ID collisions.
    if (run && !history.has(run.id) && store.active?.id !== run.id) history.set(run.id, run);
  }
  store.history = [...history.values()].sort((a, b) => a.completedAt - b.completedAt).slice(-AUTO_HISTORY_LIMIT);
  if (!store.active) {
    const active = autoSanitizeSession(incoming.active);
    if (active && !history.has(active.id)) store.active = active;
  }
}

function autoFinish(session) {
  const run = autoSanitizeSession(session, true);
  if (!run) return false;
  const store = autoStore();
  if (!store.history.some(existing => existing.id === run.id)) {
    store.history.push(run);
    store.history.sort((a, b) => a.completedAt - b.completedAt);
    store.history = store.history.slice(-AUTO_HISTORY_LIMIT);
  }
  if (store.active?.id === run.id) store.active = null;
  return true;
}

function autoLastRun() {
  const history = autoStore().history;
  return history[history.length - 1] || null;
}

function autoRecommendation(now = Date.now()) {
  const store = autoStore();
  if (store.active) return {lesson: autoLesson(store.active.lessonId), reason: '接着上次的位置继续。', reviewAt: null};
  const lessons = AUTO_LESSONS.filter(lesson => COURSE_UNITS.some(unit => unit.id === lesson.unitId && unit.status === 'ready'))
    .slice().sort((a, b) => a.order - b.order);
  const last = autoLastRun();
  const previous = store.history[store.history.length - 2];
  if (last && autoStats(last).answered && autoStats(last).unaided < 4 && previous?.lessonId !== last.lessonId) {
    return {lesson: autoLesson(last.lessonId), reason: '刚才还有几处需要提示，换一些句子再稳一遍。', reviewAt: null};
  }
  const latest = new Map();
  store.history.forEach(run => latest.set(run.lessonId, run));
  const due = lessons.map(lesson => {
    const run = latest.get(lesson.id);
    const stats = autoStats(run);
    return {lesson, run, reviewAt: run ? run.completedAt + (stats.unaided >= 6 && stats.focuses.length === 4 ? 2 : 1) * AUTO_DAY : null};
  }).filter(item => item.run).sort((a, b) => a.reviewAt - b.reviewAt);
  const review = due.find(item => item.reviewAt <= now);
  if (review) return {lesson: review.lesson, reason: '这节到了回顾时间，看看隔了一段时间还能不能用出来。', reviewAt: review.reviewAt};
  const unseen = lessons.find(lesson => !latest.has(lesson.id));
  if (unseen) return {lesson: unseen, reason: last ? '接着用到新的句子里。' : '从 lo / la / li / le 开始，短讲解后逐题练。', reviewAt: null};
  const next = due[0];
  return {lesson: next?.lesson || lessons[0] || null,
    reason: next ? '首批小课都练过了；可以再巩固一轮，或下次回来复习。' : '课程正在准备。', reviewAt: next?.reviewAt || null};
}

function autoOpenView(catalog = false) {
  if (ui.exam) { toast('请先完成或退出当前驾考模拟。'); return false; }
  ui.tab = 'home'; ui.autoOpen = true; ui.autoCatalog = catalog;
  ui.detailId = null; ui.transferOpen = false; ui.bridgeOpen = false;
  ui.pathwayOpen = false; ui.placementOpen = false;
  return true;
}

function autoRender() {
  render();
  const heading = document.querySelector('#auto-heading');
  if (heading && typeof heading.focus === 'function') heading.focus({preventScroll: true});
}

function autoCaptureDraft(value) {
  const session = autoStore().active;
  if (!session || session.phase !== 'question' || autoCurrent(session)?.type !== 'text') return;
  const input = value == null ? document.querySelector('#auto-answer')?.value : value;
  if (input != null) session.draft = String(input).slice(0, 200);
}

function autoStart(lessonId) {
  const store = autoStore();
  if (store.active) return false;
  const count = store.history.filter(run => run.lessonId === lessonId).length;
  store.active = autoNewSession(lessonId, Date.now(), count % 4);
  return !!store.active;
}

function autoAction(name, button) {
  if (!name.startsWith('auto-')) return false;
  const store = autoStore();
  const session = store.active;
  const id = button?.dataset?.id;
  switch (name) {
    case 'auto-open': case 'auto-continue':
      if (!autoOpenView()) return true;
      if (!session) autoStart(autoRecommendation().lesson?.id);
      break;
    case 'auto-catalog':
      autoCaptureDraft();
      if (!autoOpenView(true)) return true;
      break;
    case 'auto-back':
      ui.autoCatalog = false;
      break;
    case 'auto-pause':
      autoCaptureDraft(); save(); nav('home'); return true;
    case 'auto-lesson':
      if (session) { toast('先继续当前小课；暂停不会丢失进度。'); return true; }
      if (!AUTO_LESSONS.some(lesson => lesson.id === id)) return true;
      if (!autoOpenView()) return true;
      autoStart(id);
      break;
    case 'auto-begin':
      if (!autoBegin(session)) return true;
      break;
    case 'auto-hint':
      if (!session || session.phase !== 'question' || session.currentId !== id) return true;
      autoCaptureDraft();
      session.hintShown = true;
      break;
    case 'auto-choice': {
      const question = autoCurrent(session);
      const choice = Number(button.dataset.choice);
      if (!question || question.type !== 'choice' || !Number.isInteger(choice) || choice < 0 || choice >= question.choices.length) return true;
      if (!autoRecord(session, id, question.choices[choice])) return true;
      break;
    }
    case 'auto-submit': {
      if (autoCurrent(session)?.type !== 'text') return true;
      const answer = document.querySelector('#auto-answer')?.value || '';
      if (!answer.trim()) { toast('先写一个答案，或选择“这题先跳过”。'); return true; }
      if (!autoRecord(session, id, answer)) return true;
      break;
    }
    case 'auto-skip':
      if (!autoRecord(session, id, '', {skip: true})) return true;
      break;
    case 'auto-next':
      if (!autoAdvance(session, id)) return true;
      if (session.phase === 'done') autoFinish(session);
      break;
    default: return false;
  }
  save(); autoRender(); return true;
}

function autoValidateContent() {
  const issues = [], units = new Map(), lessons = new Map(), questions = new Set();
  const nodeIds = new Set(CURRICULUM_NODES.map(node => node.id));
  for (const unit of COURSE_UNITS) {
    if (!unit.id || units.has(unit.id)) issues.push('重复课程 ID：' + unit.id);
    units.set(unit.id, unit);
    if (!unit.title || !unit.objective || ![1, 2, 3, 4, 5].includes(unit.layer)
      || !['core', 'explore'].includes(unit.track) || !['ready', 'planned'].includes(unit.status)) issues.push('课程格式：' + unit.id);
    for (const id of unit.nodeRefs) if (!nodeIds.has(id)) issues.push('知识图引用：' + unit.id + ' → ' + id);
  }
  for (const lesson of AUTO_LESSONS) {
    if (!lesson.id || lessons.has(lesson.id)) issues.push('重复小课 ID：' + lesson.id);
    lessons.set(lesson.id, lesson);
    if (!units.has(lesson.unitId) || !units.get(lesson.unitId).lessonIds.includes(lesson.id)) issues.push('小课归属：' + lesson.id);
    if (!lesson.explanation?.length || !lesson.example?.it || !lesson.goal) issues.push('缺少讲解：' + lesson.id);
  }
  for (const unit of COURSE_UNITS) {
    for (const id of unit.prereq) if (!units.has(id)) issues.push('先修引用：' + unit.id + ' → ' + id);
    for (const id of unit.lessonIds) if (!lessons.has(id)) issues.push('小课引用：' + unit.id + ' → ' + id);
    if (unit.status === 'ready' && !unit.lessonIds.length) issues.push('可学课程没有内容：' + unit.id);
  }
  const done = new Set(), visiting = new Set();
  function visit(id) {
    if (visiting.has(id)) { issues.push('先修关系成环：' + id); return; }
    if (done.has(id)) return;
    visiting.add(id);
    (units.get(id)?.prereq || []).filter(next => units.has(next)).forEach(visit);
    visiting.delete(id); done.add(id);
  }
  units.forEach((_, id) => visit(id));
  for (const question of AUTO_QUESTIONS) {
    if (!question.id || questions.has(question.id)) issues.push('重复题目 ID：' + question.id);
    questions.add(question.id);
    if (!lessons.has(question.lessonId) || ![1, 2, 3].includes(question.level)
      || !['choice', 'text'].includes(question.type) || !['lo', 'la', 'li', 'le'].includes(question.focus)
      || !question.prompt || !question.explanation || !question.hint || !question.answers?.length) issues.push('题目格式：' + question.id);
    if (question.type === 'choice' && (!question.choices?.length
      || question.choices.filter(choice => question.answers.some(answer => autoNormalize(answer) === autoNormalize(choice))).length !== 1)) issues.push('选择题答案：' + question.id);
    if (question.evidence !== (question.type === 'choice' ? 'recognition' : 'controlled_production')) issues.push('证据类型：' + question.id);
  }
  for (const lesson of AUTO_LESSONS) {
    const pool = AUTO_QUESTIONS.filter(question => question.lessonId === lesson.id);
    if (pool.length < AUTO_TURN_LIMIT) issues.push('题量不足：' + lesson.id);
    for (const level of [1, 2, 3]) for (const focus of ['lo', 'la', 'li', 'le']) {
      if (!pool.some(question => question.level === level && question.focus === focus)) issues.push('覆盖不足：' + lesson.id + '/' + level + '/' + focus);
    }
  }
  return issues;
}
