import { auth } from 'app/model/auth';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { getPath } from 'shared/routing/paths';
import { getUserTransactions, TransactionsPage } from 'views/transactions';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'transactions' });
}

async function Transactions({ searchParams }: { searchParams: { page?: string; searchQuery?: string } }) {
  const session = await auth();
  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;

  if (!session || userId === null) redirect(getPath('homepage'));

  const page = parseInt(searchParams.page || '1', 10);
  const perPage = 10;
  const searchQuery = searchParams.searchQuery || '';

  const { transactions, totalTransactions } = await getUserTransactions(userId, page, perPage, searchQuery);

  return (
    <TransactionsPage
      transactions={transactions || []}
      currentPage={page}
      totalTransactions={totalTransactions}
      transactionsPerPage={perPage}
      searchQuery={searchQuery}
    />
  );
}

export default Transactions;
