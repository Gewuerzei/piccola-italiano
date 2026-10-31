/* Piccola Italiano v0.15 · deterministic, local-first automatic lessons. */
'use strict';

const AUTO_TURN_LIMIT = 8;
const AUTO_HISTORY_LIMIT = 60;
const AUTO_DAY = 24 * 60 * 60 * 1000;
const AUTO_REVIEW_ID = 'auto-mixed-review';
const AUTO_REVIEW_LESSON = {
  id: AUTO_REVIEW_ID, unitId: null, order: 0, title: '把薄弱点放在一起练',
  goal: '回顾练过的课程中最近答错、跳过或需要提示的学习点。',
  explanation: [
    '先选最近需要帮助的学习点，尽量换一句同类题；不足八题时，用已练课程的其他题补足。',
    '每题会标出来源课程。一次只做一题，可以提示、跳过或暂停。',
    '这轮保存复习证据，不把零散的题目算作完成一整节新课。'
  ],
  example: {it: 'Un passo alla volta.', zh: '一步一步来。先看句子的意思，再按题目要求作答。'},
  speech: 'Un passo alla volta.'
};
const autoLesson = id => id === AUTO_REVIEW_ID ? AUTO_REVIEW_LESSON : AUTO_LESSONS.find(lesson => lesson.id === id) || null;
const autoQuestion = id => AUTO_QUESTIONS.find(question => question.id === id) || null;
const autoNormalize = value => String(value == null ? '' : value).normalize('NFC')
  .replace(/[’‘]/g, "'").replace(/，/g, ',').replace(/,(?!\d)/g, ' ')
  .trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '').trim().toLocaleLowerCase('it');

const autoIsReview = session => session?.kind === 'review' && session.lessonId === AUTO_REVIEW_ID;
const autoFocusKey = question => question.lessonId + '/' + question.focus;
const autoFocuses = lessonId => [...new Set(AUTO_QUESTIONS.filter(question => question.lessonId === lessonId).map(question => question.focus))];
const autoOwnsQuestion = (session, question) => !!question && (autoIsReview(session)
  ? session.reviewIds.includes(question.id) : question.lessonId === session.lessonId);

function autoStore() {
  if (!state.autoTutor || typeof state.autoTutor !== 'object' || Array.isArray(state.autoTutor)) {
    state.autoTutor = {active: null, history: []};
  }
  if (!Array.isArray(state.autoTutor.history)) state.autoTutor.history = [];
  if (!state.autoTutor.active || typeof state.autoTutor.active !== 'object') state.autoTutor.active = null;
  if (!state.autoTutor.records || typeof state.autoTutor.records !== 'object' || Array.isArray(state.autoTutor.records)) state.autoTutor.records = {};
  return state.autoTutor;
}

function autoNewSession(lessonId, now = Date.now(), variant = 0, reviewIds = null) {
  if (!autoLesson(lessonId)) return null;
  const review = lessonId === AUTO_REVIEW_ID;
  if (review && (!Array.isArray(reviewIds) || reviewIds.length !== AUTO_TURN_LIMIT
    || new Set(reviewIds).size !== AUTO_TURN_LIMIT || reviewIds.some(id => !autoQuestion(id)))) return null;
  return {
    id: 'auto-' + now.toString(36) + '-' + Math.random().toString(36).slice(2, 10),
    format: 1, lessonId, startedAt: now, phase: 'intro', level: 1,
    variant: Math.abs(Math.floor(variant)) % 4, currentId: null, answers: [],
    hintShown: false, scaffold: false, draft: '', streak: 0, misses: 0,
    ...(review ? {kind: 'review', reviewIds: reviewIds.slice()} : {})
  };
}

function autoCurrent(session) {
  return session ? autoQuestion(session.currentId) : null;
}

