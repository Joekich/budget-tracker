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
  years: string[];
  filteredTransactions: Transaction[];
  isModalOpen: boolean;
  transactionType: Transaction['type'];
  selectedYear: string;
  selectedMonth: string;
  onOpenModal: (type: Transaction['type']) => void;
  onCloseModal: () => void;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
};

export function DashboardPage({
  years,
  filteredTransactions,
  isModalOpen,
  transactionType,
  selectedMonth,
  onOpenModal,
  onCloseModal,
  onYearChange,
  onMonthChange,
}: DashboardPageProps) {
  const { data: session } = useSession();
  if (!session) return null;

  let income = 0;
  let expense = 0;

  filteredTransactions.forEach((transaction) => {
    if (transaction.type === 'income') income += transaction.amount;
    if (transaction.type === 'expense') expense += transaction.amount;
  });

  const balance = income - expense;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <DashboardButtonsBlock
          username={session.user?.name || null}
          years={years}
          onIncomeClick={() => {
            onOpenModal('income');
          }}
          onExpenseClick={() => {
            onOpenModal('expense');
          }}
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
        />
        <DashboardBalanceBlock income={income} expense={expense} balance={balance} />
        <DashboardChartsBlock
          transactions={filteredTransactions}
          selectedMonth={selectedMonth}
          title="Доходы и расходы за период"
        />
        <DashboardCategoriesBlock />

        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          <TransactionAdd type={transactionType} onClose={onCloseModal} />
        </Modal>
      </div>
    </main>
  );
}
