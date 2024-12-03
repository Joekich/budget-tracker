'use client';

import { type Transaction } from 'entities/transaction';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/ui/button/ui/button';

import styles from './transaction-delete.module.scss';

type TransactionDeleteProps = {
  transaction: Transaction;
  onClose: () => void;
  onDelete: () => void;
};

export function TransactionDelete({ transaction, onClose, onDelete }: TransactionDeleteProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch('/api/delete-transaction', {
      method: 'DELETE',
      body: JSON.stringify({ id: transaction.id }),
    });

    if (response.ok) {
      onDelete();
      router.refresh();
    } else {
      console.error('Ошибка при удалении транзакции');
    }
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
