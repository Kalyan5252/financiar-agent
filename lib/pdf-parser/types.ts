export type ParsedTransaction = {
  date: Date;
  amount: number;
  direction: 'INCOME' | 'EXPENSE';
  merchant: string;
  description: string;
  providerTxnId: string;
  utr?: string;
};
