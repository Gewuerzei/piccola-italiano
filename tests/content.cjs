/* Fast, read-only curriculum contract gate. No app, storage or browser needed. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const packs = [...html.matchAll(/<script\b[^>]*\bsrc="\.\/(course-[^"?]+\.js)(?:\?[^" ]*)?"/g)].map(match => match[1]);
assert.ok(packs.includes('course-data.js'), 'base curriculum must load');
const diskPacks = fs.readdirSync(root).filter(file => /^course-[a-z-]+\.js$/.test(file));
assert.deepEqual([...packs].sort(), diskPacks.sort(), 'every course file must be included exactly once in index.html');
const context = vm.createContext({});
for (const file of ['curriculum.js', ...packs, 'auto.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename: file});
}
const read = code => JSON.parse(JSON.stringify(vm.runInContext(code, context)));
assert.deepEqual(read('autoValidateContent()'), []);
const lessons = read('AUTO_LESSONS'), questions = read('AUTO_QUESTIONS'), units = read('COURSE_UNITS');
assert.equal(units.length, 40, 'the fixed catalogue changes only with a deliberate curriculum revision');
for (const prefix of ['auto-objects-forms', 'auto-objects-context', 'auto-objects-negative']) {
  assert.ok(lessons.some(lesson => lesson.id === prefix), 'preserve original lesson ID');
  for (let i = 1; i <= 12; i++) assert.ok(questions.some(q => q.id === prefix + '-' + String(i).padStart(2, '0')), 'preserve original question ID');
}
const normalize = value => {context.__value = value; return vm.runInContext('autoNormalize(__value)', context);};
for (const lesson of lessons) {
  const pool = questions.filter(q => q.lessonId === lesson.id);
  assert.ok(pool.length >= 12, lesson.id + ': at least three tiers by four focuses');
  assert.equal(Object.keys(lesson.focusLabels).length, 4, lesson.id + ': four named objectives');
  for (const focus of Object.keys(lesson.focusLabels)) for (const level of [1, 2, 3]) {
    assert.ok(pool.some(q => q.focus === focus && q.level === level), lesson.id + ': focus/tier coverage');
  }
  assert.ok(lesson.example.zh && lesson.explanation.every(line => typeof line === 'string' && line.trim()), lesson.id + ': readable teaching notes');
}
for (const q of questions) {
  assert.ok(q.answers.every(answer => answer.length <= 200), q.id + ': answer fits saved input');
  if (q.type === 'choice') {
    assert.ok(q.choices.length >= 2 && q.choices.length <= 5, q.id + ': useful choice count');
    assert.equal(new Set(q.choices.map(normalize)).size, q.choices.length, q.id + ': distinguishable choices');
  }
  if (q.speech) assert.doesNotMatch(q.speech, /[\u3400-\u9fff→_]/, q.id + ': speech is completed Italian, not a prompt');
}
const ready = units.filter(unit => unit.status === 'ready');
assert.equal(ready.reduce((n, unit) => n + unit.lessonIds.length, 0), lessons.length);
console.log(`PASS content contract: ${lessons.length} lessons, ${questions.length} questions, ${ready.length}/${units.length} ready units; ${packs.length} isolated content files.`);
console.log('Checks cover IDs, dependencies, ownership, coverage, answer format and audio text. Human language review remains necessary.');
