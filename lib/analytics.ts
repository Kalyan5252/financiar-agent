export function summarizeTransactions(transactions: any[]) {
  // minimal stub summary
  return {
    total: transactions.reduce((s: number, t: any) => s + (t.amount || 0), 0),
    count: transactions.length,
  };
}
