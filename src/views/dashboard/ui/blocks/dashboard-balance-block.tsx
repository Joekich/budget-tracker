import styles from './dashboard-blocks.module.scss';

type DashboardBalanceBlockProps = {
  income: number;
  expense: number;
  balance: number;
};

export function DashboardBalanceBlock({ income, expense, balance }: DashboardBalanceBlockProps) {
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
