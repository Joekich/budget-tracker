import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function POST(request: Request) {
  const { login, password } = await request.json();

  if (!login || !password) {
    return NextResponse.json({ error: 'Логин и пароль обязательны' }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { login } });
  if (existingUser) {
    return NextResponse.json({ error: 'Пользователь уже существует' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      login,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'Пользователь создан', user });
}
