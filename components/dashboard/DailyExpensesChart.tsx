'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// const data = [
//   { day: '1', expense: 120 },
//   { day: '2', expense: 80 },
//   { day: '3', expense: 140 },
//   { day: '4', expense: 100 },
//   { day: '5', expense: 160 },
//   { day: '6', expense: 130 },
// ];

export default function DailyExpensesChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <>
        <h2 className="text-lg font-semibold mb-1">Daily Expenses</h2>
        <p className="text-sm text-gray-400">No expense data available</p>
      </>
    );
  }

  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const startDate = new Date(sorted[0].day).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

  const endDate = new Date(sorted[sorted.length - 1].day).toLocaleDateString(
    'en-IN',
    { day: 'numeric', month: 'short', year: '2-digit' }
  );

  return (
    <>
      <h2 className="text-lg font-semibold mb-1">Daily Expenses</h2>
      <p className="text-sm text-gray-400 mb-4">
        Data from {startDate} – {endDate}
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip />
          <Bar dataKey="expense" fill="#a78bfa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
