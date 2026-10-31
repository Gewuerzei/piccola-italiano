/* v0.15 state continuity and mixed-review behavior. Synthetic data only. */
'use strict';
const assert = require('node:assert/strict');
const {app} = require('./regression.cjs');
const clone = value => JSON.parse(JSON.stringify(value));
let passed = 0;
async function check(name, body) { await body(); passed++; console.log('PASS ' + name); }
function complete(a, lessonId, correct = true, startedAt = 1000000) {
  a.context.__lessonId = lessonId; a.context.__startedAt = startedAt;
  a.run('__run=autoNewSession(__lessonId,__startedAt)');
  assert.ok(a.run('autoBegin(__run)'));
  for (let i = 0; i < 8; i++) {
    const q = a.data('autoCurrent(__run)');
    a.context.__answer = correct ? q.answers[0] : q.type === 'choice' ? q.choices.find(x => !q.answers.includes(x)) : 'risposta errata';
    assert.ok(a.run('autoRecord(__run,__run.currentId,__answer,{now:__run.startedAt+(__run.answers.length+1)*100})'));
    assert.ok(a.run('autoAdvance(__run,__run.currentId,__run.startedAt+__run.answers.length*100+1)'));
  }
  assert.equal(a.run('__run.phase'), 'done');
  return a.data('__run');
}
function remember(a, run) { a.context.__finished = clone(run); assert.ok(a.run('autoFinish(__finished)')); }
async function main() {
  let a = await app();
  const lessons = a.data('AUTO_LESSONS.slice().sort((a,b)=>a.order-b.order)');
  const first = lessons[0].id, second = lessons[1].id;

  await check('v0.14 history migrates additively and course records survive 60 newer runs', async () => {
    const older = complete(a, first);
    const legacy = {schemaVersion: 1, autoTutor: {active: null, history: [older]}, progress: {keep: {repetitions: 4}}};
    a = await app(legacy);
    assert.equal(a.run('autoLessonRecords()[AUTO_LESSONS.find(l=>l.order===1).id].id'), older.id);
    const fresh = complete(a, second, true, 2000000);
    for (let i = 0; i < 65; i++) remember(a, {...clone(fresh), id: 'auto-later-' + i, completedAt: fresh.completedAt + i});
    assert.equal(a.run('autoStore().history.length'), 60);
    a.context.__first = first;
    assert.equal(a.run('autoStore().history.some(r=>r.lessonId===__first)'), false);
    assert.equal(a.run('autoLessonStatus(__first,999999999).practiced'), true);
    assert.equal(a.run('autoLessonStatus(__first,999999999).due'), true);
    await a.run('save()'); a = await app(await a.snapshot());
    assert.equal(a.data('autoLessonRecords()')[first].id, older.id);
    assert.equal(a.run('state.progress.keep.repetitions'), 4);
    assert.equal(Object.keys(a.data('autoLessonRecords()')).length, 2);
  });

  await check('Record-only backup merges keep newer evidence and reject key or active-ID collisions', async () => {
    const b = await app();
    const local = complete(b, first, true, 2000000); remember(b, local);
    const older = complete(b, first, false, 1000000);
    const newer = complete(b, first, false, 3000000);
    b.context.__incoming = {records: {[first]: older, [second]: newer, '__proto__': newer}};
    b.run('autoImportFromBackup(__incoming)');
    assert.equal(b.data('autoLessonRecords()')[first].id, local.id);
    assert.equal(b.data('autoLessonRecords()')[second], undefined);
    b.context.__incoming = {records: {[first]: newer}};
    b.run('autoImportFromBackup(__incoming)');
    assert.equal(b.data('autoLessonRecords()')[first].id, newer.id);
    b.context.__first = first;
    b.run('autoStart(__first)');
    const active = b.data('autoStore().active');
    const collide = {...clone(newer), id: active.id, completedAt: newer.completedAt + 10000};
    b.context.__incoming = {records: {[first]: collide}};
    b.run('autoImportFromBackup(__incoming)');
    assert.deepEqual(b.data('autoStore().active'), active);
    assert.equal(b.data('autoLessonRecords()')[first].id, newer.id);
    assert.equal(b.run('({}).polluted'), undefined);
    // An ID retained only in durable records cannot be resurrected as an active run.
    b.run('autoStore().active=null');
    const restored = clone(newer); restored.phase = 'feedback'; delete restored.completedAt;
    b.context.__incoming = {active: restored}; b.run('autoImportFromBackup(__incoming)');
    assert.equal(b.run('autoStore().active'), null);
  });

  await check('Mixed review uses eight unique questions from practiced lessons and prioritizes fresh equivalents', async () => {
    const b = await app();
    assert.deepEqual(b.data('autoReviewPlan()'), []);
    const bad = complete(b, first, false); remember(b, bad);
    const other = complete(b, second, false, 2000000); remember(b, other);
    const plan = b.data('autoReviewPlan()');
    assert.equal(plan.length, 8); assert.equal(new Set(plan).size, 8);
    b.context.__plan = plan;
    const sources = b.data('__plan.map(id=>autoQuestion(id).lessonId)');
    assert.deepEqual(new Set(sources), new Set([first, second]));
    const seen = new Set([...bad.answers, ...other.answers].map(x => x.questionId));
    assert.ok(plan.some(id => !seen.has(id)), 'include unseen equivalent questions when available');
    assert.equal(b.run('autoStartReview()'), true);
    assert.equal(b.run('autoStartReview()'), false, 'never replace an active attempt');
    const records = b.data('autoLessonRecords()');
    assert.ok(b.run('autoBegin(autoStore().active)'));
    for (let i = 0; i < 8; i++) {
      assert.ok(b.run('autoRecord(autoStore().active,autoStore().active.currentId,autoCurrent(autoStore().active).answers[0])'));
      assert.ok(b.run('autoAdvance(autoStore().active,autoStore().active.currentId)'));
    }
    const review = b.data('autoStore().active');
    assert.equal(review.kind, 'review'); assert.equal(new Set(review.answers.map(x => x.questionId)).size, 8);
    assert.ok(b.run('autoFinish(autoStore().active)'));
    assert.deepEqual(b.data('autoLessonRecords()'), records, 'partial cross-course evidence does not complete or replace course records');
    assert.equal(b.run('autoStore().history.length'), 3);
    b.context.__review = review;
    assert.ok(b.run('autoSanitizeSession(__review,true)'));
    assert.ok(b.run('autoStats(__review).focuses.every(key=>key.includes("/"))'), 'shared focus names remain separated by source lesson');
  });

  await check('Mixed-review question plans, hints and feedback survive reload without changing the next question', async () => {
    const b = await app(); remember(b, complete(b, first, false));
    b.run('autoStartReview();autoBegin(autoStore().active);autoStore().active.hintShown=true');
    const before = b.data('autoStore().active');
    await b.run('save()'); const c = await app(await b.snapshot());
    assert.deepEqual(c.data('autoStore().active'), before);
    c.run('autoRecord(autoStore().active,autoStore().active.currentId,autoCurrent(autoStore().active).answers[0])');
    const feedback = c.data('autoStore().active');
    assert.equal(feedback.answers[0].hinted, true);
    await c.run('save()'); const d = await app(await c.snapshot());
    assert.deepEqual(d.data('autoStore().active'), feedback);
    assert.ok(d.run('autoAdvance(autoStore().active,autoStore().active.currentId)'));
    assert.notEqual(d.run('autoStore().active.currentId'), before.currentId);
  });

  await check('Mixed-review validation rejects malformed plans and questions outside the frozen plan', async () => {
    const b = await app(); remember(b, complete(b, first, false));
    b.run('autoStartReview();autoBegin(autoStore().active)');
    const valid = b.data('autoStore().active');
    for (const mutate of [
      x => x.reviewIds.pop(), x => x.reviewIds.push(x.reviewIds[0]),
      x => {x.reviewIds[1] = x.reviewIds[0];}, x => {x.reviewIds[0] = '__proto__';},
      x => {delete x.kind;}, x => {x.lessonId = first;},
      x => {x.currentId = b.run('AUTO_QUESTIONS.find(q=>!autoStore().active.reviewIds.includes(q.id)).id');}
    ]) {
      const raw = clone(valid); mutate(raw); b.context.__raw = raw;
      assert.equal(b.run('autoSanitizeSession(__raw)'), null);
    }
    assert.equal(b.run('autoNewSession(AUTO_REVIEW_ID)'), null);
  });

  await check('An upgraded pronoun learner continues the route and new learners can start at foundations', async () => {
    const b = await app();
    assert.equal(b.run('autoRecommendation(1000000).lesson.id'), first);
    const legacy = complete(b, 'auto-objects-forms', true, 1000000);
    const c = await app({schemaVersion: 1, autoTutor: {active: null, history: [legacy]}});
    assert.equal(c.run('autoRecommendation(1001000).lesson.id'), 'auto-objects-context');
    assert.equal(c.run('autoLessonStatus("auto-objects-forms",1001000).practiced'), true);
    assert.equal(c.run('autoLessonStatus("auto-sentence-core",1001000).practiced'), false);
  });

  await check('Optional audio selects an Italian voice, handles unavailable voices and does not change evidence', async () => {
    const b = await app(); const before = b.data('state');
    b.context.__lesson = first;
    b.run('autoSpeak("lesson",__lesson)');
    b.run('speechSynthesis={getVoices:()=>[{lang:"en-US",localService:true}],cancel(){},speak(){throw Error("Wrong-language voice must not play")}}; SpeechSynthesisUtterance=function(text){this.text=text}');
    b.run('autoSpeak("lesson",__lesson)');
    b.run('__spoken=[];speechSynthesis={getVoices:()=>[{lang:"en-US",localService:true},{lang:"it-IT",localService:true}],cancel(){},speak(u){__spoken.push({text:u.text,lang:u.lang,rate:u.rate})}}');
    b.run('autoSpeak("lesson",__lesson)');
    const spoken = b.data('__spoken');
    assert.equal(spoken.length, 1); assert.equal(spoken[0].lang, 'it-IT');
    assert.ok(spoken[0].text.length > 0); assert.doesNotMatch(spoken[0].text, /[\u3400-\u9fff]/);
    assert.deepEqual(b.data('state'), before);
    assert.deepEqual(b.errors, []);
  });

  await check('Catalogue presents progress without replacing a paused lesson; mixed review remains optional', async () => {
    const b = await app(); remember(b, complete(b, first, false));
    b.click('auto-catalog');
    const html = b.node('#view').innerHTML;
    assert.match(html, /27/); assert.match(html, /40/); assert.match(html, /auto-review/);
    b.click('auto-review');
    assert.equal(b.run('autoStore().active.kind'), 'review');
    const active = b.data('autoStore().active');
    b.click('auto-catalog'); b.click('auto-lesson', {id: second});
    assert.deepEqual(b.data('autoStore().active'), active);
    assert.deepEqual(b.errors, []);
  });
  console.log('\n' + passed + ' continuity/review checks passed. Real device audio and offline behavior remain separate.');
}
main().catch(error => {console.error(error); process.exitCode = 1;});
