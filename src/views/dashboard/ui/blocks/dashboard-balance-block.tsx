import { type Transaction } from '@prisma/client';

import styles from './dashboard-blocks.module.scss';

type DashboardBalanceBlockProps = {
  transactions: Transaction[];
};

export function DashboardBalanceBlock({ transactions }: DashboardBalanceBlockProps) {
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className={styles.block}>
      <div className={styles.balancePart}>
        <h2>Доходы</h2>
        <p>{income.toLocaleString()} ₽</p>
      </div>
      <div className={styles.balancePart}>
        <h2>Расходы</h2>
        <p>{expense.toLocaleString()} ₽</p>
      </div>
      <div className={styles.balancePart}>
        <h2>Остаток от дохода</h2>
        <p>{balance.toLocaleString()} ₽</p>
      </div>
    </div>
  );
}
