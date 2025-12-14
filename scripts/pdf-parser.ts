import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';

export function parsePdfToText(pdfPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile('pdftotext', ['-layout', pdfPath, '-'], (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}

// test
(async () => {
  const text = await parsePdfToText('./public/statements/phonepe.pdf');
  console.log(text);
})();
