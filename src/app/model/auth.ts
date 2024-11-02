import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { findUser } from 'entities/user';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from 'shared/lib/prisma';

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session }) => {
      const user = await findUser(String(session.user.name));
      const transactions = await prisma.transaction.findMany({
        where: { userId: user?.id },
      });
      return {
        ...session,
        user: {
          id: user?.id.toString(),
          name: user?.login,
        },
        transactions,
      };
    },
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        login: { label: 'Login', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const login = credentials?.login as string;
        const password = credentials?.password as string;

        if (!login || !password) {
          throw new Error('Empty login or password');
        }

        const user = await findUser(login);
        if (!user) throw new Error('Пользователь не найден');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Неверный пароль');

        return { id: String(user.id), name: user.login };
      },
    }),
  ],
});
