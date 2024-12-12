'use client';

import { type Transaction } from '@prisma/client';
import { TransactionEdit } from 'features/transaction-edit';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

import styles from './transaction-edit-manager.module.scss';

export function TransactionEditManager({ transaction }: { transaction: Transaction }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Button className={styles.editButton} theme="icon" onClick={openEditModal}>
        <FiEdit size={24} />
      </Button>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <TransactionEdit transaction={transaction} onClose={closeEditModal} onSave={closeEditModal} />
      </Modal>
    </>
  );
}
