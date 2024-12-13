'use client';

import { type Transaction } from '@prisma/client';
import clsx from 'clsx';
import { useBreakpoint } from 'shared/lib/breakpoints';
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
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint.between('xs', 'md');
  return (
    <main className={styles.pageWrapper}>
      {isMobile ? <MobileSidebar /> : <Sidebar />}
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
                <div className={styles.transactionTitle} title={transaction.title}>
                  {transaction.title}
                </div>
                <div className={styles.transactionAmount}>{transaction.amount} ₽</div>
                <div className={styles.transactionCategory}>{transaction.category}</div>
                <div className={styles.transactionType}>{transaction.type === 'income' ? 'Доход' : 'Расход'}</div>
                <div className={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString()}</div>
                <div className={styles.editButton}>
                  <TransactionEditManager transaction={transaction} />
                  <TransactionDeleteManager transaction={transaction} />
                </div>
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
