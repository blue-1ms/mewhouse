import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const htmlPath = new URL('index.html', root);
let html = await readFile(htmlPath, 'utf8');

// Content-based versions invalidate browser and CDN caches after each build.
for (const path of ['assets/card.js', 'assets/card.css', 'styles.css']) {
  const content = await readFile(new URL(path, root));
  const version = createHash('sha256').update(content).digest('hex').slice(0, 16);
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reference = new RegExp(`(["'])\\./${escaped}(?:\\?v=[a-f0-9]+)?\\1`, 'g');
  if (!reference.test(html)) throw new Error(`Missing asset reference: ${path}`);
  html = html.replace(reference, `"./${path}?v=${version}"`);
}

await writeFile(htmlPath, html);
