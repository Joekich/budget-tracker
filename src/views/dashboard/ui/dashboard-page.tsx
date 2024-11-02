'use client';

import { type Session } from 'next-auth';
import { useState } from 'react';
import { Modal } from 'shared/ui/modal';

import { DashboardBalanceBlock } from './blocks/dashboard-balance-block';
import { DashboardButtonsBlock } from './blocks/dashboard-buttons-block';
import { DashboardCategoriesBlock } from './blocks/dashboard-categories-block';
import { DashboardChartsBlock } from './blocks/dashboard-charts-block';
import styles from './dashboard-page.module.scss';

export function DashboardPage({ session }: { session: Session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  const openModal = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <DashboardButtonsBlock
          username={session.user?.name || null}
          onIncomeClick={() => {
            openModal('income');
          }}
          onExpenseClick={() => {
            openModal('expense');
          }}
        />
        <DashboardBalanceBlock />
        <DashboardChartsBlock />
        <DashboardCategoriesBlock />

        {isModalOpen && (
          <Modal
            transactionType={transactionType}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </main>
  );
}
