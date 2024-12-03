import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { getPath } from 'shared/routing/paths';
import { DashboardPage } from 'views/dashboard';

import { auth } from '../../../model/auth';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'dashboard' });
}

async function Dashboard() {
  const session = await auth();
  if (!session) redirect(getPath('homepage'));

  return <DashboardPage session={session} />;
}

export default Dashboard;
