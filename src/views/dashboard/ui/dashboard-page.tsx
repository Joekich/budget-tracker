'use client';

import { type Transaction } from '@prisma/client';
import { TransactionAdd } from 'features/transaction-add';
import { useSession } from 'next-auth/react';
import { Modal } from 'shared/ui/modal';

import { DashboardBalanceBlock } from './blocks/dashboard-balance-block';
import { DashboardButtonsBlock } from './blocks/dashboard-buttons-block';
import { DashboardCategoriesBlock } from './blocks/dashboard-categories-block';
import { DashboardChartsBlock } from './blocks/dashboard-charts-block';
import styles from './dashboard-page.module.scss';

type DashboardPageProps = {
  transactions: Transaction[];
  years: string[];
  selectedYear: string;
  selectedMonth: string;
  isModalOpen: boolean;
  transactionType: Transaction['type'];
  onQueryChange: (year: string, month: string) => void;
  onOpenModal: (type: Transaction['type']) => void;
  onCloseModal: () => void;
  isLoading: boolean;
};

export function DashboardPage({
  transactions,
  years,
  selectedYear,
  selectedMonth,
  isModalOpen,
  transactionType,
  onQueryChange,
  onOpenModal,
  onCloseModal,
  isLoading,
}: DashboardPageProps) {
  const { data: session } = useSession();
  if (!session) return null;

  const username = session.user?.name || null;

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') income += transaction.amount;
    if (transaction.type === 'expense') expense += transaction.amount;
  });

  const balance = income - expense;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <DashboardButtonsBlock
          username={username}
          years={years}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onQueryChange={onQueryChange}
          onIncomeClick={() => {
            onOpenModal('income');
          }}
          onExpenseClick={() => {
            onOpenModal('expense');
          }}
        />
        <DashboardBalanceBlock income={income} expense={expense} balance={balance} isLoading={isLoading} />
        <DashboardChartsBlock
          transactions={transactions}
          selectedMonth={selectedMonth}
          title="Доходы и расходы за период"
          isLoading={isLoading}
        />
        <DashboardCategoriesBlock transactions={transactions} isLoading={isLoading} />

        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          <TransactionAdd type={transactionType} onClose={onCloseModal} />
        </Modal>
      </div>
    </main>
  );
}
