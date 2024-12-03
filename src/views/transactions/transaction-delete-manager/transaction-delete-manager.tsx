'use client';

import { type Transaction } from 'entities/transaction';
import { TransactionDelete } from 'features/transaction-delete';
import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

type TransactionDeleteManagerProps = {
  transaction: Transaction;
};

export function TransactionDeleteManager({ transaction }: TransactionDeleteManagerProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteComplete = () => {
    closeDeleteModal();
  };

  return (
    <>
      <Button theme="primary" onClick={openDeleteModal}>
        <FiDelete size={20} />
      </Button>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <TransactionDelete transaction={transaction} onClose={closeDeleteModal} onDelete={handleDeleteComplete} />
      </Modal>
    </>
  );
}
