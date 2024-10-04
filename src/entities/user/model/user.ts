import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (login: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { login, password: hashedPassword },
  });
};

export const findUser = async (login: string) => prisma.user.findUnique({ where: { login } });

export const validatePassword = async (inputPassword: string, storedPassword: string) =>
  bcrypt.compare(inputPassword, storedPassword);
