'use client';

import { type Transaction } from '@prisma/client';
import { TransactionAdd } from 'features/transaction-add';
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
  const [transactionType, setTransactionType] = useState<Transaction['type']>('income');

  const openModal = (type: Transaction['type']) => {
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

        <Modal
          forceMount
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <TransactionAdd
            type={transactionType}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        </Modal>
      </div>
    </main>
  );
}
