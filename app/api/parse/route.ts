// deprecated: use app/api/pdf/parse-statement/route.ts instead
import { NextResponse } from 'next/server';
// import { readFile } from 'node:fs/promises';
// import path from 'path';
// import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';

// // Disable worker globally (important for Next.js)
// (pdfjs as any).GlobalWorkerOptions.workerSrc = false;

export async function GET() {
  // try {
  //   const pdfPath = path.resolve(
  //     process.cwd(),
  //     'public',
  //     'statements',
  //     'phonepe.pdf'
  //   );

  //   const data = new Uint8Array(await readFile(pdfPath));

  //   const loadingTask = pdfjs.getDocument({
  //     data,
  //     disableWorker: true,
  //   } as any); // 👈 TS FIX

  //   const pdf = await loadingTask.promise;

  //   let text = '';

  //   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  //     const page = await pdf.getPage(pageNum);
  //     const content = await page.getTextContent();

  //     text += content.items.map((item: any) => item.str).join(' ') + '\n';
  //   }

  //   return NextResponse.json({
  //     pages: pdf.numPages,
  //     text,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  // }
  return NextResponse.json({ message: 'Parser service is deprecated' });
}
