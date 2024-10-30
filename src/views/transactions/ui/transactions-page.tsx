'use client';

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
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <h1>Транзакции</h1>
        <ul className={styles.transactionList}>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li key={transaction.id} className={styles.transactionItem}>
                <span>{transaction.title}</span>
                <span>{transaction.amount} ₽</span>
                <span>{transaction.category}</span>
                <span>{transaction.type === 'income' ? 'Доход' : 'Расход'}</span>
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
              </li>
            ))
          ) : (
            <li>Нет транзакций для отображения</li>
          )}
        </ul>
      </div>
    </main>
  );
}
