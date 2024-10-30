import { prisma } from 'shared/lib/prisma';

export async function getUserTransactions(userId: number) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
    });
    return transactions || [];
  } catch {
    return null;
  }
}
