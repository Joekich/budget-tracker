import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// Your own logic for dealing with plaintext password strings; be careful!
import { prisma } from 'shared/lib/prisma';

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        login: { label: 'Login', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { login: String(credentials.login) },
        });

        return user ? { id: String(user.id), name: user.login } : null;
      },
    }),
  ],
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     // Allows relative callback URLs
  //     if (url.startsWith("/")) return `${baseUrl}${url}`
  //
  //     // Allows callback URLs on the same origin
  //     if (new URL(url).origin === baseUrl) return url
  //
  //     return baseUrl
  //   }
  // }
  // pages: {
  //   signIn: '/signin',
  //   error: '/auth/error',
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       return {
  //         ...token,
  //         id: user.id,
  //         login: user.login,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         login: token.login,
  //       },
  //     };
  //   },
  // },
});
