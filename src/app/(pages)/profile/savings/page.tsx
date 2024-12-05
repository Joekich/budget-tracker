import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { getPath } from 'shared/routing/paths';
import { SavingsPage } from 'views/savings';

import { auth } from '@/prisma/auth';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'settings' });
}

async function Savings() {
  const session = await auth();
  if (!session) redirect(getPath('homepage'));

  return <SavingsPage />;
}

export default Savings;
