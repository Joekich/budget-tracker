'use client';

import clsx from 'clsx';
import {
  TRANSACTION_EXPENSE_CATEGORIES,
  TRANSACTION_INCOME_CATEGORIES,
  type TransactionType,
} from 'entities/transaction';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'shared/ui/button/ui/button';
import { z } from 'zod';

import { EditTransactionAction } from '../api/editTransaction.action';
import styles from './transaction-edit.module.scss';

type TransactionEditProps = {
  transaction: {
    id: number;
    title: string;
    amount: number;
    date: Date;
    category: string;
    type: TransactionType;
  };
  onClose: () => void;
  onSave: () => void;
};

const transactionSchema = z.object({
  title: z.string().min(1, 'Поле должно быть заполнено'),
  amount: z.string().min(1, 'Поле должно быть заполнено'),
  category: z.string().min(1, 'Выберите категорию'),
  date: z.string().min(1, 'Дата должна быть указана'),
});

type TransactionFormFields = keyof z.infer<typeof transactionSchema>;
type ErrorsStateProps = Partial<Record<TransactionFormFields, string | undefined>>;

export function TransactionEdit({ transaction, onClose, onSave }: TransactionEditProps) {
  const router = useRouter();
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date.toISOString().split('T')[0] || '');
  const [errors, setErrors] = useState<ErrorsStateProps>({});

  const categories = transaction.type === 'income' ? TRANSACTION_INCOME_CATEGORIES : TRANSACTION_EXPENSE_CATEGORIES;

  const handleSubmit = async () => {
    const result = transactionSchema.safeParse({ title, amount, category, date });

    if (!result.success) {
      const { fieldErrors } = result.error.formErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        amount: fieldErrors.amount?.[0],
        category: fieldErrors.category?.[0],
        date: fieldErrors.date?.[0],
      });
      return;
    }

    await EditTransactionAction({
      id: transaction.id,
      title,
      amount: parseFloat(amount),
      date,
      category,
      type: transaction.type,
    });
    onSave();
    router.refresh();
  };

  const handleChange = (field: TransactionFormFields) => () => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <>
      <h2>Редактировать транзакцию</h2>

      <div className={clsx(styles.wrapper, errors.title && styles.errorBorder)}>
        <input
          type="text"
          placeholder={errors.title || 'Название операции'}
          value={title}
          className={styles.input}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onFocus={handleChange('title')}
        />
      </div>

      <div className={clsx(styles.wrapper, errors.amount && styles.errorBorder)}>
        <input
          type="number"
          placeholder={errors.amount || 'Количество'}
          value={amount}
          className={styles.input}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          onFocus={handleChange('amount')}
        />
      </div>

      <select
        value={category}
        className={clsx(styles.select, errors.category && styles.errorBorder)}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        onFocus={handleChange('category')}
      >
        <option value="">Выберите категорию</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className={clsx(styles.wrapper, errors.date && styles.errorBorder)}>
        <input
          type="date"
          value={date}
          className={styles.input}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          onFocus={handleChange('date')}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button theme="primary" className={styles.buttonSave} onClick={handleSubmit}>
          Сохранить
        </Button>
        <Button theme="secondary" className={styles.buttonCancel} onClick={onClose}>
          Отмена
        </Button>
      </div>
    </>
  );
}
