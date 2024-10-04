import NextAuth from 'next-auth';

import { authOptions } from '../../../app/api/auth/[...nextauth]/authOptions';

export const { handlers, auth, signIn, signout } = NextAuth(authOptions);
