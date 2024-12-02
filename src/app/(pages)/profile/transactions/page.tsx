import { auth } from 'app/model/auth';
import {
  TRANSACTION_EXPENSE_CATEGORIES,
  TRANSACTION_INCOME_CATEGORIES,
  type TransactionType,
} from 'entities/transaction';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMetadata } from 'shared/lib/metadata';
import { getPath } from 'shared/routing/paths';
import { getUserTransactions, TransactionsPage } from 'views/transactions';
import { z } from 'zod';

const ALL_CATEGORIES = [...TRANSACTION_INCOME_CATEGORIES, ...TRANSACTION_EXPENSE_CATEGORIES];

const filtersSchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  searchQuery: z.string().optional(),
  type: z.enum(['income', 'expense']).optional(),
  categories: z.preprocess(
    (value) => (typeof value === 'string' ? value.split(',') : []),
    z.array(z.enum(ALL_CATEGORIES as [string, ...string[]])).default([]),
  ),
  amountMin: z
    .string()
    .regex(/^\d+?$/, 'Введите корректное число')
    .transform((value) => parseInt(value, 10))
    .optional(),
  amountMax: z
    .string()
    .regex(/^\d+$/, 'Введите корректное число')
    .transform((value) => parseInt(value, 10))
    .optional(),
  dateStart: z.preprocess((value) => (typeof value === 'string' ? new Date(value) : value), z.date().optional()),
  dateEnd: z.preprocess((value) => (typeof value === 'string' ? new Date(value) : value), z.date().optional()),
});

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

  let validatedFilters;
  try {
    validatedFilters = filtersSchema.parse(searchParams);
  } catch (error) {
    console.error('Ошибка валидации:', error);
    throw new Error('Некорректные параметры фильтров');
  }

  const filters = {
    type: validatedFilters.type as TransactionType | null,
    categories: validatedFilters.categories || [],
    amountRange: {
      min: validatedFilters.amountMin || null,
      max: validatedFilters.amountMax || null,
    },
    dateRange: {
      start: validatedFilters.dateStart || null,
      end: validatedFilters.dateEnd || null,
    },
  };

  const page = parseInt(searchParams.page || '1', 10);
  const perPage = 10;
  const searchQuery = searchParams.searchQuery || '';

  const { transactions: untypedTransactions, totalTransactions } = await getUserTransactions(
    userId,
    page,
    perPage,
    searchQuery,
    filters,
  );

  const transactions = untypedTransactions.map((transaction) => ({
    ...transaction,
    type: transaction.type as TransactionType,
  }));

  return (
    <TransactionsPage transactions={transactions} totalTransactions={totalTransactions} transactionsPerPage={perPage} />
  );
}

export default Transactions;
