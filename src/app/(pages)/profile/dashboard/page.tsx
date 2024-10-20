import { type Metadata } from 'next';
import { getMetadata } from 'shared/lib/metadata';
import { DashboardPage } from 'views/dashboard';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'dashboard' });
}

function Dashboard() {
  return <DashboardPage />;
}

export default Dashboard;
