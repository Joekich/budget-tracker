import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { getPath } from 'shared/routing/paths';
import { DashboardPageManager, getTransactionsByDate, getTransactionYears } from 'views/dashboard';

import { auth } from '@/prisma/auth';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - Budget Tracker', description: 'Your finance helper', path: 'dashboard' });
}

async function Dashboard({ searchParams }: { searchParams: { year?: string; month?: string } }) {
  const session = await auth();
  if (!session) redirect(getPath('homepage'));

  const userId = session.user?.id ? parseInt(session.user.id, 10) : null;
  if (!userId) redirect(getPath('homepage'));

  const year = searchParams.year || new Date().getFullYear().toString();
  const month = searchParams.month || 'all';

  const transactions = await getTransactionsByDate(userId, year, month);
  const years = await getTransactionYears(userId);

  return <DashboardPageManager transactions={transactions} years={years} initialYear={year} initialMonth={month} />;
}

export default Dashboard;
