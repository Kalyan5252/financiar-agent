'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: '1', income: 400, expense: 300 },
  { day: '2', income: 600, expense: 500 },
  { day: '3', income: 300, expense: 200 },
  { day: '4', income: 700, expense: 600 },
  { day: '5', income: 500, expense: 400 },
  { day: '6', income: 650, expense: 550 },
];

export default function RevenueChart() {
  return (
    <>
      <h2 className="text-lg font-semibold mb-1">Revenue</h2>
      <p className="text-sm text-gray-400 mb-4">Data from 1–12 Apr, 2024</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
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
