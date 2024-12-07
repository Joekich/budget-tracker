'use client';

import { type Transaction } from '@prisma/client';
import { useState } from 'react';
import { Button } from 'shared/ui/button/ui/button';

import styles from './dashboard-blocks.module.scss';

type DashboardButtonsBlockProps = {
  username: string | null;
  years: string[];
  transactions: Transaction[];
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onIncomeClick: () => void;
  onExpenseClick: () => void;
};

export function DashboardButtonsBlock({
  username,
  years,
  onYearChange,
  onMonthChange,
  onExpenseClick,
  onIncomeClick,
}: DashboardButtonsBlockProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return (
    <div className={styles.block}>
      <div className={styles.greeting}>
        <h1>Здравствуйте, {username || 'Пользователь'}</h1>
      </div>
      <div className={styles.middleBlock}>
        <select
          className={styles.select}
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            onYearChange(e.target.value);
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            onMonthChange(e.target.value);
          }}
        >
          <option value="all">Все месяцы</option>
          {months.map((month, index) => (
            <option key={month} value={(index + 1).toString()}>
              {month}
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
