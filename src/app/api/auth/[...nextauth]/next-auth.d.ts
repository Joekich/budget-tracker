import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    login: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      login: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    login: string;
  }
}
