import { request } from 'undici';
import { writeFile } from "node:fs/promises";
import { read } from "./shared/libs/file-reader.js";
import { checkStatusCode, validateURL } from './shared/helpers/validation.js';

const FILEPATH = 'data/input.txt';
const urls = await read(FILEPATH);
const SLEEP_INTERVAL = 500;
const ERRORS_LOG = 'data/errors.txt';

const sleep = msec => {
  const end = new Date().getTime() + msec;
  while(new Date().getTime() < end);
}

let counter = 0;
for (const url of urls) {
  try {
    validateURL(url);
    const { statusCode } = await request(url);
    checkStatusCode(statusCode);
    counter++;
    sleep(SLEEP_INTERVAL);
  } catch ({ message }) {
    const errorMessage = `${url} - ${message}\n`;
    await writeFile(ERRORS_LOG, errorMessage, { flag: 'a+' }, (err) => {
      if (err) throw err;
    });
  }
}
console.log(`${counter} URLs from ${urls.size} passed the test.`);
process.exit(0);
