'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import { type Transaction } from '@prisma/client';
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './dashboard-blocks.module.scss';

type DashboardChartsBlockProps = {
  transactions: Transaction[];
  selectedMonth: string;
  title: string;
  isLoading: boolean;
};

export const DashboardChartsBlock = React.memo(
  ({ transactions, selectedMonth, title, isLoading }: DashboardChartsBlockProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

    const yearFormatter = new Intl.DateTimeFormat('ru', { month: 'long' });
    const monthFormatter = new Intl.DateTimeFormat('ru', { day: '2-digit', month: '2-digit' });

    function generateKeys(month: string, currentYear: number): string[] {
      if (month === 'all') {
        return Array.from({ length: 12 }, (_, i) => yearFormatter.format(new Date(currentYear, i)));
      }

      const daysInMonth = new Date(currentYear, parseInt(month, 10), 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) =>
        monthFormatter.format(new Date(currentYear, parseInt(month, 10) - 1, i + 1)),
      );
    }

    function groupTransactions(renamedTransactions: Transaction[], month: string) {
      const isYear = month === 'all';
      const currentYear = new Date().getFullYear();
      const keys = generateKeys(month, currentYear);

      const groups = new Map(keys.map((key) => [key, { income: 0, expense: 0 }]));

      renamedTransactions.forEach((transaction) => {
        const date = new Date(transaction.date);
        const key = isYear
          ? yearFormatter.format(new Date(date.getFullYear(), date.getMonth()))
          : monthFormatter.format(date);

        const group = groups.get(key);
        if (group) {
          if (transaction.type === 'income') {
            group.income += transaction.amount;
          } else if (transaction.type === 'expense') {
            group.expense += transaction.amount;
          }
        }
      });

      return keys.map((key) => ({ label: key, ...groups.get(key) }));
    }

    const chartData = groupTransactions(
      transactions.filter((transaction) =>
        selectedMonth === 'all' ? true : new Date(transaction.date).getMonth() + 1 === parseInt(selectedMonth, 10),
      ),
      selectedMonth,
    );

    useEffect(() => {
      if (!isLoading && chartRef.current) {
        const chart = echarts.init(chartRef.current);

        const labels: string[] = [];
        const incomeData: number[] = [];
        const expenseData: number[] = [];

        chartData.forEach(({ label, income = 0, expense = 0 }) => {
          labels.push(label);
          incomeData.push(income);
          expenseData.push(expense);
        });

        const option = {
          title: { text: title, left: 'center' },
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          xAxis: { type: 'category', data: labels },
          yAxis: { type: 'value' },
          series: [
            { name: 'Расходы', type: 'bar', data: expenseData, itemStyle: { color: 'red' } },
            { name: 'Доходы', type: 'bar', data: incomeData, itemStyle: { color: 'green' } },
          ],
          legend: { data: ['Расходы', 'Доходы'], top: 'bottom' },
        };

        chart.setOption(option);
        const handleResize = () => {
          chart.resize();
        };
        window.addEventListener('resize', handleResize);
        return () => {
          chart.dispose();
          window.removeEventListener('resize', handleResize);
        };
      }
      return undefined;
    }, [transactions, selectedMonth, title, isLoading, chartData]);

    return (
      <div className={styles.chartBlock}>
        {isLoading ? <Skeleton className={styles.maxContainer} /> : <div ref={chartRef} className={styles.chart} />}
      </div>
    );
  },
);
