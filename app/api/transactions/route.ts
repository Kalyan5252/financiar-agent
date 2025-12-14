import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession();
  const body = await req.json();

  const tx = await prisma.transaction.create({
    data: {
      userId: session!.user!.email!,
      amount: body.amount,
      date: new Date(body.date),
      paymentMode: body.paymentMode,
      merchant: body.merchant,
      categoryId: body.categoryId,
    },
  });

  return Response.json(tx);
}
