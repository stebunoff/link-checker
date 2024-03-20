import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { getFilePath } from '../helpers/file-system.js';

export async function read(filepath) {
  const destination = getFilePath(filepath);
  if (!existsSync(destination)) {
    throw new Error(`File ${destination} not found.`);
  }

  const data = new Set();
  await readFile(destination, 'utf-8')
    .then((result) => {
      result.split('\n')
        .filter((row) => row.trim().length > 0)
        .forEach((row) => data.add(row));
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
}
