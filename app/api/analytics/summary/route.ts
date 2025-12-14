import { prisma } from '@/lib/prisma';

export async function GET() {
  const total = await prisma.transaction.aggregate({
    _sum: { amount: true },
  });

  const byCategory = await prisma.transaction.groupBy({
    by: ['categoryId'],
    _sum: { amount: true },
  });

  return Response.json({ total, byCategory });
}
