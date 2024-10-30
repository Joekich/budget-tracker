import { auth } from 'app/model/auth';
import { getUserTransactions } from 'app/model/get-user-transactions';
import { type Metadata } from 'next';
import { getMetadata } from 'shared/lib/metadata';
import { TransactionsPage } from 'views/transactions';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'transactions' });
}

async function Transactions() {
  const session = await auth();
  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;
  if (userId === null) {
    return <p>Пожалуйста, войдите в свой аккаунт, чтобы видеть транзакции.</p>;
  }
  const transactions = await getUserTransactions(userId);
  return <TransactionsPage transactions={transactions || []} />;
}

export default Transactions;
