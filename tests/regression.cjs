/* Run with: node tests/regression.cjs
 * Behavioral smoke tests for the buildless app, using only Node built-ins.
 * The DOM/storage doubles verify app logic and serialized state, not browser,
 * Safari, speech quality, or real IndexedDB implementation behavior.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
let passed = 0;

async function check(name, body) {
  await body();
  passed++;
  console.log('PASS ' + name);
}

async function app(saved, useIDB = true) {
  const nodes = new Map(), listeners = new Map(), downloads = [];
  let persisted = clone(saved), local = saved ? JSON.stringify(saved) : null;
  const errors = [];
  function node(selector) {
    if (!nodes.has(selector)) {
      const classes = new Set();
      nodes.set(selector, {
        innerHTML: '', textContent: '', value: '', dataset: {},
        classList: {add: x => classes.add(x), remove: x => classes.delete(x),
          contains: x => classes.has(x), toggle(x, value) {
            if (value === undefined) value = !classes.has(x);
            value ? classes.add(x) : classes.delete(x); return value;
          }},
        addEventListener() {}, setAttribute() {}, focus() {}, remove() {},
        appendChild() {}, click() {}, showModal() {}, close() {},
        querySelector: node,
      });
    }
    return nodes.get(selector);
  }
  const body = node('body');
  const document = {body, querySelector: node,
    createElement: tag => ({tagName: tag, click() {}, remove() {}}),
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(fn);
    }};
  const localStorage = {
    getItem: key => key === 'piccola-italiano-state' ? local : null,
    setItem(key, value) {assert.equal(key, 'piccola-italiano-state'); local = value;},
    clear() {throw Error('The application must not clear learner data');},
    removeItem() {throw Error('The application must not delete learner data');},
  };
  const context = {
    document, navigator: {}, location: {protocol: 'https:', origin: 'https://example.test'},
    localStorage, Blob,
    URL: {createObjectURL(blob) {downloads.push(blob); return 'blob:test';}, revokeObjectURL() {}},
    FormData: class {constructor(form) {this.form = form;} get(key) {return this.form.fields?.[key];}},
    console: {log() {}, warn() {}, error(...args) {errors.push(args.map(String).join(' '));}},
    setTimeout: () => 1, clearTimeout() {}, setInterval: () => 1, clearInterval() {},
    scrollTo() {}, __appReady: null,
  };
  if (useIDB) context.indexedDB = {open(name, version) {
    assert.equal(name, 'piccola-italiano'); assert.equal(version, 1);
    const request = {result: {
      objectStoreNames: {contains: name => name === 'data'},
      transaction(storeName, mode) {
        assert.equal(storeName, 'data');
        const tx = {objectStore() {return {
          get(key) {
            assert.equal(key, 'state'); const read = {result: clone(persisted)};
            queueMicrotask(() => read.onsuccess()); return read;
          },
          put(value, key) {
            assert.equal(mode, 'readwrite'); assert.equal(key, 'state'); persisted = clone(value);
            queueMicrotask(() => tx.oncomplete());
          },
        };}}; return tx;
      },
    }};
    queueMicrotask(() => request.onsuccess()); return request;
  }};
  context.window = context;
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="\.\/([^"?]+)(?:\?[^" ]*)?"/g)].map(m => m[1]);
  assert.equal(scripts.at(-1), 'app.js', 'app.js must load after its modules');
  for (const name of scripts) {
    let source = fs.readFileSync(path.join(root, name), 'utf8');
    if (name === 'app.js') {
      assert.match(source, /main\(\)\.catch\(/, 'startup remains observable');
      source = source.replace('main().catch(', '__appReady = main().catch(');
    }
    vm.runInContext(source, context, {filename: name});
  }
  await context.__appReady;
  assert.deepEqual(errors, [], 'startup must succeed');
  const run = source => vm.runInContext(source, context);
  const data = source => clone(run(source));
  const click = (action, details = {}) => {
    context.__button = {dataset: {action, ...details}};
    run('action({target:{closest:()=>__button}})');
  };
  return {context, run, data, click, node, downloads, errors, listeners,
    async snapshot() {await run('saveChain'); return clone(useIDB ? persisted : JSON.parse(local));},
  };
}

async function main() {
  const legacy = {
    schemaVersion: 1, customItems: [{id: 'custom-test-keep', kind: 'word', title: 'custodire',
      meaning: 'Synthetic regression fixture', example: '', tags: [], links: []}],
    progress: {'g-pronomi': {updatedAt: 200, repetitions: 3, correct: 3, wrong: 0, dueAt: '2030-01-01'}},
    attempts: [{id: 'try-keep', itemId: 'g-pronomi', correct: true, ts: 200}],
    errors: [{id: 'err-keep', itemId: 'g-pronomi', count: 2, ts: 100, resolvedAt: 200}],
    sceneLogs: [{id: 'scene-keep', sceneId: 'sc-visita', response: 'Synthetic fixture', ts: 100}],
    mission: {startedAt: '2026-01-01', checks: {'1': {theory: true, practice: false}}, tests: []},
    adventure: {stepWins: {}, episodes: {}, logs: []},
    mysteries: {completed: {}, firstSolve: {}, logs: [], inferences: {}},
    settings: {theme: 'codex'}, extensionFixture: {preserveUnknownField: true},
  };
  let a = await app(legacy);

  await check('Legacy schema 1 boots and retains existing learning fields', async () => {
    for (const key of ['customItems', 'progress', 'attempts', 'errors', 'sceneLogs', 'mission', 'extensionFixture'])
      assert.deepEqual(a.data('state[' + JSON.stringify(key) + ']'), legacy[key]);
    assert.equal(a.run('state.schemaVersion'), 1);
    assert.equal(a.node('body').classList.contains('codex'), true);
    await a.run('save()');
    assert.deepEqual((await a.snapshot()).extensionFixture, legacy.extensionFixture);
  });

  await check('Navigation and all three themes render without discarding learner progress', () => {
    for (const id of ['library', 'practice', 'mission', 'review', 'settings', 'home']) {
      a.click('nav', {id}); assert.equal(a.run('ui.tab'), id);
      assert.ok(a.node('#view').innerHTML.length > 100);
    }
    for (const theme of ['light', 'dark', 'codex']) {
      a.run('state.settings.theme=' + JSON.stringify(theme) + '; applyTheme()');
      assert.equal(a.node('body').classList.contains('dark'), theme === 'dark');
      assert.equal(a.node('body').classList.contains('codex'), theme === 'codex');
    }
    assert.deepEqual(a.data('state.progress'), legacy.progress);
  });

  await check('Knowledge graph references and prerequisites remain valid', () => {
    assert.deepEqual(a.data('curriculumValidate(SEED, EXERCISES)'), []);
    a.click('curriculum-open');
    a.click('curriculum-focus', {id: 'objects'});
    assert.match(a.node('#view').innerHTML, /直接宾语代词/);
    a.click('curriculum-detail', {id: 'g-pronomi'});
    assert.equal(a.run('ui.detailId'), 'g-pronomi');
    a.click('nav', {id: 'home'});
  });

  await check('Missing modern voices produce a recoverable message', () => {
    a.run('window.speechSynthesis={getVoices:()=>[],cancel(){},speak(){throw Error("No voice should play")}}; window.SpeechSynthesisUtterance=function(){}');
    a.click('curriculum-play', {id: 'it-IT'});
    assert.match(a.node('#toast').textContent, /未找到/);
  });

  await check('Etymology round-trip restores the mystery clue and hint', () => {
    a.click('mystery-open', {id: 'bassano-letter'}); a.click('mystery-hint');
    const clue = a.data('({id:ui.mysteryId,stage:ui.mysteryStage,hint:ui.mysteryHint})');
    a.click('roots-show', {id: a.run('MYSTERIES.find(m=>m.id===ui.mysteryId).stages[ui.mysteryStage].wordId')});
    assert.match(a.node('#view').innerHTML, /返回案发现场/);
    a.click('roots-return');
    assert.deepEqual(a.data('({id:ui.mysteryId,stage:ui.mysteryStage,hint:ui.mysteryHint})'), clue);
    a.click('nav', {id: 'home'});
  });

  await check('Chancery corrections gate verdicts and first verdict cannot be farmed', () => {
    const c = a.data('CHANCERY_CASES[0]');
    a.click('chancery-open', {id: c.id});
    a.click('chancery-verdict', {id: c.verdicts[0].id});
    assert.equal(a.run('chanceryRecord(ui.chanceryId).decision'), null);
    a.context.__form = {dataset: {chanceryAnswer: c.puzzles[0].id}, fields: {answer: 'invalid'}};
    a.run('chancerySubmitPuzzle(__form)');
    assert.ok(a.run('ui.chanceryFeedback'));
    assert.equal(a.run('Object.keys(chanceryRecord(ui.chanceryId).answers).length'), 0);
    for (const e of c.evidence.slice(0, 3)) a.click('chancery-evidence', {id: e[0]});
    for (const w of c.witnesses.slice(0, 2)) a.click('chancery-witness', {id: w[0]});
    for (const q of c.puzzles) {
      a.context.__form = {dataset: {chanceryAnswer: q.id}, fields: {answer: q.answers[0]}};
      a.run('chancerySubmitPuzzle(__form)');
    }
    const verdict = c.verdicts.find(v => v.correct);
    a.click('chancery-verdict', {id: verdict.id});
    const before = a.data('({totals:chanceryTotals(),record:chanceryRecord(ui.chanceryId),logs:state.chancery.logs})');
    a.click('chancery-verdict', {id: c.verdicts.find(v => !v.correct).id});
    assert.deepEqual(a.data('({totals:chanceryTotals(),record:chanceryRecord(ui.chanceryId),logs:state.chancery.logs})'), before);
    a.click('chancery-room', {id: 'language'});
    a.click('chancery-lexicon', {id: c.sourceWord});
    assert.equal(a.run('ui.chanceryId'), null);
    a.click('chancery-back');
    assert.equal(a.run('ui.chanceryId'), c.id); assert.equal(a.run('ui.chanceryRoom'), 'language');
    a.click('nav', {id: 'home'});
  });

  await check('Vivo four modes accept text, keep self-rating explicit and prevent duplicate credit', () => {
    for (const mode of a.data('VIVO_DECKS')) {
      a.click('vivo-select', {id: mode.id});
      const task = a.data('vivoCurrent()');
      const response = mode.kind === 'exact' ? task.answer[0] : task.sample;
      a.context.__form = {querySelector: () => ({value: response})};
      a.run('vivoSubmit(__form)');
      if (mode.kind === 'self') {
        assert.equal(a.run('vivoComplete(vivoCurrent())'), false);
        assert.match(a.node('#view').innerHTML, /不是AI批改/);
        a.click('vivo-grade', {grade: '1'});
      }
      assert.equal(a.run('vivoComplete(vivoCurrent())'), true);
      const before = a.data('vivoStore()');
      a.click('vivo-grade', {grade: '1'});
      assert.deepEqual(a.data('vivoStore()'), before);
      a.click('vivo-retry');
      a.run('vivoSubmit(__form)');
      if (mode.kind === 'self') a.click('vivo-grade', {grade: '1'});
      assert.equal(a.run('vivoStats(' + JSON.stringify(mode.id) + ').done'), 1);
      assert.equal(a.run('vivoStore().records[' + JSON.stringify(task.id) + '].firstPassAt'), before.records[task.id].firstPassAt);
    }
    a.click('nav', {id: 'home'});
  });

  await check('Placement adapts within bounds; skip remains unmeasured', () => {
    a.run('state.placement={active:placementNewSession(),history:[]}');
    a.run('placementRecord(state.placement.active,placementCurrentQuestion(state.placement.active).id,placementCurrentQuestion(state.placement.active).correct)');
    assert.equal(a.run('state.placement.active.tracks.reading.level'), 3);
    a.run('placementRecord(state.placement.active,placementCurrentQuestion(state.placement.active).id,(placementCurrentQuestion(state.placement.active).correct+1)%3)');
    assert.equal(a.run('state.placement.active.tracks.reading.level'), 2);
    a.run('placementRecord(state.placement.active,placementCurrentQuestion(state.placement.active).id,-1)');
    assert.equal(a.run('state.placement.active.tracks.reading.level'), 2);
    assert.deepEqual(a.data('placementSummary(state.placement.active).reading').observed, 2);
    assert.equal(a.run('placementRecord(state.placement.active,"not-current",0)'), false);
  });

  await check('Placement pauses and resumes the same question after serialization', async () => {
    await a.run('save()');
    const previous = a.data('state.placement.active');
    const nextId = a.run('placementCurrentQuestion(state.placement.active).id');
    const b = await app(await a.snapshot());
    b.click('placement-open'); b.click('placement-close'); b.click('placement-open');
    assert.deepEqual(b.data('state.placement.active'), previous);
    assert.equal(b.run('placementCurrentQuestion(state.placement.active).id'), nextId);
    a = b;
  });

  await check('Placement completes finitely and reports writing/self-rating separately from speech', () => {
    let n = 0;
    while (a.run('state.placement.active.phase') !== 'writing' && n++ < 13)
      a.run('placementRecord(state.placement.active,placementCurrentQuestion(state.placement.active).id,placementCurrentQuestion(state.placement.active).correct)');
    assert.ok(n <= 12);
    assert.equal(a.run('placementComplete(state.placement.active,"self_good")'), true);
    assert.equal(a.run('state.placement.active.writing.method'), 'learner-self-rating');
    const report = a.run('placementReport(state.placement.active)');
    assert.match(report, /口语 · 听力/); assert.match(report, /尚未测量/); assert.match(report, /不是 CEFR/);
    a.run('state.placement.history=[state.placement.active]; state.placement.active=placementNewSession()');
    const current = a.data('state.placement.active');
    a.run('placementImportFromBackup({history:[...state.placement.history,...state.placement.history],active:null})');
    assert.equal(a.run('state.placement.history.length'), 1);
    assert.deepEqual(a.data('state.placement.active'), current);
  });

  await check('Backup merge preserves newer local progress, local session and existing custom items', async () => {
    const currentPlacement = a.data('state.placement.active');
    const beforeAttempts = a.run('state.attempts.length');
    const incoming = clone(legacy);
    incoming.customItems[0].meaning = 'Must not replace existing item';
    incoming.customItems.push({id: 'custom-test-new', kind: 'word', title: 'prova', meaning: 'Synthetic new fixture', links: []});
    incoming.progress['g-pronomi'] = {updatedAt: 100, repetitions: 0};
    incoming.errors[0].resolvedAt = null;
    incoming.mission.checks['1'].practice = true;
    incoming.placement = {active: null, history: a.data('state.placement.history')};
    incoming.chancery = {cases: {[a.run('CHANCERY_CASES[1].id')]: {
      evidence: [], witnesses: [], answers: {}, decision: a.run('CHANCERY_CASES[1].verdicts[0].id'),
    }}, logs: []};
    const body = JSON.stringify({format: 'piccola-italiano-backup', data: incoming});
    a.context.__file = {size: body.length, text: async () => body};
    await a.run('importData(__file)');
    assert.deepEqual(a.data('state.progress'), legacy.progress);
    assert.deepEqual(a.data('state.placement.active'), currentPlacement);
    assert.equal(a.run('state.customItems.find(x=>x.id==="custom-test-keep").meaning'), legacy.customItems[0].meaning);
    assert.equal(a.run('state.customItems.length'), 2);
    assert.equal(a.run('state.attempts.length'), beforeAttempts);
    assert.equal(a.run('state.errors[0].resolvedAt'), 200);
    assert.deepEqual(a.data('state.mission.checks["1"]'), {theory: true, practice: true});
    assert.equal(a.run('chanceryRecord(CHANCERY_CASES[1].id).decision'), null);
    await a.run('importData(__file)');
    assert.equal(a.run('state.customItems.length'), 2);
  });

  await check('Export contains the entire current state, including additive modules', async () => {
    a.run('exportData()');
    const backup = JSON.parse(await a.downloads.at(-1).text());
    assert.equal(backup.format, 'piccola-italiano-backup');
    assert.deepEqual(backup.data, a.data('state'));
    assert.deepEqual(backup.data.extensionFixture, legacy.extensionFixture);
  });

  await check('Fallback localStorage retains old state and saves without clearing it', async () => {
    const b = await app(legacy, false);
    assert.equal(b.run('storageMode'), 'localstorage');
    await b.run('save()');
    assert.deepEqual((await b.snapshot()).progress, legacy.progress);
    assert.deepEqual((await b.snapshot()).sceneLogs, legacy.sceneLogs);
  });

  await check('Every runtime script/style is included in Service Worker precache', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
    const resources = [...html.matchAll(/(?:src|href)="(\.\/[^" ]+\.(?:js|css)(?:\?[^" ]*)?)"/g)].map(m => m[1]);
    for (const resource of resources) assert.ok(sw.includes("'" + resource + "'"), resource + ' must be precached');
    assert.equal(/indexedDB|localStorage/.test(sw), false, 'cache updates must not touch learner storage');
  });

  assert.deepEqual(a.errors, [], 'app must not log unexpected runtime errors');
  console.log('\n' + passed + ' regression checks passed. Browser/device QA remains separate.');
}

if (require.main === module) main().catch(error => {console.error(error); process.exitCode = 1;});
module.exports = {app};
