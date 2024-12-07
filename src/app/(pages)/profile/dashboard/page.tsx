import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { getPath } from 'shared/routing/paths';
import { DashboardPageManager, getLastMonthTransactions, getTransactionYears } from 'views/dashboard';

import { auth } from '@/prisma/auth';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'dashboard' });
}

async function Dashboard() {
  const session = await auth();
  if (!session) redirect(getPath('homepage'));

  const userId = session.user?.id ? parseInt(session.user.id, 10) : null;
  if (!userId) redirect(getPath('homepage'));

  const transactions = await getLastMonthTransactions(userId);
  const years = await getTransactionYears(userId);

  return <DashboardPageManager transactions={transactions} years={years} />;
}

export default Dashboard;
