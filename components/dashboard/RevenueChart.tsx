'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function normalizeRevenueData(raw: any[]) {
  const map = new Map<
    string,
    { day: string; income: number; expense: number }
  >();

  for (const item of raw) {
    const day = item.date;

    if (!map.has(day)) {
      map.set(day, { day, income: 0, expense: 0 });
    }

    const entry = map.get(day)!;

    if (item.type === 'income') {
      entry.income = item.amount;
    } else {
      entry.expense = item.amount;
    }
  }

  return Array.from(map.values());
}

export default function RevenueChart({ data }: { data: any[] }) {
  const chartData = normalizeRevenueData(data);

  if (!chartData.length) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-1">Revenue</h2>
        <p className="text-sm text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-1">Revenue</h2>
      <p className="text-sm text-gray-400 mb-4">Income vs Expense over time</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="day" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#34d399"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#a78bfa"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
