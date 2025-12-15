import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // 📅 Date ranges
    const now = new Date();

    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // 📦 Fetch transactions (last + current month)
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        transactionDate: {
          gte: startOfLastMonth,
        },
      },
      select: {
        amount: true,
        direction: true,
        transactionDate: true,
        merchant: true,
      },
    });

    if (transactions.length === 0) {
      return NextResponse.json({
        insights: ['Not enough data to generate financial insights yet.'],
      });
    }

    // 📊 METRICS
    const metrics = {
      totalIncome: 0,
      totalExpense: 0,
      dailyExpenseMap: {} as Record<string, number>,
      highestExpense: 0,
      smallExpenseCount: 0,
      incomeDays: new Set<string>(),
    };

    for (const t of transactions) {
      const dateKey = t.transactionDate.toISOString().slice(0, 10);

      if (t.direction === 'INCOME') {
        metrics.totalIncome += t.amount;
        metrics.incomeDays.add(dateKey);
      } else {
        metrics.totalExpense += Math.abs(t.amount);
        metrics.dailyExpenseMap[dateKey] =
          (metrics.dailyExpenseMap[dateKey] || 0) + Math.abs(t.amount);

        if (Math.abs(t.amount) > metrics.highestExpense) {
          metrics.highestExpense = Math.abs(t.amount);
        }

        if (Math.abs(t.amount) < 100) {
          metrics.smallExpenseCount += 1;
        }
      }
    }

    const avgDailyExpense =
      Object.values(metrics.dailyExpenseMap).reduce((a, b) => a + b, 0) /
      Object.keys(metrics.dailyExpenseMap).length;

    const netSavings = metrics.totalIncome - metrics.totalExpense;

    // 🧠 AI PROMPT (THIS IS IMPORTANT)
    const prompt = `
You are a financial analyst AI.

Based on the following metrics, generate EXACTLY 10 insights.
Each insight must be 10–15 words.
No emojis. No numbering. No headings.

Metrics:
- Total income: ${metrics.totalIncome.toFixed(2)}
- Total expenses: ${metrics.totalExpense.toFixed(2)}
- Net savings: ${netSavings.toFixed(2)}
- Average daily expense: ${avgDailyExpense.toFixed(2)}
- Highest single expense: ${metrics.highestExpense.toFixed(2)}
- Number of small expenses (<100): ${metrics.smallExpenseCount}
- Number of income days: ${metrics.incomeDays.size}

Focus on:
- Spending behavior
- Income consistency
- Expense spikes
- Savings health
- Patterns and risks
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: 'You generate concise financial insights.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const insights = completion.choices[0].message.content
      ?.split('\n')
      .filter(Boolean)
      .slice(0, 10);

    return NextResponse.json({
      insights,
    });
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI summary' },
      { status: 500 }
    );
  }
}
