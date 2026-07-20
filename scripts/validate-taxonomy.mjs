import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const GENSHI_SOURCE = path.join(root, 'tokens/source/genshi');
const ALLOWED_VENDOR_DOC = path.join(root, 'ADAPTATION.md');

const SKIP_DIRS = new Set([
  'node_modules',
  'dist',
  'storybook-static',
  'vendor',
  'docs',
  'scripts',
  'mappings',
]);

const PUBLIC_SCAN_DIRS = ['stories', 'packages', 'examples', '.'];
const PUBLIC_SCAN_FILES = ['README.md', 'CONTRIBUTING.md', 'ARCHITECTURE.md', 'tokens/README.md'];

function isProhibitionLine(line) {
  return /Invalid|must never|must not|No `|outside `|vendor only|Rejected|Forbidden|never appear|do not edit|read-only|lineage/i.test(
    line
  );
}

function collectFiles(dir) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  if (fs.statSync(abs).isFile()) return [abs];

  const results = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(abs, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(path.relative(root, full)));
    } else if (/\.(md|ts|tsx|css|json|mjs)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function walkJsonFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkJsonFiles(full));
    } else if (entry.name.endsWith('.json')) {
      results.push(full);
    }
  }
  return results;
}

function scanContent(file, content, rules) {
  const rel = path.relative(root, file);
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (isProhibitionLine(line)) continue;
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        console.error(`${rel}:${i + 1}: ${rule.message}`);
        console.error(`  ${line.trim()}`);
        return true;
      }
    }
  }
  return false;
}

let failed = false;

const taxonomyPath = path.join(root, 'mappings/taxonomy.json');
if (!fs.existsSync(taxonomyPath)) {
  console.error('mappings/taxonomy.json: missing authoritative public taxonomy');
  failed = true;
} else {
  const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
  if (taxonomy._meta?.publicApi !== true) {
    console.error('mappings/taxonomy.json: _meta.publicApi must be true');
    failed = true;
  }
  if (!taxonomy.domains?.color?.includes('decorative')) {
    console.error('mappings/taxonomy.json: decorative domain missing under color');
    failed = true;
  }
}

function failScan(file, content, rules) {
  if (scanContent(file, content, rules)) {
    failed = true;
  }
}

const vendorRules = [
  { pattern: /--sfe-|\{sfe\.|non-semantic/, message: 'vendor terminology outside allowed locations' },
];
const intentPathRules = [
  {
    pattern: /gsh\.color\.intent(?!\s*…)|--gsh-[a-z0-9-]*-intent-/,
    message: 'intent segment in public namespace',
  },
  { pattern: /\bIntent domains\b/i, message: 'use "token domains" instead of "Intent domains"' },
];

for (const file of walkJsonFiles(GENSHI_SOURCE)) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  if (/\bsfe\b|"sfe"|non-semantic/.test(content)) {
    console.error(`${rel}: vendor terminology in canonical Genshi source`);
    failed = true;
  }
  if (/"intent"\s*:/.test(content)) {
    console.error(`${rel}: intent path segment in canonical source`);
    failed = true;
  }
}

const generatedCss = path.join(root, 'tokens/generated/css/tokens.css');
if (fs.existsSync(generatedCss)) {
  const css = fs.readFileSync(generatedCss, 'utf8');
  if (/--sfe-|\bsfe\b/.test(css)) {
    console.error('tokens/generated/css/tokens.css: vendor CSS variables in generated output');
    failed = true;
  }
  if (/--gsh-color-intent-/.test(css)) {
    console.error('tokens/generated/css/tokens.css: intent segment in public CSS namespace');
    failed = true;
  }
  if (!/--gsh-color-decorative-/.test(css)) {
    console.error('tokens/generated/css/tokens.css: expected decorative domain variables');
    failed = true;
  }
}

for (const file of [
  ...PUBLIC_SCAN_FILES.map((f) => path.join(root, f)).filter((f) => fs.existsSync(f)),
  ...PUBLIC_SCAN_DIRS.flatMap(collectFiles),
]) {
  if (file === ALLOWED_VENDOR_DOC) continue;
  if (file.includes(`${path.sep}tokens${path.sep}vendor${path.sep}`)) continue;

  const content = fs.readFileSync(file, 'utf8');
  failScan(file, content, vendorRules);
  failScan(file, content, intentPathRules);
}

if (failed) {
  process.exit(1);
}

console.log('Taxonomy validation passed.');
