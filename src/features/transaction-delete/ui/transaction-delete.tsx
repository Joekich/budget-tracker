'use client';

import { type Transaction } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/ui/button/ui/button';

import { deleteTransactionAction } from '../api/deleteTransaction.action';
import styles from './transaction-delete.module.scss';

type TransactionDeleteProps = {
  transaction: Transaction;
  onClose: () => void;
  onDelete: () => void;
};

export function TransactionDelete({ transaction, onClose, onDelete }: TransactionDeleteProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTransactionAction(transaction.id);
    onDelete();
    router.refresh();
  };

  return (
    <div className={styles.deleteWrapper}>
      <h2 className={styles.title}>Удалить транзакцию</h2>
      <p className={styles.text}>
        Вы уверены, что хотите удалить транзакцию {`"${transaction.title}"`} на сумму {transaction.amount} ₽?
      </p>
      <div className={styles.buttonWrapper}>
        <Button theme="secondary" className={styles.buttonDelete} onClick={handleDelete}>
          Удалить
        </Button>
        <Button theme="secondary" className={styles.buttonCancel} onClick={onClose}>
          Отмена
        </Button>
      </div>
    </div>
  );
}