function autoChoose(session) {
  const used = new Set(session.answers.map(answer => answer.questionId));
  const pool = AUTO_QUESTIONS.filter(question => autoOwnsQuestion(session, question) && !used.has(question.id));
  if (!pool.length) return null;
  const key = question => autoIsReview(session) ? autoFocusKey(question) : question.focus;
  const focuses = autoIsReview(session)
    ? [...new Set(session.reviewIds.map(id => key(autoQuestion(id))))] : autoFocuses(session.lessonId);
  const rotated = focuses.slice(session.variant).concat(focuses.slice(0, session.variant));
  const counts = new Map(focuses.map(focus => [focus, 0]));
  session.answers.forEach(answer => {
    const question = autoQuestion(answer.questionId);
    if (question) counts.set(key(question), (counts.get(key(question)) || 0) + 1);
  });
  const last = session.answers[session.answers.length - 1];
  const before = session.answers[session.answers.length - 2];
  const lastFocus = last && key(autoQuestion(last.questionId));
  const beforeFocus = before && key(autoQuestion(before.questionId));
  // One immediate repair, then balance coverage so an error cannot trap a learner on one focus.
  const repair = last && !last.skipped && (!last.correct || last.hinted) && lastFocus !== beforeFocus ? lastFocus : null;
  const order = rotated.slice().sort((a, b) => (counts.get(a) - counts.get(b)) || rotated.indexOf(a) - rotated.indexOf(b));
  if (repair && pool.some(question => key(question) === repair)) {
    order.splice(order.indexOf(repair), 1);
    order.unshift(repair);
  }
  return pool.sort((a, b) => order.indexOf(key(a)) - order.indexOf(key(b))
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
  if (!autoOwnsQuestion(session, question)
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
    focuses: [...new Set(unaided.map(answer => {
      const question = autoQuestion(answer.questionId);
      return question && (autoIsReview(session) ? autoFocusKey(question) : question.focus);
    }).filter(Boolean))],
    controlled: unaided.filter(answer => autoQuestion(answer.questionId)?.evidence === 'controlled_production').length
  };
}

function autoSanitizeSession(raw, completed = false) {
  if (!raw || typeof raw !== 'object' || raw.format !== 1
    || typeof raw.id !== 'string' || !/^auto-[a-z0-9-]{3,90}$/.test(raw.id)
    || !autoLesson(raw.lessonId) || !Number.isSafeInteger(raw.startedAt) || raw.startedAt < 1
    || !Number.isInteger(raw.variant) || raw.variant < 0 || raw.variant > 3
    || !Array.isArray(raw.answers) || raw.answers.length > AUTO_TURN_LIMIT) return null;
  if (raw.lessonId === AUTO_REVIEW_ID ? raw.kind !== 'review' : raw.kind != null && raw.kind !== 'lesson') return null;
  const session = autoNewSession(raw.lessonId, raw.startedAt, raw.variant, raw.reviewIds);
  if (!session) return null;
  session.id = raw.id;
  const seen = new Set();
  for (const answer of raw.answers) {
    if (!answer || typeof answer !== 'object' || seen.has(answer.questionId)) return null;
    const question = autoQuestion(answer.questionId);
    if (!autoOwnsQuestion(session, question) || typeof answer.answer !== 'string'
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
    if (!autoOwnsQuestion(session, question)) return null;
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

function autoRememberRun(run, records = autoStore().records) {
  if (autoIsReview(run)) return;
  const prior = records[run.lessonId];
  if (!prior || run.completedAt > prior.completedAt) records[run.lessonId] = run;
}

function autoLessonRecords() {
  return autoStore().records;
}

function autoLessonStatus(lessonId, now = Date.now()) {
  const run = autoLessonRecords()[lessonId] || null;
  const stats = autoStats(run);
  const interval = stats.unaided >= 6 && stats.focuses.length === autoFocuses(lessonId).length ? 2 : 1;
  const dueAt = run ? run.completedAt + interval * AUTO_DAY : null;
  return {run, practiced: !!run, stats, dueAt, due: dueAt != null && dueAt <= now};
}

function autoRestore() {
  const store = autoStore();
  const history = new Map();
  for (const raw of store.history) {
    const run = autoSanitizeSession(raw, true);
    if (run && !history.has(run.id)) history.set(run.id, run);
  }
  const records = {};
  const identities = new Map(history);
  for (const lesson of AUTO_LESSONS) {
    const run = autoSanitizeSession(store.records[lesson.id], true);
    if (!run || run.lessonId !== lesson.id || autoIsReview(run)) continue;
    const existing = identities.get(run.id);
    if (existing && existing.lessonId !== run.lessonId) continue;
    autoRememberRun(existing || run, records);
    if (!existing) identities.set(run.id, run);
  }
  if (store.active?.phase === 'done') {
    const completed = autoSanitizeSession(store.active, true);
    if (completed && !identities.has(completed.id)) history.set(completed.id, completed);
    store.active = null;
  } else store.active = autoSanitizeSession(store.active);
  // Migrate v0.14 history into durable per-lesson records before trimming recent runs.
  history.forEach(run => autoRememberRun(run, records));
  store.records = records;
  store.history = [...history.values()].sort((a, b) => a.completedAt - b.completedAt).slice(-AUTO_HISTORY_LIMIT);
  if (store.active && (history.has(store.active.id) || identities.has(store.active.id))) store.active = null;
}

function autoImportFromBackup(incoming) {
  if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) return;
  const store = autoStore();
  const history = new Map(store.history.map(run => [run.id, run]));
  const identities = new Map(history);
  Object.values(store.records).forEach(run => { if (!identities.has(run.id)) identities.set(run.id, run); });
  function accept(raw, recordKey = null) {
    const run = autoSanitizeSession(raw, true);
    if (!run || (recordKey && (run.lessonId !== recordKey || autoIsReview(run))) || store.active?.id === run.id) return;
    // Local records, including those outside the rolling history, win ID collisions.
    const existing = identities.get(run.id);
    if (existing) return;
    identities.set(run.id, run);
    autoRememberRun(run);
    if (!recordKey) history.set(run.id, run);
  }
  for (const raw of Array.isArray(incoming.history) ? incoming.history.slice(-AUTO_HISTORY_LIMIT) : []) accept(raw);
  if (incoming.records && typeof incoming.records === 'object' && !Array.isArray(incoming.records)) {
    for (const lesson of AUTO_LESSONS) accept(incoming.records[lesson.id], lesson.id);
  }
  store.history = [...history.values()].sort((a, b) => a.completedAt - b.completedAt).slice(-AUTO_HISTORY_LIMIT);
  if (!store.active) {
    const active = autoSanitizeSession(incoming.active);
    if (active && !identities.has(active.id)) store.active = active;
  }
}

function autoFinish(session) {
  const run = autoSanitizeSession(session, true);
  if (!run) return false;
  const store = autoStore();
  const existing = store.history.find(item => item.id === run.id)
    || Object.values(store.records).find(item => item.id === run.id);
  if (existing && existing.lessonId !== run.lessonId) return false;
  if (!existing) {
    store.history.push(run);
    store.history.sort((a, b) => a.completedAt - b.completedAt);
    store.history = store.history.slice(-AUTO_HISTORY_LIMIT);
  }
  autoRememberRun(existing || run);
  if (store.active?.id === run.id) store.active = null;
  return true;
}

function autoLastRun() {
  const history = autoStore().history;
  return history[history.length - 1] || null;
}

function autoReviewPlan() {
  const store = autoStore();
  const practiced = new Set(Object.keys(store.records));
  if (!practiced.size) return [];
  const runs = new Map(Object.values(store.records).map(run => [run.id, run]));
  store.history.forEach(run => runs.set(run.id, run));
  const latest = new Map(), seen = new Set();
  [...runs.values()].sort((a, b) => a.completedAt - b.completedAt).forEach(run => {
    run.answers.forEach(answer => {
      const question = autoQuestion(answer.questionId);
      if (!question || !practiced.has(question.lessonId)) return;
      seen.add(question.id);
      const key = autoFocusKey(question), prior = latest.get(key);
      if (!prior || answer.ts >= prior.answer.ts) latest.set(key, {question, answer});
    });
  });
  const weak = [...latest.values()].filter(item => !item.answer.correct || item.answer.hinted || item.answer.skipped)
    .sort((a, b) => b.answer.ts - a.answer.ts || autoFocusKey(a.question).localeCompare(autoFocusKey(b.question)));
  if (!weak.length) return [];
  // Round-robin source lessons so one busy lesson cannot hide the others.
  const groups = new Map();
  weak.forEach(item => {
    if (!groups.has(item.question.lessonId)) groups.set(item.question.lessonId, []);
    groups.get(item.question.lessonId).push(item);
  });
  const focuses = [];
  while ([...groups.values()].some(group => group.length)) {
    groups.forEach(group => { if (group.length) focuses.push(group.shift()); });
  }
  const plan = [], selected = new Set();
  function choose(pool, level) {
    return pool.filter(question => !selected.has(question.id)).sort((a, b) => Number(seen.has(a.id)) - Number(seen.has(b.id))
      || Math.abs(a.level - level) - Math.abs(b.level - level) || a.level - b.level || a.id.localeCompare(b.id))[0];
  }
  function add(question) {
    if (question && plan.length < AUTO_TURN_LIMIT) { plan.push(question.id); selected.add(question.id); }
  }
  // One fresh equivalent per focus first; remaining slots can revisit a focus in another form.
  for (let pass = 0; pass < 3 && plan.length < AUTO_TURN_LIMIT; pass++) {
    for (const item of focuses) {
      add(choose(AUTO_QUESTIONS.filter(question => autoFocusKey(question) === autoFocusKey(item.question)), item.question.level));
    }
  }
  if (plan.length < AUTO_TURN_LIMIT) {
    const pool = AUTO_QUESTIONS.filter(question => practiced.has(question.lessonId));
    while (plan.length < AUTO_TURN_LIMIT) {
      const question = choose(pool, 2);
      if (!question) break;
      add(question);
    }
  }
  return plan.length === AUTO_TURN_LIMIT ? plan : [];
}

function autoReviewAvailable() {
  return autoReviewPlan().length === AUTO_TURN_LIMIT;
}

function autoRecommendation(now = Date.now()) {
  const store = autoStore();
  if (store.active) return {lesson: autoLesson(store.active.lessonId), reason: '接着上次的位置继续。', reviewAt: null};
  const lessons = AUTO_LESSONS.filter(lesson => COURSE_UNITS.some(unit => unit.id === lesson.unitId && unit.status === 'ready'))
    .slice().sort((a, b) => a.order - b.order);
  const last = autoLastRun();
  const previous = store.history[store.history.length - 2];
  if (last && !autoIsReview(last) && autoStats(last).answered && autoStats(last).unaided < 4 && previous?.lessonId !== last.lessonId) {
    return {lesson: autoLesson(last.lessonId), reason: '刚才还有几处需要提示，换一些句子再稳一遍。', reviewAt: null};
  }
  const due = lessons.map(lesson => ({lesson, ...autoLessonStatus(lesson.id, now)}))
    .filter(item => item.practiced).sort((a, b) => a.dueAt - b.dueAt);
  const review = due.find(item => item.due);
  if (review) return {lesson: review.lesson, reason: '这节到了回顾时间，看看隔了一段时间还能不能用出来。', reviewAt: review.dueAt};
  const recentCourse = Object.values(store.records).sort((a, b) => b.completedAt - a.completedAt)[0];
  const nextOrder = recentCourse ? autoLesson(recentCourse.lessonId).order : 0;
  // Continue an existing learner's route before wrapping to newly added foundations.
  const unseen = lessons.find(lesson => lesson.order > nextOrder && !store.records[lesson.id])
    || lessons.find(lesson => !store.records[lesson.id]);
  if (unseen) return {lesson: unseen, reason: recentCourse ? '沿课程路线进入下一节；基础课也可以随时从目录补练。' : '从句子骨架开始，短讲解后逐题练；也可以在目录选择起点。', reviewAt: null};
  const next = due[0];
  return {lesson: next?.lesson || lessons[0] || null,
    reason: next ? '当前可学课程都练过了；可以回顾薄弱点，或下次回来复习。' : '课程正在准备。', reviewAt: next?.dueAt || null};
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

function autoStartReview() {
  const store = autoStore();
  if (store.active) return false;
  const plan = autoReviewPlan();
  if (plan.length !== AUTO_TURN_LIMIT) return false;
  const count = store.history.filter(autoIsReview).length;
  store.active = autoNewSession(AUTO_REVIEW_ID, Date.now(), count % 4, plan);
  return !!store.active;
}

function autoSpeechText(kind, id) {
  const item = kind === 'lesson' ? autoLesson(id) : kind === 'question' ? autoQuestion(id) : null;
  const text = item?.speech || (kind === 'lesson' ? item?.example?.it : item?.answerLabel) || '';
  if (typeof text !== 'string' || /[\u3400-\u9fff]/.test(text)) return '';
  return text.replace(/\s*→\s*/g, '. ').slice(0, 600);
}

function autoStopSpeech() {
  if (window.speechSynthesis && typeof window.speechSynthesis.cancel === 'function') window.speechSynthesis.cancel();
}

function autoSpeak(kind, id) {
  const text = autoSpeechText(kind, id);
  if (!text) return;
  if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== 'function') {
    toast('当前设备不支持系统朗读；仍可完成文字练习。'); return;
  }
  const voices = window.speechSynthesis.getVoices().filter(voice => /^it(?:[-_]|$)/i.test(voice.lang))
    .sort((a, b) => Number(b.localService === true) - Number(a.localService === true)
      || Number(/^it-IT$/i.test(b.lang)) - Number(/^it-IT$/i.test(a.lang)));
  if (!voices.length) { toast('当前没有可用的意大利语语音；可以稍后重试，或继续文字练习。'); return; }
  autoStopSpeech();
  const utterance = new window.SpeechSynthesisUtterance(text);
  utterance.voice = voices[0]; utterance.lang = voices[0].lang; utterance.rate = 0.85;
  utterance.onerror = event => {
    if (!['canceled', 'interrupted'].includes(event.error)) toast('这次朗读未能播放；文字练习和进度不受影响。');
  };
  try { window.speechSynthesis.speak(utterance); }
  catch (_) { toast('这次朗读未能播放；文字练习和进度不受影响。'); }
}

function autoAction(name, button) {
  if (!name.startsWith('auto-')) return false;
  if (name === 'auto-speak') { autoSpeak(button?.dataset?.kind, button?.dataset?.id); return true; }
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
    case 'auto-review':
      if (session) { toast('先继续当前小课；暂停不会丢失进度。'); return true; }
      if (!autoReviewAvailable()) { toast('完成课程后，这里会汇集需要再练的学习点。'); return true; }
      if (!autoOpenView()) return true;
      autoStartReview();
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
  autoStopSpeech(); save(); autoRender(); return true;
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
    if (!lesson.explanation?.length || !lesson.example?.it || !lesson.goal || !Number.isInteger(lesson.order)) issues.push('缺少讲解：' + lesson.id);
    const focuses = autoFocuses(lesson.id);
    if (focuses.length !== 4 || focuses.some(focus => !lesson.focusLabels?.[focus])) issues.push('学习点定义：' + lesson.id);
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
      || !['choice', 'text'].includes(question.type) || !/^[a-z][a-z0-9_-]{0,48}$/.test(question.focus)
      || !question.prompt || !question.explanation || !question.hint || !question.answerLabel
      || !Array.isArray(question.answers) || !question.answers.length
      || question.answers.some(answer => typeof answer !== 'string' || !answer.trim() || answer.length > 200)) issues.push('题目格式：' + question.id);
    if (question.type === 'choice' && (!question.choices?.length
      || question.choices.filter(choice => question.answers.some(answer => autoNormalize(answer) === autoNormalize(choice))).length !== 1)) issues.push('选择题答案：' + question.id);
    if (question.evidence !== (question.type === 'choice' ? 'recognition' : 'controlled_production')) issues.push('证据类型：' + question.id);
  }
  for (const lesson of AUTO_LESSONS) {
    const pool = AUTO_QUESTIONS.filter(question => question.lessonId === lesson.id);
    if (pool.length < AUTO_TURN_LIMIT) issues.push('题量不足：' + lesson.id);
    for (const level of [1, 2, 3]) for (const focus of autoFocuses(lesson.id)) {
      if (!pool.some(question => question.level === level && question.focus === focus)) issues.push('覆盖不足：' + lesson.id + '/' + level + '/' + focus);
    }
  }
  return issues;
}
