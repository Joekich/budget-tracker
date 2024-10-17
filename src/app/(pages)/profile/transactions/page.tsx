import { type Metadata } from 'next';
import { getMetadata } from 'shared/lib/metadata';
import { TransactionsPage } from 'views/transactions';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'transactions' });
}

function Transactions() {
  return <TransactionsPage />;
}

export default Transactions;
