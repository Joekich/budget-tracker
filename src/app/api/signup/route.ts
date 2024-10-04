import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function POST(request: Request) {
  const { login, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Пользователь успешно создан', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ошибка создания пользователя.' }, { status: 500 });
  }
}
