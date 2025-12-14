import { prisma } from '@/lib/prisma';
import { parseTransaction } from '@/lib/agent';

export async function POST(req: Request) {
  const { text, userId } = await req.json();

  const parsed = await parseTransaction(text);

  const tx = await prisma.transaction.create({
    data: {
      userId,
      amount: parsed.amount,
      date: new Date(parsed.date),
      paymentMode: parsed.paymentMode,
      merchant: parsed.merchant,
    },
  });

  return Response.json(tx);
}
