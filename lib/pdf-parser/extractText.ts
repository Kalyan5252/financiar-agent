// export async function extractPdfText(buffer: Buffer): Promise<string> {
//   const pdfjs = await import('pdfjs-dist/legacy/build/pdf.js');

//   // Disable workers for Node
//   // @ts-ignore
//   pdfjs.GlobalWorkerOptions.workerSrc = undefined;

//   const uint8Array = new Uint8Array(buffer);

//   // 👇 Cast is REQUIRED due to outdated pdfjs typings
//   const loadingTask = pdfjs.getDocument({
//     data: uint8Array,
//     disableWorker: true,
//   } as any);

//   const pdf = await loadingTask.promise;

//   let fullText = '';

//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     const page = await pdf.getPage(pageNum);
//     const content = await page.getTextContent();

//     const pageText = content.items.map((item: any) => item.str).join('\n');

//     fullText += pageText + '\n';
//   }

//   return fullText;
// }
