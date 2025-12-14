import RevenueChart from '@/components/dashboard/RevenueChart';
import DailyExpensesChart from '@/components/dashboard/DailyExpensesChart';
import SummaryPie from '@/components/dashboard/SummaryPie';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import SavingGoal from '@/components/dashboard/SavingGoal';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-400">
          Hi Jonathan, here are your financial stats
        </p>
      </div>

      {/* Top grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#161616] rounded-2xl p-6">
          <RevenueChart />
        </div>

        <div className="bg-[#161616] rounded-2xl p-6">
          <DailyExpensesChart />
        </div>

        <div className="bg-[#161616] rounded-2xl p-6">
          <SummaryPie />
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#161616] rounded-2xl p-6">
          <TransactionsTable />
        </div>

        <div className="bg-[#161616] rounded-2xl p-6">
          <SavingGoal />
        </div>
      </div>
    </div>
  );
}
