'use client';

import { type Transaction } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DashboardPage } from '../dashboard-page';

export function DashboardPageManager({
  transactions,
  years,
  initialYear,
  initialMonth,
}: {
  transactions: Transaction[];
  years: string[];
  initialYear: string;
  initialMonth: string;
}) {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<Transaction['type']>('income');

  const router = useRouter();

  const handleQueryChange = (year: string, month: string) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    const params = new URLSearchParams({ year, month });
    router.push(`?${params.toString()}`);
  };

  const openModal = (type: Transaction['type']) => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DashboardPage
      transactions={transactions}
      years={years}
      selectedYear={selectedYear}
      selectedMonth={selectedMonth}
      isModalOpen={isModalOpen}
      transactionType={transactionType}
      onQueryChange={handleQueryChange}
      onOpenModal={openModal}
      onCloseModal={closeModal}
    />
  );
}
