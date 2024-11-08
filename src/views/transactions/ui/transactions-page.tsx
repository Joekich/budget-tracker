'use client';

import clsx from 'clsx';
import { Filter } from 'features/transactions-filter';
import { Pagination } from 'features/transactions-pagination';
import { useState } from 'react';

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
};

export function TransactionsPage({ transactions }: TransactionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Транзакции</h1>
        <Filter onSearch={handleSearch} />
        <ul className={styles.transactionList}>
          {transactions.length > 0 ? (
            currentTransactions.map((transaction) => (
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
        <Pagination
          currentPage={currentPage}
          totalTransactions={filteredTransactions.length}
          transactionsPerPage={transactionsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
