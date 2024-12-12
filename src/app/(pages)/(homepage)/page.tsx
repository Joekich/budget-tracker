import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { HomePage } from 'views/home';

import { auth } from '@/prisma/auth';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - Budget Tracker', description: 'Your finance helper', path: 'homepage' });
}

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/profile/dashboard');
  }

  return <HomePage />;
}
