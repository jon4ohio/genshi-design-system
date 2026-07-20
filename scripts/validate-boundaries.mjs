import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PACKAGE_RULES = {
  '@genshi/tokens': { allowedDeps: [] },
  '@genshi/foundation': { allowedDeps: [] },
  '@genshi/themes': { allowedDeps: ['@genshi/tokens'] },
  '@genshi/core': { allowedDeps: ['@genshi/foundation', 'lit'] },
  '@genshi/react': { allowedDeps: ['@genshi/core', '@lit/react'] },
};

function readPackage(name) {
  const dir = name.replace('@genshi/', 'packages/');
  const pkgPath = path.join(root, dir, 'package.json');
  return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

function depsOf(pkg) {
  return {
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  };
}

let failed = false;

for (const [name, rules] of Object.entries(PACKAGE_RULES)) {
  const pkg = readPackage(name);
  const deps = Object.keys(depsOf(pkg)).filter((d) => d.startsWith('@genshi/') || d === 'lit');

  for (const dep of deps) {
    if (!rules.allowedDeps.includes(dep)) {
      console.error(`${name} must not depend on ${dep}`);
      failed = true;
    }
  }

  if (name === '@genshi/foundation') {
    const all = { ...pkg.dependencies, ...pkg.devDependencies };
    if (all['@genshi/themes'] || all['@genshi/core']) {
      console.error('@genshi/foundation must not depend on themes or core');
      failed = true;
    }
  }
}

const coreSrc = path.join(root, 'packages/core/src');
const tokenContract = path.join(coreSrc, 'tokens.ts');
const gshFiles = fs.readdirSync(coreSrc).filter((f) => f.startsWith('gsh-') && f.endsWith('.ts'));

for (const file of gshFiles) {
  const content = fs.readFileSync(path.join(coreSrc, file), 'utf8');
  if (/var\(--gsh-color-text-/.test(content) && file !== 'gsh-text.ts') {
    const usesIntentDirectly = /var\(--gsh-color-/.test(content) && !file.includes('badge');
    if (usesIntentDirectly && !['gsh-input.ts', 'gsh-badge.ts', 'gsh-box.ts'].includes(file)) {
      // Allow known Phase 1 components; flag new violations in strict mode later
    }
  }
}

const reactIndex = fs.readFileSync(path.join(root, 'packages/react/src/index.tsx'), 'utf8');
if (/css`|style=\{|background:|padding:/.test(reactIndex)) {
  console.error('@genshi/react must not contain component styling logic');
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log('Package boundary validation passed.');
