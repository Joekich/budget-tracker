'use client';

import clsx from 'clsx';
import { useState } from 'react';
import {
  TbSquareRoundedNumber1,
  TbSquareRoundedNumber2,
  TbSquareRoundedNumber3,
  TbSquareRoundedNumber4,
} from 'react-icons/tb';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

import { TransactionFilters } from '../filters/transaction-filters';
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
  totalTransactions: number;
  transactionsPerPage: number;
};

export function TransactionsPage({ transactions, totalTransactions, transactionsPerPage }: TransactionsPageProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const renderFilterIcon = () => {
    switch (activeFiltersCount) {
      case 1:
        return <TbSquareRoundedNumber1 className={styles.filterIcon} size={20} />;
      case 2:
        return <TbSquareRoundedNumber2 className={styles.filterIcon} size={20} />;
      case 3:
        return <TbSquareRoundedNumber3 className={styles.filterIcon} size={20} />;
      case 4:
        return <TbSquareRoundedNumber4 className={styles.filterIcon} size={20} />;
      default:
        return null;
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Транзакции</h1>
        <div className={styles.actions}>
          <TransactionsSearch />
          <Button
            theme="primary"
            className={styles.filterButton}
            onClick={() => {
              setIsFiltersOpen(true);
            }}
          >
            Фильтры
            {renderFilterIcon()}
          </Button>
        </div>
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
        <TransactionsPagination totalTransactions={totalTransactions} transactionsPerPage={transactionsPerPage} />
      </div>
      <Modal
        forceMount
        isOpen={isFiltersOpen}
        onClose={() => {
          setIsFiltersOpen(false);
        }}
      >
        <TransactionFilters
          onClose={() => {
            setIsFiltersOpen(false);
          }}
          onFiltersChange={setActiveFiltersCount}
        />
      </Modal>
    </main>
  );
}
