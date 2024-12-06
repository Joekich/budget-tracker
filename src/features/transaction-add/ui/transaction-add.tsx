'use client';

import clsx from 'clsx';
import {
  TRANSACTION_EXPENSE_CATEGORIES,
  TRANSACTION_INCOME_CATEGORIES,
  type TransactionType,
} from 'entities/transaction';
import { useState } from 'react';
import { Button } from 'shared/ui/button/ui/button';
import { type z } from 'zod';

import { createTransactionAction } from '../api/createTransaction.action';
import { createTransactionClientValidation } from '../model/createTransaction.validation';
import styles from './transaction-add.module.scss';

type TransactionAddProps = {
  type: TransactionType;
  onClose: () => void;
};

type TransactionFormFields = keyof z.infer<typeof createTransactionClientValidation>;
type ErrorsStateProps = Partial<Record<TransactionFormFields, string | undefined>>;

export function TransactionAdd({ type, onClose }: TransactionAddProps) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState<ErrorsStateProps>({});

  const categories = type === 'income' ? TRANSACTION_INCOME_CATEGORIES : TRANSACTION_EXPENSE_CATEGORIES;

  const handleSubmit = async () => {
    const result = createTransactionClientValidation.safeParse({ title, amount, category, date });

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

    await createTransactionAction({
      title,
      amount,
      date,
      category,
      type,
    });

    onClose();
  };

  const handleChange = (field: TransactionFormFields) => () => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <>
      <h2>{type === 'income' ? 'Добавить доход' : 'Добавить расход'}</h2>

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
        <Button theme="primary" className={styles.buttonAdd} onClick={handleSubmit}>
          Добавить
        </Button>
        <Button theme="secondary" className={styles.buttonCancel} onClick={onClose}>
          Отмена
        </Button>
      </div>
    </>
  );
}
