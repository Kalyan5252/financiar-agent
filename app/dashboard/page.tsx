import CategoryPie from '@/components/charts/CategoryPie';

export default function Dashboard() {
  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <CategoryPie />
    </div>
  );
}
