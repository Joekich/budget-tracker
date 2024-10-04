import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function POST(request: Request) {
  const { login, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      return NextResponse.json({ error: `Пользователь не найден${JSON.stringify(user)}` }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: `Неверный логин или пароль${JSON.stringify(user)}` }, { status: 401 });
    }

    return NextResponse.json({ message: `Вы успешно авторизованы ${JSON.stringify(user)}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
