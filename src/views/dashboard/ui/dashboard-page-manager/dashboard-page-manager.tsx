'use client';

import { type Transaction } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { getTransactionsByDate } from '../../api/get-transactions-by-date.action';
import { DashboardPage } from '../dashboard-page';

export function DashboardPageManager({ transactions, years }: { transactions: Transaction[]; years: string[] }) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<Transaction['type']>('income');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  const getFilteredTransactions = async (year: string, month: string) => {
    if (!session?.user?.id) return;

    try {
      const updatedTransactions = await getTransactionsByDate(parseInt(session.user.id, 10), year, month);
      setFilteredTransactions(updatedTransactions);
    } catch (error) {
      console.error('Ошибка при получении транзакций:', error);
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    getFilteredTransactions(year, selectedMonth);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    getFilteredTransactions(selectedYear, month);
  };

  const openModal = (type: Transaction['type']) => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionUpdate = async () => {
    await getFilteredTransactions(selectedYear, selectedMonth);
  };

  return (
    <DashboardPage
      years={years}
      filteredTransactions={filteredTransactions}
      isModalOpen={isModalOpen}
      transactionType={transactionType}
      selectedYear={selectedYear}
      selectedMonth={selectedMonth}
      onOpenModal={openModal}
      onCloseModal={closeModal}
      onYearChange={handleYearChange}
      onMonthChange={handleMonthChange}
      onTransactionAdd={handleTransactionUpdate}
    />
  );
}
