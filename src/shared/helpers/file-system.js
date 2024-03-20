import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getCurrentModuleDirectoryPath() {
  const filePath = fileURLToPath(import.meta.url);
  return dirname(filePath);
}

export function getFilePath(filepath) {
  const modulePath = getCurrentModuleDirectoryPath();
  const destination = resolve(modulePath, '../../../', filepath);

  return destination;
}
