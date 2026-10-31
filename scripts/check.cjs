/* One entry point: node scripts/check.cjs [content|full|auto]
 * Content-only work does not boot or inspect legacy activities.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
let scope = process.argv[2] || 'auto';
if (!['auto', 'content', 'full'].includes(scope)) {
  console.error('Usage: node scripts/check.cjs [content|full|auto]'); process.exit(2);
}
function run(file, args = []) {
  const result = spawnSync(process.execPath, [...args, file], {cwd: root, stdio: 'inherit'});
  if (result.error || result.status !== 0) process.exit(result.status || 1);
}
if (scope === 'auto') {
  const diff = spawnSync('git', ['diff', '--name-only', 'HEAD'], {cwd: root, encoding: 'utf8'});
  const untracked = spawnSync('git', ['ls-files', '--others', '--exclude-standard'], {cwd: root, encoding: 'utf8'});
  const files = [...new Set(((diff.stdout || '') + '\n' + (untracked.stdout || '')).trim().split('\n').filter(Boolean))];
  if (diff.status !== 0 || untracked.status !== 0 || !files.length) scope = 'full';
  else if (files.every(file => /\.md$/i.test(file))) {console.log('Documentation-only changes: no runtime gate required.'); process.exit(0);}
  else scope = files.every(file => /^course-[a-z-]+\.js$/.test(file) || /\.md$/i.test(file)) ? 'content' : 'full';
}
console.log('Validation scope: ' + scope);
const sourceFiles = fs.readdirSync(root).filter(file => file.endsWith('.js') && (scope === 'full' || file.startsWith('course-')));
for (const file of sourceFiles) run(file, ['--check']);
run('tests/content.cjs');
if (scope === 'full') {
  run('tests/auto.cjs');
  run('tests/continuity.cjs');
  run('tests/regression.cjs');
}
console.log('PASS ' + scope + ' gate. Deployment and any required real-browser/device checks are separate.');
