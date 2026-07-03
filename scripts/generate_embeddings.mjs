import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { embedMany } from 'ai';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_DIR = join(__dirname, '..', 'src', 'data', 'books');
const OUTPUT = join(__dirname, '..', 'src', 'data', 'embeddings.json');

const verses = [];
const files = ['bhagavad-gita.json', 'bible.json', 'quran.json', 'torah.json', 'guru-granth-sahib.json', 'dhammapada.json'];

for (const fname of files) {
  const data = JSON.parse(readFileSync(join(BOOKS_DIR, fname), 'utf-8'));
  for (const ch of data.chapters) {
    for (const v of ch.verses) {
      verses.push({ id: v.id, text: (v.translation || v.text).slice(0, 500) });
    }
  }
}

console.log(`Total verses to embed: ${verses.length}`);

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error('GOOGLE_GENERATIVE_AI_API_KEY not set.');
  process.exit(1);
}

const lookup = {};
if (existsSync(OUTPUT)) {
  Object.assign(lookup, JSON.parse(readFileSync(OUTPUT, 'utf-8')));
  console.log(`Loaded ${Object.keys(lookup).length} existing embeddings`);
}

const todo = verses.filter((v) => !lookup[v.id]);
const BATCH = 10;
console.log(`${todo.length} remaining, will take ${Math.ceil(todo.length / BATCH)} batches of ${BATCH}`);

let errors = 0;

for (let i = 0; i < todo.length; i += BATCH) {
  const batch = todo.slice(i, i + BATCH);
  const batchNum = Math.floor(i / BATCH) + 1;
  const total = Math.ceil(todo.length / BATCH);

  try {
    console.log(`Batch ${batchNum}/${total} (${batch.length})...`);
    const { embeddings } = await embedMany({
      model: google.embedding('gemini-embedding-2'),
      values: batch.map((v) => v.text),
    });

    batch.forEach((v, idx) => {
      lookup[v.id] = embeddings[idx];
    });

    writeFileSync(OUTPUT, JSON.stringify(lookup), 'utf-8');
    const pct = (Object.keys(lookup).length / verses.length * 100).toFixed(1);
    console.log(`  → ${Object.keys(lookup).length}/${verses.length} (${pct}%)`);

    if (i + BATCH < todo.length) {
      const wait = 5000;
      console.log(`  → Waiting ${wait / 1000}s...`);
      await new Promise((r) => setTimeout(r, wait));
    }
  } catch (e) {
    errors++;
    console.error(`Batch ${batchNum} failed: ${e.message}`);
    if (e.message.includes('QUOTA') || e.message.includes('429') || e.message.includes('quota')) {
      console.log('Quota limit reached. Saving progress and stopping.');
      break;
    }
    await new Promise((r) => setTimeout(r, 10000));
  }
}

console.log(`\nFinal: ${Object.keys(lookup).length}/${verses.length} embedded. ${errors} batch errors.`);
