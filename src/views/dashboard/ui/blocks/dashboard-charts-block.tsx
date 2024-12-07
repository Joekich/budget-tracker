'use client';

import { type Transaction } from '@prisma/client';
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './dashboard-blocks.module.scss';

type DashboardChartsBlockProps = {
  transactions: Transaction[];
  selectedMonth: string;
  title: string;
};

export const DashboardChartsBlock = React.memo(({ transactions, selectedMonth, title }: DashboardChartsBlockProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // ToDo: merge groupByMonths and groupByDays
  // groupBySelectedMonth(transaction, type)
  function groupByMonths(groupedTransactions: Transaction[]) {
    const formatter = new Intl.DateTimeFormat('ru', { month: 'long' });
    const months = Array.from({ length: 12 }, (_, i) => i);
    return months.map((month) => {
      const monthlyTransactions = groupedTransactions.filter(
        (transaction) => new Date(transaction.date).getMonth() === month,
      );
      // ToDo: duplicate filteredTransactions from dashboard-page
      const income = monthlyTransactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const expense = monthlyTransactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      return { label: formatter.format(new Date(2023, month)), income, expense };
    });
  }

  function groupByDays(groupedTransactions: Transaction[], month: string) {
    const formatter = new Intl.DateTimeFormat('ru', { day: '2-digit', month: '2-digit' });
    const daysInMonth = new Date(new Date().getFullYear(), parseInt(month, 10), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
      const dailyTransactions = groupedTransactions.filter(
        (transaction) =>
          new Date(transaction.date).getMonth() + 1 === parseInt(month, 10) &&
          new Date(transaction.date).getDate() === day,
      );
      // ToDo: duplicate filteredTransactions from dashboard-page
      const income = dailyTransactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const expense = dailyTransactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      return {
        label: formatter.format(new Date(new Date().getFullYear(), parseInt(month, 10) - 1, day)),
        income,
        expense,
      };
    });
  }

  const chartData = selectedMonth === 'all' ? groupByMonths(transactions) : groupByDays(transactions, selectedMonth);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      // ToDo: perf
      const labels = chartData.map((item) => item.label);
      const incomeData = chartData.map((item) => item.income);
      const expenseData = chartData.map((item) => item.expense);

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
  }, [chartData, title]);

  return <div ref={chartRef} className={styles.chartBlock} />;
});
