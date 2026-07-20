import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SCAN_DIRS = ['docs', 'stories', 'packages/docs', '.'];
const SCAN_FILES = ['README.md', 'CONTRIBUTING.md', 'ADAPTATION.md', 'ARCHITECTURE.md', 'tokens/README.md'];

const FORBIDDEN = [
  { pattern: /\bSemantic layer\b/i, message: 'Use "Intent layer" instead of "Semantic layer"' },
  { pattern: /\bDecision tokens?\b/i, message: 'Use "Intent tokens" — Decision is ADR vocabulary only' },
  { pattern: /\bsemantic tokens?\b/i, message: 'Use "Intent tokens" in Genshi-authored docs' },
];

function collectFiles(dir) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  if (fs.statSync(abs).isFile() && /\.(md|ts|tsx)$/.test(abs)) return [abs];

  const results = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'tokens') continue;
    const full = path.join(abs, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(path.relative(root, full)));
    } else if (/\.(md|ts|tsx)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const files = new Set([
  ...SCAN_FILES.map((f) => path.join(root, f)).filter((f) => fs.existsSync(f)),
  ...SCAN_DIRS.flatMap(collectFiles),
]);

let failed = false;

for (const file of files) {
  if (file.includes(`${path.sep}tokens${path.sep}source${path.sep}`)) continue;
  if (file.includes(`${path.sep}docs${path.sep}adr${path.sep}`)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.includes('non-semantic') || line.includes('SeamKit vendor')) continue;
    if (line.includes('rejectedLayerNames') || line.includes('Rejected layer names')) continue;
    if (/Do not use|never use|not use|Do not rename|Rejected as/i.test(line)) continue;
    for (const rule of FORBIDDEN) {
      if (rule.pattern.test(line)) {
        console.error(`${path.relative(root, file)}:${i + 1}: ${rule.message}`);
        console.error(`  ${line.trim()}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log('Terminology validation passed.');
