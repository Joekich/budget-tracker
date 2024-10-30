'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Modal } from 'shared/ui/modal/modal';

import styles from './dashboard-page.module.scss';
import { DashboardBalanceBlock, DashboardButtonsBlock, DashboardCategoriesBlock, DashboardChartsBlock } from './index';

export function DashboardPage() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  const openModal = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  return (
    <main className={styles.pageWrapper}>
      {session ? (
        <div className={styles.contentWrapper}>
          <DashboardButtonsBlock
            username={session?.user?.name || null}
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
      ) : (
        <>
          <Link href="/">Home</Link>
          <h1>Вы не авторизованы</h1>
        </>
      )}
    </main>
  );
}