// import { ParsedTransaction } from './types';
// import { extractPdfText } from './extractText';

// export async function parsePhonePePDF(
//   buffer: Buffer
// ): Promise<ParsedTransaction[]> {
//   const text = await extractPdfText(buffer);

//   const lines = text
//     .split('\n')
//     .map((l) => l.trim())
//     .filter(Boolean);

//   const transactions: ParsedTransaction[] = [];
//   let current: Partial<ParsedTransaction> | null = null;

//   for (const line of lines) {
//     // Date + Time
//     const dateMatch = line.match(
//       /([A-Za-z]{3}\s\d{1,2},\s\d{4})\s(\d{2}:\d{2}\s[AP]M)/
//     );

//     if (dateMatch) {
//       if (current) transactions.push(current as ParsedTransaction);
//       current = {
//         date: normalizeDate(dateMatch[1]),
//         time: dateMatch[2],
//         currency: 'INR',
//       };
//       continue;
//     }

//     if (!current) continue;

//     // Amount + Type
//     const amountMatch = line.match(/(Credit|Debit)\s+INR\s+([\d,]+\.\d{2})/i);

//     if (amountMatch) {
//       current.type =
//         amountMatch[1].toLowerCase() === 'credit' ? 'CREDIT' : 'DEBIT';

//       current.amount = Number(amountMatch[2].replace(/,/g, ''));
//       continue;
//     }

//     // Description
//     if (line.startsWith('Paid to') || line.startsWith('Received from')) {
//       current.description = line;
//       continue;
//     }

//     // Transaction ID
//     if (line.startsWith('Transaction ID')) {
//       current.transactionId = line.split(':')[1]?.trim();
//       continue;
//     }

//     // UTR
//     if (line.startsWith('UTR')) {
//       current.utr = line.split(':')[1]?.trim();
//       continue;
//     }
//   }

//   if (current) transactions.push(current as ParsedTransaction);

//   return transactions;
// }

// function normalizeDate(input: string): string {
//   const d = new Date(input);
//   return d.toISOString().split('T')[0];
// }
