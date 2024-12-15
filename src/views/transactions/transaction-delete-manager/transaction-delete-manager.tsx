'use client';

import { type Transaction } from '@prisma/client';
import { TransactionDelete } from 'features/transaction-delete';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

import styles from './transaction-delete-manager.module.scss';

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
      <Button className={styles.deleteButton} theme="icon" onClick={openDeleteModal}>
        <FiTrash2 size={24} />
      </Button>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <TransactionDelete transaction={transaction} onClose={closeDeleteModal} onDelete={handleDeleteComplete} />
      </Modal>
    </>
  );
}
