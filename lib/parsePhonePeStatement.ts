export function parsePhonePeStatement(text: string) {
  const transactions: any[] = [];

  const lines = text
    .replace(/\s+/g, ' ')
    .split(/(?=Nov|Dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct)/);

  for (const block of lines) {
    try {
      const dateMatch = block.match(
        /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\s+\d{1,2}:\d{2}\s+(AM|PM)/
      );
      const amountMatch = block.match(/INR\s+([\d,.]+)/);
      const debitCreditMatch = block.match(/\b(Debit|Credit)\b/i);

      if (!dateMatch || !amountMatch || !debitCreditMatch) continue;

      const merchantMatch =
        block.match(/Paid to ([A-Z0-9\s.&*-]+)/i) ||
        block.match(/Received from ([A-Z0-9\s.&*-]+)/i);

      const date = new Date(dateMatch[0]);
      const amount = parseFloat(amountMatch[1].replace(/,/g, ''));

      transactions.push({
        date,
        amount,
        paymentMode: 'UPI',
        merchant: merchantMatch?.[1]?.trim() ?? 'UNKNOWN',
        description: block.slice(0, 120),
      });
    } catch {
      continue;
    }
  }

  return transactions;
}
