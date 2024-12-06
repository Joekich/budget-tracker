'use client';

import { type Transaction } from '@prisma/client';
import { TransactionEdit } from 'features/transaction-edit';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

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
      <Button theme="primary" onClick={openEditModal}>
        <FiEdit size={20} />
      </Button>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <TransactionEdit transaction={transaction} onClose={closeEditModal} onSave={closeEditModal} />
      </Modal>
    </>
  );
}
