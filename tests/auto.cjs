/* Run with: node tests/auto.cjs
 * Automatic-learning state-machine checks. Uses the app/DOM/storage doubles
 * in regression.cjs; does not claim browser, voice, or iPhone verification.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {app} = require('./regression.cjs');
const root = path.resolve(__dirname, '..');
const clone = value => JSON.parse(JSON.stringify(value));
let passed = 0;
async function check(name, body) {
  await body(); passed++; console.log('PASS ' + name);
}
async function make(saved) {
  const a = await app(saved);
  // Also supports running during integration before index.html is updated.
  if (a.run('typeof autoNewSession') === 'undefined') {
    for (const file of ['course-data.js', 'auto.js'])
      vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), a.context, {filename: file});
    a.run('autoRestore()');
  }
  return a;
}
function start(a, lessonId, variant = 0, time = 1000000) {
  a.context.__lesson = lessonId;
  a.context.__variant = variant;
  a.context.__time = time;
  a.run('__session=autoNewSession(__lesson,__time,__variant)');
  assert.equal(a.run('__session.phase'), 'intro');
  assert.equal(a.run('autoBegin(__session)'), true);
  return a.data('__session');
}
function answer(a, kind = 'correct', index = 0) {
  const q = a.data('autoCurrent(__session)');
  const wrong = q.type === 'choice'
    ? q.choices.find(choice => !q.answers.includes(choice)) : 'risposta non corretta';
  assert.ok(kind !== 'wrong' || wrong, 'question needs a meaningful wrong answer');
  a.context.__answer = kind === 'wrong' ? wrong : q.answers[0];
  a.context.__skip = kind === 'skip';
  a.context.__questionId = q.id;
  if (kind === 'hinted') a.run('__session.hintShown=true');
  a.run('__now=__session.startedAt+(__session.answers.length+1)*1000');
  assert.equal(a.run('autoRecord(__session,__questionId,__answer,{skip:__skip,now:__now})'), true);
  assert.equal(a.run('__session.phase'), 'feedback');
  return {q, index};
}
function advance(a) {
  return a.run('autoAdvance(__session,__session.currentId,__session.startedAt+__session.answers.length*1000+1)');
}
function complete(a, lessonId, mode = 'correct', variant = 0, time = 1000000) {
  start(a, lessonId, variant, time);
  let turns = 0;
  while (a.run('__session.phase') !== 'done' && turns < 12) {
    answer(a, typeof mode === 'function' ? mode(turns) : mode, turns);
    assert.equal(advance(a), true); turns++;
  }
  assert.equal(turns, 8, 'every session is exactly eight questions');
  assert.equal(a.run('__session.phase'), 'done');
  return a.data('__session');
}
function sanitized(a, raw, completed = false) {
  a.context.__raw = clone(raw);
  a.context.__completed = completed;
  return a.data('autoSanitizeSession(__raw,__completed)');
}

async function main() {
  let a = await make();
  const lessons = a.data('AUTO_LESSONS.slice().sort((a,b)=>a.order-b.order)');
  assert.ok(lessons.length >= 3);
  const first = lessons[0].id;

  await check('Curriculum contract, question references, prerequisites and coverage validate', () => {
    assert.deepEqual(a.data('autoValidateContent()'), []);
    assert.ok(a.run('COURSE_UNITS.length') >= 35);
    assert.ok(a.run('AUTO_QUESTIONS.length') >= lessons.length * 12);
    assert.ok(a.run('COURSE_UNITS.some(unit=>unit.status==="planned")'));
    assert.equal(a.run('autoNewSession("missing-lesson")'), null);
  });

  await check('Normalization permits harmless formatting while preserving grammar-significant accents', () => {
    assert.equal(a.run('autoNormalize("  LO  COMPRO.  ")'), 'lo compro');
    assert.equal(a.run('autoNormalize("L’ho!")'), "l'ho");
    assert.equal(a.run('autoNormalize("Sì, lo prendo.")'), a.run('autoNormalize("Sì lo prendo")'));
    assert.notEqual(a.run('autoNormalize("1,5")'), a.run('autoNormalize("15")'));
    assert.equal(a.run('autoNormalize("e\u0300")'), 'è');
    assert.notEqual(a.run('autoNormalize("è")'), a.run('autoNormalize("e")'));
    assert.notEqual(a.run('autoNormalize("sì")'), a.run('autoNormalize("si")'));
    assert.notEqual(a.run('autoNormalize("Non lo vedo")'), a.run('autoNormalize("Lo non vedo")'));
  });

  await check('Every lesson finishes after errors, skips and mixed answers without repeated questions', () => {
    for (const lesson of lessons) for (let variant = 0; variant < 4; variant++)
      for (const mode of ['correct', 'wrong', 'skip', i => ['hinted', 'correct', 'wrong'][i % 3]]) {
        const session = complete(a, lesson.id, mode, variant);
        const ids = session.answers.map(item => item.questionId);
        assert.equal(new Set(ids).size, 8);
        a.context.__ids = ids;
        const focuses = a.data('__ids.map(id=>autoQuestion(id).focus)');
        assert.equal(new Set(focuses).size, 4, lesson.id + ': cover all four learning focuses');
        assert.ok(session.level >= 1 && session.level <= 3);
        assert.ok(sanitized(a, session, true), 'valid completed session survives validation');
      }
  });

  await check('Difficulty needs two unaided successes; hinted success cannot promote', () => {
    start(a, first); answer(a); assert.equal(a.run('__session.level'), 1); advance(a);
    answer(a); assert.equal(a.run('__session.level'), 2); advance(a);
    answer(a, 'hinted'); assert.equal(a.run('__session.level'), 2); advance(a);
    answer(a); assert.equal(a.run('__session.level'), 2); advance(a);
    answer(a); assert.equal(a.run('__session.level'), 3);
    const stats = a.data('autoStats(__session)');
    assert.equal(stats.correct, 5); assert.equal(stats.unaided, 4); assert.equal(stats.helped, 1);
  });

  await check('Repeated errors lower difficulty and offer scaffolding with a fresh repair sentence', () => {
    start(a, first);
    for (let i = 0; i < 4; i++) {answer(a); advance(a);}
    assert.equal(a.run('__session.level'), 3);
    const bad = answer(a, 'wrong').q;
    assert.equal(a.run('__session.level'), 3);
    advance(a);
    const repair = a.data('autoCurrent(__session)');
    assert.equal(repair.focus, bad.focus); assert.notEqual(repair.id, bad.id);
    answer(a, 'wrong');
    assert.equal(a.run('__session.level'), 2); assert.equal(a.run('__session.scaffold'), true);
    advance(a);
    assert.notEqual(a.run('autoCurrent(__session).focus'), bad.focus, 'repair cannot trap learner on one focus');
    const unaidedBefore = a.run('autoStats(__session).unaided');
    answer(a);
    assert.equal(a.run('__session.answers.at(-1).hinted'), true, 'worked examples count as assistance');
    assert.equal(a.run('autoStats(__session).unaided'), unaidedBefore);
  });

  await check('Skipped questions remain unmeasured and hinted answers are excluded from unaided evidence', () => {
    complete(a, first, 'skip');
    assert.deepEqual(a.data('autoStats(__session)'), {
      answered: 0, correct: 0, unaided: 0, helped: 0, skipped: 8, focuses: [], controlled: 0,
    });
    complete(a, first, 'hinted');
    const stats = a.data('autoStats(__session)');
    assert.equal(stats.correct, 8); assert.equal(stats.unaided, 0);
    assert.equal(stats.helped, 8); assert.equal(stats.controlled, 0);
    assert.equal('speaking' in stats || 'listening' in stats, false);
  });

  await check('Stale or duplicate answer and next actions cannot double-score or skip a question', () => {
    start(a, first);
    const currentId = a.run('__session.currentId');
    assert.equal(a.run('autoRecord(__session,"wrong-id","lo")'), false);
    assert.equal(a.run('autoRecord(__session,__session.currentId,"")'), false);
    answer(a);
    const feedback = a.data('__session');
    assert.equal(a.run('autoRecord(__session,__session.currentId,__answer)'), false);
    assert.equal(a.run('autoAdvance(__session,"wrong-id")'), false);
    assert.deepEqual(a.data('__session'), feedback);
    assert.equal(advance(a), true);
    const next = a.data('__session');
    a.context.__staleId = currentId;
    assert.equal(a.run('autoAdvance(__session,__staleId)'), false);
    assert.equal(a.run('autoRecord(__session,__staleId,__answer)'), false);
    assert.deepEqual(a.data('__session'), next);
  });

  await check('Feedback survives save/reload with its hint and answer intact and no second credit', async () => {
    start(a, first); answer(a, 'hinted');
    const before = a.data('__session');
    a.run('autoStore().active=__session'); await a.run('save()');
    const b = await make(await a.snapshot());
    assert.deepEqual(b.data('autoStore().active'), before);
    b.run('__session=autoStore().active');
    assert.equal(b.run('autoRecord(__session,__session.currentId,__session.draft)'), false);
    assert.equal(b.run('autoStats(__session).unaided'), 0);
    assert.equal(advance(b), true);
    assert.equal(b.run('__session.answers.length'), 1);
    a = b;
  });

  await check('Question drafts and hints survive pause without losing other study records', async () => {
    a.run('state.progress["g-pronomi"]={updatedAt:123,repetitions:2}; state.customItems.push({id:"custom-auto-keep",kind:"word",title:"prova",meaning:"Synthetic fixture",links:[]})');
    a.run('autoStore().active.draft="Non lo vedo"; autoStore().active.hintShown=true');
    const session = a.data('autoStore().active');
    const progress = a.data('state.progress');
    await a.run('save()');
    const b = await make(await a.snapshot());
    assert.deepEqual(b.data('autoStore().active'), session);
    assert.deepEqual(b.data('state.progress'), progress);
    assert.equal(b.run('state.customItems.some(item=>item.id==="custom-auto-keep")'), true);
  });

  await check('Sanitizer recalculates evidence and rejects duplicate, unknown or foreign questions', () => {
    const wrong = complete(a, first, 'wrong');
    wrong.answers.forEach(item => {item.correct = true; item.evidence = 'certified-speaking';});
    const canonical = sanitized(a, wrong, true);
    assert.ok(canonical); assert.ok(canonical.answers.every(item => !item.correct));
    assert.ok(canonical.answers.every(item => item.evidence !== 'certified-speaking'));
    const repeated = clone(wrong); repeated.answers[1] = clone(repeated.answers[0]);
    assert.equal(sanitized(a, repeated, true), null);
    const unknown = clone(wrong); unknown.answers[0].questionId = '__proto__';
    assert.equal(sanitized(a, unknown, true), null);
    const foreign = clone(wrong);
    a.context.__otherLesson = lessons[1].id;
    foreign.answers[0].questionId = a.run('AUTO_QUESTIONS.find(q=>q.lessonId===__otherLesson).id');
    assert.equal(sanitized(a, foreign, true), null);
    const badChoice = clone(wrong);
    badChoice.answers[0].answer = 'not-a-listed-choice';
    assert.equal(sanitized(a, badChoice, true), null);
    const poisoned = clone(wrong); poisoned.id = '__proto__';
    assert.equal(sanitized(a, poisoned, true), null);
    assert.equal(a.run('({}).polluted'), undefined);
  });

  await check('Malformed phases, timestamps and overlong runs cannot enter saved evidence', () => {
    const done = complete(a, first);
    for (const mutation of [
      raw => {raw.format = 9;}, raw => {raw.variant = 9;},
      raw => {raw.startedAt = -1;}, raw => {raw.completedAt = raw.startedAt;},
      raw => {raw.answers[0].ts = raw.startedAt - 1;},
      raw => {raw.answers[0].ts = raw.completedAt + 1000;},
      raw => {raw.answers.push(clone(raw.answers[0]));},
      raw => {raw.phase = 'question';}, raw => {raw.answers[0].hinted = 'false';},
    ]) {
      const raw = clone(done); mutation(raw);
      assert.equal(sanitized(a, raw, true), null, 'reject malformed completed evidence');
    }
    start(a, first); answer(a); advance(a);
    const previousTimestamp = a.run('__session.answers.at(-1).ts');
    a.run('autoRecord(__session,__session.currentId,autoCurrent(__session).answers[0],{now:1})');
    assert.equal(a.run('__session.answers.at(-1).ts'), previousTimestamp, 'backward device clock is clamped');
  });

  await check('Finishing is idempotent and preserves unrelated active sessions', () => {
    a.run('state.autoTutor={active:null,history:[]}');
    const done = complete(a, first);
    a.context.__done = done;
    a.run('autoStore().active=__done');
    assert.equal(a.run('autoFinish(__done)'), true);
    assert.equal(a.run('autoStore().active'), null);
    assert.equal(a.run('autoFinish(__done)'), true);
    assert.equal(a.run('autoStore().history.length'), 1);
    start(a, lessons[1].id);
    a.run('autoStore().active=__session');
    const active = a.data('autoStore().active');
    a.run('autoFinish(__done)');
    assert.deepEqual(a.data('autoStore().active'), active);
    assert.equal(a.run('autoStore().history.length'), 1);
  });

  await check('Backup merge deduplicates runs, protects active local IDs and rejects poisoned records', () => {
    const current = a.data('autoStore().active');
    const localHistory = a.data('autoStore().history');
    const remote = complete(a, lessons[1].id, 'correct', 1, 2000000);
    const collision = clone(remote); collision.id = current.id;
    const poison = clone(remote); poison.id = 'auto-__proto__';
    a.context.__incoming = {active: clone(remote), history: [remote, remote, collision, poison]};
    a.run('autoImportFromBackup(__incoming)');
    assert.deepEqual(a.data('autoStore().active'), current);
    assert.equal(a.run('autoStore().history.length'), localHistory.length + 1);
    a.run('autoImportFromBackup(__incoming)');
    assert.equal(a.run('autoStore().history.length'), localHistory.length + 1);
    assert.equal(a.run('autoStore().history.some(run=>run.id===autoStore().active.id)'), false);
    a.run('autoStore().active=null');
    start(a, lessons[2].id, 0, 3000000);
    a.run('autoImportFromBackup({active:__session,history:[]})');
    assert.deepEqual(a.data('autoStore().active'), a.data('__session'));
    a.run('autoStore().active=null');
    const past = clone(remote); past.phase = 'feedback'; delete past.completedAt;
    a.context.__past = past;
    a.run('autoImportFromBackup({active:__past,history:[]})');
    assert.equal(a.run('autoStore().active'), null, 'do not resurrect already-completed ID');
  });

  await check('History remains bounded and restore recovers a completed active session once', async () => {
    a.run('state.autoTutor={active:null,history:[]}');
    const base = complete(a, first);
    const history = Array.from({length: 65}, (_, i) => ({...clone(base), id: 'auto-fixture-' + i, completedAt: base.completedAt + i}));
    a.context.__history = history;
    a.run('autoImportFromBackup({history:__history})');
    assert.equal(a.run('autoStore().history.length'), 60);
    assert.equal(a.run('autoStore().history[0].id'), 'auto-fixture-5');
    a.context.__done = {...clone(base), id: 'auto-recovered-complete', completedAt: base.completedAt + 100};
    a.run('autoStore().active=__done'); await a.run('save()');
    const b = await make(await a.snapshot());
    assert.equal(b.run('autoStore().active'), null);
    assert.equal(b.run('autoStore().history.filter(run=>run.id==="auto-recovered-complete").length'), 1);
    assert.equal(b.run('autoStore().history.length'), 60);
  });

  await check('Recommendations resume, repeat a weak lesson once, then progress and revisit due lessons', () => {
    a.run('state.autoTutor={active:null,history:[]}');
    assert.equal(a.run('autoRecommendation(1000000).lesson.id'), first);
    start(a, lessons[1].id); a.run('autoStore().active=__session');
    assert.equal(a.run('autoRecommendation(1000000).lesson.id'), lessons[1].id);
    a.run('autoStore().active=null');
    for (let i = 0; i < 2; i++) {
      const done = complete(a, first, 'wrong', i, 1000000 + i * 10000);
      a.context.__done = done; a.run('autoFinish(__done)');
      const next = a.run('autoRecommendation(1030000).lesson.id');
      assert.equal(next, i === 0 ? first : lessons[1].id);
    }
    const rec = a.data('autoRecommendation(1000000+3*AUTO_DAY)');
    assert.equal(rec.lesson.id, first); assert.ok(rec.reviewAt < 1000000 + 3 * 86400000);
    a.run('state.autoTutor={active:null,history:[]}');
    for (const lesson of lessons) {
      const done = complete(a, lesson.id, 'correct', 0, 4000000 + lesson.order * 10000);
      a.context.__done = done; a.run('autoFinish(__done)');
    }
    assert.ok(a.run('autoRecommendation(5000000).lesson.id'));
    assert.ok(a.run('autoRecommendation(5000000).reviewAt') > 5000000);
  });

  await check('Integrated buttons and text form teach one question at a time and pause safely', async () => {
    const b = await make();
    b.run('ui.transferOpen=true;ui.bridgeOpen=true;ui.pathwayOpen=true;ui.placementOpen=true');
    b.click('auto-open');
    assert.equal(b.run('ui.autoOpen'), true);
    assert.equal(b.run('ui.transferOpen||ui.bridgeOpen||ui.pathwayOpen||ui.placementOpen'), false);
    assert.match(b.node('#view').innerHTML, /data-action="auto-begin"/);
    b.click('auto-begin');
    for (let i = 0; i < 2; i++) {
      const q = b.data('autoCurrent(autoStore().active)');
      assert.equal(q.type, 'choice');
      b.click('auto-choice', {id: q.id, choice: String(q.choices.indexOf(q.answers[0]))});
      assert.equal((b.node('#view').innerHTML.match(/data-action="auto-next"/g) || []).length, 1);
      assert.doesNotMatch(b.node('#view').innerHTML, /data-action="auto-choice"/);
      b.click('auto-next', {id: q.id});
    }
    const q = b.data('autoCurrent(autoStore().active)');
    assert.equal(q.type, 'text');
    b.node('#auto-answer').value = '<img src=x onerror=alert(1)>';
    const form = {id: 'auto-answer-form', dataset: {id: q.id}, matches: () => false};
    for (const listener of b.listeners.get('submit') || []) listener({target: form, preventDefault() {}});
    assert.equal(b.run('autoStore().active.phase'), 'feedback');
    assert.match(b.node('#view').innerHTML, /&lt;img/);
    assert.doesNotMatch(b.node('#view').innerHTML, /<img src=x/);
    const before = b.data('autoStore().active');
    b.click('auto-pause');
    assert.equal(b.run('ui.autoOpen'), false); assert.equal(b.run('ui.tab'), 'home');
    assert.deepEqual(b.data('autoStore().active'), before);
    await b.run('saveChain');
    const resumed = await make(await b.snapshot());
    resumed.click('auto-open');
    assert.deepEqual(resumed.data('autoStore().active'), before);
    assert.match(resumed.node('#view').innerHTML, /data-action="auto-next"/);
    resumed.click('nav', {id: 'library'});
    assert.equal(resumed.run('ui.autoOpen'), false);
    assert.deepEqual(resumed.data('autoStore().active'), before);
    assert.deepEqual(b.errors, []); assert.deepEqual(resumed.errors, []);
  });

  assert.deepEqual(a.errors, [], 'automatic lesson checks must not log runtime errors');
  console.log('\n' + passed + ' automatic-learning checks passed. Browser/device QA remains separate.');
}

main().catch(error => {console.error(error); process.exitCode = 1;});
