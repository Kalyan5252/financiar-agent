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

  if (!rawText || typeof rawText !== 'string') {
    return NextResponse.json(
      { error: 'Invalid statement text' },
      { status: 400 }
    );
  }

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

      // 💰 finance data
      amount: t.amount,
      direction: t.direction,
      transactionDate: t.date,
      currency: 'INR',

      // 🏦 metadata
      paymentMode: 'UPI',
      merchant: t.merchant,
      description: t.description,

      // 🔁 de-duplication
      provider: 'PHONEPE',
      providerTxnId: t.providerTxnId,
      utr: t.utr ?? null,
    })),
    skipDuplicates: true, // 🔥 CRITICAL
  });

  return NextResponse.json({
    inserted: transactions.length,
  });
}
