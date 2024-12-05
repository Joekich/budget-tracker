import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { getPath } from 'shared/routing/paths';

import { auth } from '@/prisma/auth';

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return new Response('Вы не авторизованы', { status: 401 });
  }

  const body = await req.json();
  const { id, title, titleSearch, amount, date, category, type } = body;

  if (!id || !title || Number.isNaN(parseFloat(amount)) || !date || !category || !type) {
    return new Response('Некорректные данные', { status: 400 });
  }

  try {
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        titleSearch,
        amount: parseFloat(amount),
        date: new Date(date),
        category,
        type,
      },
    });

    revalidatePath(getPath('transactions'), 'page');

    return new Response(JSON.stringify({ transaction }));
  } catch {
    return new Response('Не получилось обновить транзакцию', { status: 500 });
  }
}
