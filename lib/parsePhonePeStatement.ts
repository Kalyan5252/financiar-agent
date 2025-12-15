import { ParsedTransaction } from './pdf-parser/types';

export function parsePhonePeStatement(text: string): ParsedTransaction[] {
  const results: ParsedTransaction[] = [];

  const clean = text.replace(/\s+/g, ' ');

  const blocks = clean.split(
    /(?=(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\s+\d{1,2}:\d{2}\s+(AM|PM))/
  );

  for (const block of blocks) {
    // ⛔ Skip gift card / cashback noise
    if (/Gift Card|Cashback Received/i.test(block)) continue;

    // 1️⃣ Date
    const dateMatch = block.match(
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\s+\d{1,2}:\d{2}\s+(AM|PM)/
    );
    if (!dateMatch) continue;

    const date = new Date(dateMatch[0]);

    // 2️⃣ Direction (SOURCE OF TRUTH)
    const isCredit = /\bCredit\b/.test(block);
    const isDebit = /\bDebit\b/.test(block);
    if (!isCredit && !isDebit) continue;

    const direction: 'INCOME' | 'EXPENSE' = isCredit ? 'INCOME' : 'EXPENSE';

    // 3️⃣ Amount
    const amountMatch = block.match(/INR\s+([\d,.]+)/);
    if (!amountMatch) continue;

    const amount = parseFloat(amountMatch[1].replace(/,/g, ''));

    // 4️⃣ Merchant
    let merchant = 'Unknown';
    const receivedMatch = block.match(/Received from ([A-Za-z0-9\s.&*-]+)/i);
    const paidMatch = block.match(/Paid to ([A-Za-z0-9\s.&*-]+)/i);

    if (receivedMatch) merchant = receivedMatch[1].trim();
    else if (paidMatch) merchant = paidMatch[1].trim();
    merchant = merchant.replace(/\s*Transaction ID.*$/i, '').trim();

    // 5️⃣ Provider Transaction ID (MANDATORY)
    const txnIdMatch = block.match(/Transaction ID\s*:\s*([A-Z0-9]+)/i);
    if (!txnIdMatch) continue; // ⛔ cannot store without this

    const providerTxnId = txnIdMatch[1];

    // 6️⃣ UTR (optional)
    const utrMatch = block.match(/UTR No\s*:\s*(\d+)/i);
    const utr = utrMatch?.[1];

    results.push({
      date,
      amount,
      direction,
      merchant,
      description: block.slice(0, 180),
      providerTxnId,
      utr,
    });
  }

  return results;
}
