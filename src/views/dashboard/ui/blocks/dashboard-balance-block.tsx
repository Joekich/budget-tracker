import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

import styles from './dashboard-blocks.module.scss';

type DashboardBalanceBlockProps = {
  income: number;
  expense: number;
  balance: number;
  isLoading: boolean;
};

export function DashboardBalanceBlock({ income, expense, balance, isLoading }: DashboardBalanceBlockProps) {
  return (
    <div className={styles.block}>
      <div className={styles.balancePart}>
        <h2>Доходы</h2>
        <p>
          {isLoading ? (
            <Skeleton
              height="100%"
              width="100%"
              containerClassName={styles.maxContainer}
              style={{ lineHeight: '1.15' }}
              borderRadius={5}
            />
          ) : (
            `${income.toLocaleString()} ₽`
          )}
        </p>
      </div>
      <div className={styles.balancePart}>
        <h2>Расходы</h2>
        <p>
          {isLoading ? (
            <Skeleton
              height="100%"
              width="100%"
              containerClassName={styles.maxContainer}
              style={{ lineHeight: '1.15' }}
              borderRadius={5}
            />
          ) : (
            `${expense.toLocaleString()} ₽`
          )}
        </p>
      </div>
      <div className={styles.balancePart}>
        <h2>Остаток от дохода</h2>
        <p>
          {isLoading ? (
            <Skeleton
              height="100%"
              width="100%"
              containerClassName={styles.maxContainer}
              style={{ lineHeight: '1.15' }}
              borderRadius={5}
            />
          ) : (
            `${balance.toLocaleString()} ₽`
          )}
        </p>
      </div>
    </div>
  );
}
