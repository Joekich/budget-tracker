import { Button } from 'shared/ui/button/ui/button';

import styles from './dashboard-blocks.module.scss';

type DashboardButtonsBlockProps = {
  username: string | null;
  onIncomeClick: () => void;
  onExpenseClick: () => void;
};

export function DashboardButtonsBlock({ username, onExpenseClick, onIncomeClick }: DashboardButtonsBlockProps) {
  return (
    <div className={styles.block}>
      <div className={styles.greeting}>
        <h1>Здравствуйте, {username || 'Пользователь'}</h1>
      </div>
      <div className={styles.middleBlock}>filter</div>
      <div className={styles.buttons}>
        <Button theme="primary" className={styles.incomeButton} onClick={onIncomeClick}>
          Поступление
        </Button>
        <Button theme="primary" className={styles.expenseButton} onClick={onExpenseClick}>
          Расход
        </Button>
      </div>
    </div>
  );
}
