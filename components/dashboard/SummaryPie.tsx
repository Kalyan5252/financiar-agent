'use client';

import { PieChart, Pie, Cell } from 'recharts';

// const data = [
//   { name: 'Food & Drink', value: 48, color: '#34d399' },
//   { name: 'Grocery', value: 32, color: '#a78bfa' },
//   { name: 'Shopping', value: 13, color: '#f472b6' },
//   { name: 'Transport', value: 7, color: '#facc15' },
// ];

export default function SummaryPie({ data }: { data: any[] }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Summary</h2>

      <div className="flex items-center gap-6">
        <PieChart width={180} height={180}>
          <Pie data={data} dataKey="value" innerRadius={60} outerRadius={80}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>

        <div className="space-y-2 text-sm">
          {data.map((d) => (
            <div key={d.name} className="flex justify-between w-40">
              <span className="text-gray-300">{d.name}</span>
              <span>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
