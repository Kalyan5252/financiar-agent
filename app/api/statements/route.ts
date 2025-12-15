import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { parsePhonePeStatement } from '@/lib/parsePhonePeStatement';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { rawText } = await req.json();

  const transactions = parsePhonePeStatement(rawText);

  if (!transactions.length) {
    return NextResponse.json(
      { error: 'No transactions detected' },
      { status: 400 }
    );
  }

  await prisma.transaction.createMany({
    data: transactions.map((t) => ({
      userId: session.user.id,
      amount: t.amount,
      date: t.date,
      paymentMode: 'UPI',
      merchant: t.merchant,
      description: t.description,
    })),
  });

  return NextResponse.json({
    inserted: transactions.length,
  });
}
