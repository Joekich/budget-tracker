import clsx from 'clsx';

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
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Транзакции</h1>
        <TransactionsSearch />
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
    </main>
  );
}
