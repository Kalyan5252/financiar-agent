'use client';
import { PieChart, Pie, Tooltip } from 'recharts';

export default function CategoryPie() {
  const data = [
    { name: 'Food', value: 4500 },
    { name: 'Bills', value: 2200 },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" />
      <Tooltip />
    </PieChart>
  );
}
