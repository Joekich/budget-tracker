import { type NextRequest } from 'next/server';
import { prisma } from 'shared/lib/prisma';

import { auth } from '../../model/auth';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return new Response('Вы не авторизованы', { status: 401 });
  }

  const body = await req.json();
  const { title, titleSearch, amount, date, category, type } = body;
  const userId = session.user.id ? parseInt(session.user.id, 10) : null;

  if (!title || Number.isNaN(parseFloat(amount)) || !date || !category || !type || !userId) {
    return new Response('Некорректные данные', { status: 400 });
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        title,
        titleSearch,
        amount: parseFloat(amount),
        date: new Date(date),
        category,
        type,
        userId,
      },
    });
    return new Response(JSON.stringify({ transaction }));
  } catch {
    return new Response('Не получилось добавить транзакцию', { status: 500 });
  }
}
