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
  onOpenModal,
  onCloseModal,
  onYearChange,
  onMonthChange,
}: DashboardPageProps) {
  const { data: session } = useSession();
  if (!session) return null;

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
        <DashboardBalanceBlock transactions={filteredTransactions} />
        <DashboardChartsBlock />
        <DashboardCategoriesBlock />

        <Modal forceMount isOpen={isModalOpen} onClose={onCloseModal}>
          <TransactionAdd type={transactionType} onClose={onCloseModal} />
        </Modal>
      </div>
    </main>
  );
}
