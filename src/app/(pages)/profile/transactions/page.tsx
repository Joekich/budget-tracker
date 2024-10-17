import { type Metadata } from 'next';
import { getMetadata } from 'shared/lib/metadata';
import { TransactionsPage } from 'views/transactions';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'transactions' });
}

const Transactions = () => <TransactionsPage />;

export default Transactions;
