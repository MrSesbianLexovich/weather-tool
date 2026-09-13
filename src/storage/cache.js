import { REPORTS_DIR } from './../utils/envParser.js';
import { join } from 'node:path';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';

export async function checkDirectory() {
  try {
    await access(REPORTS_DIR);
  } catch (error) {
    await mkdir(REPORTS_DIR);
  }
}

export async function getFromCache(cities, days) {
  let cachedData = [];
  for (const city of cities) {
    let date = new Date();
    for (let i = 0; i < days; i++) {
      const fileName = `${city}-${date.toISOString().split('T')[0]}.json`;
      const path = join(REPORTS_DIR, fileName);
      try {
        const data = await readFile(path, 'utf-8');
        cachedData.push(JSON.parse(data));
      } catch (error) {
        throw new Error(error);
      }
      date.setDate(date.getDate() + 1);
    }
  }
  return cachedData;
}

export async function createCache(result, date) {
  const fileName = `${result.name}-${date.toISOString().split('T')[0]}.json`;
  const path = join(REPORTS_DIR, fileName);
  await writeFile(path, JSON.stringify(result));
}
