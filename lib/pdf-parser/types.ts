type ParsedTransaction = {
  date: Date;
  amount: number;
  paymentMode: 'UPI' | 'CARD' | 'BANK' | 'CASH';
  merchant: string;
  description: string;
};
