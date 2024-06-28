import fs from 'fs/promises';
import path from 'path';

const NUM_FILES = 20;
const PHRASES_PER_FILE = 100000;

async function readFile(filename) {
  const content = await fs.readFile(filename, 'utf-8');
  return new Set(content.split('\n'));
}

async function processFiles() {
  const allPhrases = new Set();
  const phrasesCounts = new Map();

  for (let i = 0; i < NUM_FILES; i++) {
    const filename = path.join('data', `out${i}.txt`);
    const phrases = await readFile(filename);

    for (const phrase of phrases) {
      allPhrases.add(phrase);
      phrasesCounts.set(phrase, (phrasesCounts.get(phrase) || 0) + 1);
    }
  }

  return { allPhrases, phrasesCounts };
}

function uniqueUsernames(allPhrases) {
  console.log(`Кількість унікальних юзернеймів: ${allPhrases.size}`);
}

function usernamesInAllFiles(phrasesCounts) {
  const count = Array.from(phrasesCounts.values()).filter(
    count => count === NUM_FILES
  ).length;
  console.log(
    `Кількість юзернеймів, що з'являються у всіх ${NUM_FILES} файлах: ${count}`
  );
}

function usernamesInAtLeastTenFiles(phrasesCounts) {
  const count = Array.from(phrasesCounts.values()).filter(
    count => count >= 10
  ).length;
  console.log(
    `Кількість юзернеймів, що з'являються принаймні у 10 файлах: ${count}`
  );
}

async function main() {
  console.time('Час виконання');

  const { allPhrases, phrasesCounts } = await processFiles();

  uniqueUsernames(allPhrases);
  usernamesInAllFiles(phrasesCounts);
  usernamesInAtLeastTenFiles(phrasesCounts);

  console.timeEnd('Час виконання');
}

main().catch(console.error);
