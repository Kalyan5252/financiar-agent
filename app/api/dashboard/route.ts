import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  // 1️⃣ Revenue (income)
  const revenue = await prisma.transaction.groupBy({
    by: ['date'],
    where: {
      userId,
      amount: { gt: 0 },
    },
    _sum: { amount: true },
    orderBy: { date: 'asc' },
  });

  // 2️⃣ Daily expenses
  const dailyExpenses = await prisma.transaction.groupBy({
    by: ['date'],
    where: {
      userId,
      amount: { lt: 0 },
    },
    _sum: { amount: true },
    orderBy: { date: 'asc' },
  });

  // 3️⃣ Category summary
  const categorySummary = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      amount: { lt: 0 },
    },
    _sum: { amount: true },
  });

  const categories = await prisma.category.findMany({
    where: { userId },
  });

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  // 4️⃣ Recent transactions
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 10,
  });

  return NextResponse.json({
    revenue: revenue.map((r) => ({
      date: r.date.toISOString().slice(0, 10),
      income: r._sum.amount ?? 0,
    })),

    dailyExpenses: dailyExpenses.map((d) => ({
      date: d.date.toISOString().slice(0, 10),
      expense: Math.abs(d._sum.amount ?? 0),
    })),

    categorySummary: categorySummary.map((c) => ({
      category: categoryMap[c.categoryId ?? ''] ?? 'Uncategorized',
      total: Math.abs(c._sum.amount ?? 0),
    })),

    transactions: transactions.map((t) => ({
      id: t.id,
      merchant: t.merchant ?? 'Unknown',
      date: t.date.toDateString(),
      type: t.amount > 0 ? 'Income' : 'Expense',
      amount: Math.abs(t.amount),
    })),
  });
}
