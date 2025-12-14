export type ParsedTransaction = {
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM AM/PM
  description: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  currency: 'INR';
  transactionId?: string;
  utr?: string;
};
