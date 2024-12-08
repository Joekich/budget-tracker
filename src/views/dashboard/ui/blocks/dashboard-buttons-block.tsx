'use client';

import { Button } from 'shared/ui/button/ui/button';

import styles from './dashboard-blocks.module.scss';

type DashboardButtonsBlockProps = {
  username: string | null;
  years: string[];
  selectedYear: string;
  selectedMonth: string;
  onIncomeClick: () => void;
  onExpenseClick: () => void;
  onQueryChange: (year: string, month: string) => void;
};

export function DashboardButtonsBlock({
  username,
  years,
  selectedYear,
  selectedMonth,
  onExpenseClick,
  onIncomeClick,
  onQueryChange,
}: DashboardButtonsBlockProps) {
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onQueryChange(e.target.value, selectedMonth);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onQueryChange(selectedYear, e.target.value);
  };

  const months = [
    { name: 'Январь', value: '1' },
    { name: 'Февраль', value: '2' },
    { name: 'Март', value: '3' },
    { name: 'Апрель', value: '4' },
    { name: 'Май', value: '5' },
    { name: 'Июнь', value: '6' },
    { name: 'Июль', value: '7' },
    { name: 'Август', value: '8' },
    { name: 'Сентябрь', value: '9' },
    { name: 'Октябрь', value: '10' },
    { name: 'Ноябрь', value: '11' },
    { name: 'Декабрь', value: '12' },
  ];

  return (
    <div className={styles.block}>
      <div className={styles.greeting}>
        <h1>Здравствуйте, {username || 'Пользователь'}</h1>
      </div>
      <div className={styles.middleBlock}>
        <select className={styles.select} value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select className={styles.select} value={selectedMonth} onChange={handleMonthChange}>
          <option value="all">Все месяцы</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
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
