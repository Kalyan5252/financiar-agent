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

  // 2️⃣ Daily expenses
  const dailyExpenses = await prisma.transaction.groupBy({
    by: ['transactionDate'],
    where: {
      userId,
      direction: 'EXPENSE',
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      transactionDate: 'asc',
    },
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
    select: {
      id: true,
      transactionDate: true,
      direction: true,
      amount: true,
      merchant: true,
    },
    orderBy: { transactionDate: 'desc' },
  });

  if (!transactions.length) {
    return NextResponse.json({
      revenue: [],
      dailyExpenses: [],
      categorySummary: [],
      transactions: [],
    });
  }

  // 1Revenue chart (income + expense per day)
  const revenueMap = new Map<string, { income: number; expense: number }>();

  for (const t of transactions) {
    const dateKey = t.transactionDate.toISOString().slice(0, 10);

    if (!revenueMap.has(dateKey)) {
      revenueMap.set(dateKey, { income: 0, expense: 0 });
    }

    const entry = revenueMap.get(dateKey)!;

    if (t.direction === 'INCOME') {
      entry.income += t.amount;
    } else {
      entry.expense += t.amount;
    }
  }

  const revenue = Array.from(revenueMap.entries()).flatMap(([date, values]) => [
    { date, type: 'income', amount: values.income },
    { date, type: 'expense', amount: values.expense },
  ]);

  return NextResponse.json({
    revenue,

    dailyExpenses: dailyExpenses.map((d) => ({
      day: d.transactionDate.toISOString().slice(0, 10),
      expense: d._sum.amount ?? 0,
    })),

    categorySummary: categorySummary.map((c) => ({
      category: categoryMap[c.categoryId ?? ''] ?? 'Uncategorized',
      total: Math.abs(c._sum.amount ?? 0),
    })),

    transactions: transactions.map((t) => ({
      id: t.id,
      merchant:
        t.merchant?.replace(/\s*(Transaction ID|UTR No).*$/i, '').trim() || '',
      date: t.transactionDate.toISOString().slice(0, 10), // consistent format
      type: t.direction === 'INCOME' ? 'Income' : 'Expense',
      amount: Math.abs(t.amount),
    })),
  });
}
