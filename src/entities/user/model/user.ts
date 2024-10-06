import { prisma } from 'shared/lib/prisma';

export const findUser = async (login: string) => prisma.user.findUnique({ where: { login } });
