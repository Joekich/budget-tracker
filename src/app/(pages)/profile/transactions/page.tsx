import { auth } from 'app/model/auth';
import { type TransactionType } from 'entities/transaction';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { getPath } from 'shared/routing/paths';
import { getUserTransactions, TransactionsPage } from 'views/transactions';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'transactions' });
}

async function Transactions({
  searchParams,
}: {
  searchParams: {
    page?: string;
    searchQuery?: string;
    type?: TransactionType;
    categories?: string;
    amountMin?: string;
    amountMax?: string;
    dateStart?: string;
    dateEnd?: string;
  };
}) {
  const session = await auth();
  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;

  if (!session || userId === null) redirect(getPath('homepage'));

  const page = parseInt(searchParams.page || '1', 10);
  const perPage = 10;
  const searchQuery = searchParams.searchQuery || '';

  const filters = {
    type: searchParams.type as TransactionType | null,
    categories: searchParams.categories ? searchParams.categories.split(',') : [],
    amountRange: {
      min: searchParams.amountMin ? parseFloat(searchParams.amountMin) : null,
      max: searchParams.amountMax ? parseFloat(searchParams.amountMax) : null,
    },
    dateRange: {
      start:
        searchParams.dateStart && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.dateStart)
          ? new Date(`${searchParams.dateStart}T00:00:00Z`)
          : null,
      end:
        searchParams.dateEnd && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.dateEnd)
          ? new Date(`${searchParams.dateEnd}T00:00:00Z`)
          : null,
    },
  };

  const { transactions, totalTransactions } = await getUserTransactions(userId, page, perPage, searchQuery, filters);

  return (
    <TransactionsPage transactions={transactions} totalTransactions={totalTransactions} transactionsPerPage={perPage} />
  );
}

export default Transactions;
