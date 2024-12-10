'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import { type Transaction } from '@prisma/client';
import * as echarts from 'echarts';
import { useEffect, useMemo, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './dashboard-blocks.module.scss';

type DashboardCategoriesBlockProps = {
  transactions: Transaction[];
  isLoading: boolean;
};

type ChartData = {
  labels: string[];
  data: { value: number; percentage: string }[];
  total: number;
};

type FormatterParams = echarts.DefaultLabelFormatterCallbackParams & {
  data: {
    value: number;
    originalValue: number;
    percentage: string;
  };
};

export function DashboardCategoriesBlock({ transactions, isLoading }: DashboardCategoriesBlockProps) {
  const incomeChartRef = useRef<HTMLDivElement>(null);
  const expenseChartRef = useRef<HTMLDivElement>(null);
  const chartInstances = useRef<echarts.EChartsType[]>([]);

  const chartData = useMemo(() => {
    const _transactions: { income: Transaction[]; expense: Transaction[] } = {
      income: [],
      expense: [],
    };

    transactions.forEach((transaction) => {
      _transactions[transaction.type].push(transaction);
    });

    const groupCategories = (groupTransactions: Transaction[]): ChartData => {
      const categoryGroups = groupTransactions.reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

      const totalAmount = Object.values(categoryGroups).reduce((sum, value) => sum + value, 0);
      const sortedCategories = Object.entries(categoryGroups).sort(([, a], [, b]) => b - a);

      return {
        labels: sortedCategories.map(([category]) => category),
        data: sortedCategories.map(([, amount]) => ({
          value: amount,
          percentage: ((amount / totalAmount) * 100).toFixed(2),
        })),
        total: totalAmount,
      };
    };

    return {
      income: groupCategories(_transactions.income),
      expense: groupCategories(_transactions.expense),
    };
  }, [transactions]);

  const setupCharts = (refs: (HTMLDivElement | null)[], data: { income: ChartData; expense: ChartData }) => {
    const titles = ['Категории Доходов', 'Категории Расходов'];
    const colors = ['#4caf50', '#f44336'];
    chartInstances.current = chartInstances.current.slice(0, refs.length);

    refs.forEach((ref, index) => {
      if (ref && data[index === 0 ? 'income' : 'expense']) {
        const instance = echarts.init(ref);
        const newData = data[index === 0 ? 'income' : 'expense'];

        instance.setOption({
          title: { text: titles[index], left: 'center', top: 10 },
          tooltip: {
            trigger: 'axis',
            formatter: (params: FormatterParams[]) => {
              const item = params[0];
              return `${item?.name}: ${item?.data.originalValue.toLocaleString()}₽ (${item?.data.percentage}%)`;
            },
          },
          xAxis: {
            type: 'category',
            data: newData.labels,
            axisLabel: {
              rotate: 45,
              interval: 0,
              formatter: (value: string) => (value.length > 10 ? `${value.slice(0, 10)}...` : value),
            },
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.1],
            max: 100,
            axisLabel: {
              formatter: '{value}%',
            },
          },
          series: [
            {
              type: 'bar',
              data: newData.data.map((item) => ({
                value: parseFloat(item.percentage),
                originalValue: item.value,
                percentage: item.percentage,
              })),
              barWidth: '40%',
              itemStyle: { color: colors[index] },
              label: {
                show: true,
                position: 'top',
                formatter: (params: FormatterParams) => `${params.data.percentage}%`,
              },
            },
          ],
        });

        chartInstances.current[index] = instance;
      }
    });
  };

  const handleResize = () => {
    chartInstances.current.forEach((instance) => {
      instance.resize();
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setupCharts([incomeChartRef.current, expenseChartRef.current], chartData);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstances.current.forEach((instance) => {
        instance.dispose();
      });
      chartInstances.current = [];
    };
  }, [isLoading, chartData]);

  return (
    <div className={styles.categoriesBlock}>
      {[incomeChartRef, expenseChartRef].map((ref, index) => {
        const type = index === 0 ? 'income' : 'expense';
        return (
          <div key={`chart-${type}`} className={styles.categoryPart}>
            {isLoading ? (
              <Skeleton className={styles.maxContainer} />
            ) : (
              <div ref={ref} className={styles.doubleChart} />
            )}
          </div>
        );
      })}
    </div>
  );
}
