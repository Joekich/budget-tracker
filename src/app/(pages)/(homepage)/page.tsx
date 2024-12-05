import { redirect } from 'next/navigation';
import { HomePage } from 'views/home';

import { auth } from '@/prisma/auth';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/profile/dashboard');
  }

  return <HomePage />;
}
