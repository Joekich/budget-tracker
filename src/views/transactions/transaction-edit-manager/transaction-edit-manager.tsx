'use client';

import { type TransactionType } from 'entities/transaction';
import { TransactionEdit } from 'features/transaction-edit';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

type Transaction = {
  id: number;
  title: string;
  amount: number;
  date: Date;
  category: string;
  type: TransactionType;
};

type TransactionEditManagerProps = {
  transaction: Transaction;
};

export function TransactionEditManager({ transaction }: TransactionEditManagerProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Button theme="primary" onClick={openEditModal}>
        <FiEdit size={20} />
      </Button>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <TransactionEdit transaction={transaction} onClose={closeEditModal} onSave={closeEditModal} />
      </Modal>
    </>
  );
}
