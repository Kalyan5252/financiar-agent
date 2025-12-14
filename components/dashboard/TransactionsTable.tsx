const rows = [
  {
    name: 'Samantha William',
    date: 'Apr 11',
    type: 'Income',
    amount: '$1,640.26',
  },
  {
    name: 'Grocery at Shop',
    date: 'Apr 10',
    type: 'Expense',
    amount: '$72.64',
  },
  { name: 'Coffee', date: 'Apr 09', type: 'Expense', amount: '$8.65' },
  { name: 'Karen Smith', date: 'Apr 09', type: 'Income', amount: '$842.50' },
  { name: 'Transportation', date: 'Apr 07', type: 'Expense', amount: '$18.52' },
];

export default function TransactionsTable() {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Daily Transactions</h2>

      <table className="w-full text-sm text-gray-300">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left py-2">Description</th>
            <th>Date</th>
            <th>Type</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-white/5">
              <td className="py-3">{r.name}</td>
              <td>{r.date}</td>
              <td>{r.type}</td>
              <td className="text-right">{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
