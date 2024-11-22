'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { TransactionsPagination } from './pagination/transactions-pagination';
import { TransactionsSearch } from './search/transactions-search';
import styles from './transactions-page.module.scss';

type Transaction = {
  id: number;
  title: string;
  amount: number;
  date: Date;
  category: string;
  type: string;
};

type TransactionsPageProps = {
  transactions: Transaction[];
  currentPage: number;
  totalTransactions: number;
  transactionsPerPage: number;
  searchQuery: string;
};

export function TransactionsPage({
  transactions,
  currentPage,
  totalTransactions,
  transactionsPerPage,
  searchQuery,
}: TransactionsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.has('page') && transactions.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
  }, [searchParams, transactions, router]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('searchQuery', query);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Транзакции</h1>
        <TransactionsSearch defaultQuery={searchQuery} onSearch={handleSearch} />
        <ul className={styles.transactionList}>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li
                key={transaction.id}
                className={clsx(styles.transactionItem, transaction.type === 'income' ? styles.income : styles.expense)}
              >
                <div className={styles.transactionTitle}>{transaction.title}</div>
                <div className={styles.transactionAmount}>{transaction.amount} ₽</div>
                <div className={styles.transactionCategory}>{transaction.category}</div>
                <div className={styles.transactionType}>{transaction.type === 'income' ? 'Доход' : 'Расход'}</div>
                <div className={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString()}</div>
              </li>
            ))
          ) : (
            <li>Нет транзакций для отображения</li>
          )}
        </ul>
        <TransactionsPagination
          currentPage={currentPage}
          totalTransactions={totalTransactions}
          transactionsPerPage={transactionsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
