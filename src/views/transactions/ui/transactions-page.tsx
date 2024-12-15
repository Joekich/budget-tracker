'use client';

import { type Transaction } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { Button } from 'shared/ui/button';
import { MobileSidebar } from 'widgets/mobile-sidebar';
import { Sidebar } from 'widgets/sidebar';

import { FiltersManager } from '../filters-manager/filters-manager';
import { TransactionDeleteManager } from '../transaction-delete-manager/transaction-delete-manager';
import { TransactionEditManager } from '../transaction-edit-manager/transaction-edit-manager';
import { TransactionExportToExcel } from '../transaction-export-to-excel/transaction-export-to-excel';
import { TransactionsPagination } from './pagination/transactions-pagination';
import { TransactionsSearch } from './search/transactions-search';
import styles from './transactions-page.module.scss';

type TransactionsPageProps = {
  transactions: Transaction[];
  totalTransactions: number;
  transactionsPerPage: number;
};

export function TransactionsPage({ transactions, totalTransactions, transactionsPerPage }: TransactionsPageProps) {
  const [openTransactionId, setOpenTransactionId] = useState<Transaction['id'] | null>(null);

  const toggleAccordion = (transactionId: Transaction['id']) => {
    setOpenTransactionId((prev) => (prev === transactionId ? null : transactionId));
  };

  return (
    <main className={styles.pageWrapper}>
      <MobileSidebar />
      <Sidebar />
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Транзакции</h1>
        <div className={styles.actions}>
          <TransactionsSearch />
          <FiltersManager />
          <TransactionExportToExcel />
        </div>
        <ul className={styles.transactionList}>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li
                key={transaction.id}
                className={clsx(styles.transactionItem, transaction.type === 'income' ? styles.income : styles.expense)}
              >
                <Button
                  className={clsx(styles.resetButtonStyles, styles.transactionAccordion)}
                  onClick={() => {
                    toggleAccordion(transaction.id);
                  }}
                >
                  <span className={styles.transactionTitle}>{transaction.title}</span>
                  <span className={styles.transactionAmount}>{transaction.amount} ₽</span>
                </Button>
                <section
                  className={clsx(styles.transactionDetails, openTransactionId === transaction.id && styles.open)}
                >
                  <div className={styles.mobileDetailsRow}>
                    <p className={styles.detailsLabel}>Тип:</p>
                    <p className={styles.detailsValue}>{transaction.type === 'income' ? 'Доход' : 'Расход'}</p>
                  </div>
                  <div className={styles.mobileDetailsRow}>
                    <p className={styles.detailsLabel}>Категория:</p>
                    <p className={styles.detailsValue}>{transaction.category}</p>
                  </div>
                  <div className={styles.mobileDetailsRow}>
                    <p className={styles.detailsLabel}>Дата:</p>
                    <p className={styles.detailsValue}>{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <div className={styles.editButton}>
                    <TransactionEditManager transaction={transaction} />
                    <TransactionDeleteManager transaction={transaction} />
                  </div>
                </section>
              </li>
            ))
          ) : (
            <li>Нет транзакций для отображения</li>
          )}
        </ul>
        <TransactionsPagination totalTransactions={totalTransactions} transactionsPerPage={transactionsPerPage} />
      </div>
    </main>
  );
}
