#!/usr/bin/env node
/**
 * Recreate canonical Genshi DTCG tokens from SeamKit vendor exports.
 * Vendor → recreate → tokens/source/genshi/ (single adaptation point)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vendorDir = path.join(root, 'tokens/vendor/seamkit');
const outDir = path.join(root, 'tokens/source/genshi');

const VENDOR_FILES = {
  core: 'primitive.json',
  color: 'color.json',
  sizing: 'sizing.json',
  typography: 'typography.json',
  component: 'component.json',
};

function isTokenLeaf(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return false;
  return (
    ('value' in node && 'type' in node) ||
    ('$value' in node && '$type' in node)
  );
}

function toDtcgLeaf(node) {
  if ('$value' in node && '$type' in node) {
    return { $value: rewriteRef(String(node.$value)), $type: node.$type };
  }
  return {
    $value: rewriteRef(String(node.value)),
    $type: node.type,
  };
}

function rewriteRef(value) {
  return value
    .replace(/\{sfe\./g, '{gsh.')
    .replace(/non-semantic/g, 'decorative');
}

function rewriteKey(key) {
  if (key === 'non-semantic') return 'decorative';
  if (key === 'avater') return 'avatar';
  if (key === 'sfe') return 'gsh';
  return key;
}

function transformNode(node) {
  if (isTokenLeaf(node)) {
    return toDtcgLeaf(node);
  }

  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    return node;
  }

  const out = {};
  for (const [key, value] of Object.entries(node)) {
    out[rewriteKey(key)] = transformNode(value);
  }
  return out;
}

function loadVendor(name) {
  const filePath = path.join(vendorDir, VENDOR_FILES[name]);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing vendor file: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function assertNoVendorLeakage(obj, fileLabel) {
  const json = JSON.stringify(obj);
  const forbidden = [
    { pattern: /\bsfe\b/, label: 'sfe' },
    { pattern: /non-semantic/, label: 'non-semantic' },
    { pattern: /\bintent\b/, label: 'intent path segment' },
  ];
  for (const rule of forbidden) {
    if (rule.pattern.test(json)) {
      throw new Error(`${fileLabel} contains forbidden ${rule.label}`);
    }
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

fs.mkdirSync(outDir, { recursive: true });

const core = transformNode(loadVendor('core'));
const color = transformNode(loadVendor('color'));
const sizing = transformNode(loadVendor('sizing'));
const typography = transformNode(loadVendor('typography'));
const component = transformNode(loadVendor('component'));

assertNoVendorLeakage(core, 'core.json');
assertNoVendorLeakage(color, 'color.json');
assertNoVendorLeakage(sizing, 'sizing.json');
assertNoVendorLeakage(typography, 'typography.json');
assertNoVendorLeakage(component, 'component.json');

writeJson(path.join(outDir, 'core.json'), core);
writeJson(path.join(outDir, 'color.json'), color);
writeJson(path.join(outDir, 'sizing.json'), sizing);
writeJson(path.join(outDir, 'typography.json'), typography);
writeJson(path.join(outDir, 'component.json'), component);

writeJson(path.join(outDir, '$metadata.json'), {
  tokenSetOrder: ['core', 'color', 'sizing', 'typography', 'component'],
});

console.log('Recreated Genshi tokens in', outDir);
