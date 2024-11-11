import 'react-datepicker/dist/react-datepicker.css';

import clsx from 'clsx';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from 'shared/ui/button';
import { z } from 'zod';

import styles from './transactions-add.module.scss';

type TransactionsAddProps = {
  transactionType: 'income' | 'expense';
  onClose: () => void;
};

const transactionAddValidationSchema = z.object({
  title: z.string().min(1, 'Поле должно быть заполнено'),
  amount: z.string().min(1, 'Поле должно быть заполнено'),
  category: z.string().min(1, ''),
});

export function TransactionsAdd({ transactionType, onClose }: TransactionsAddProps) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories =
    transactionType === 'income'
      ? ['Зарплата', 'Фриланс', 'Доход от инвестиций']
      : [
          'Жилье и коммунальные услуги',
          'Еда',
          'Развлечения',
          'Штрафы и налоги',
          'Медицина',
          'Образование',
          'Сбережения',
        ];

  const handleSubmit = async () => {
    const result = transactionAddValidationSchema.safeParse({ title, amount, category });

    if (!result.success) {
      const { fieldErrors } = result.error.formErrors;
      setErrors({
        title: fieldErrors.title?.[0] || '',
        amount: fieldErrors.amount?.[0] || '',
        category: fieldErrors.category?.[0] || '',
      });
      return;
    }
    setErrors({});

    await fetch('/api/transaction', {
      method: 'POST',
      body: JSON.stringify({
        title,
        amount: parseFloat(amount) || 0,
        date: date ? date.toISOString() : null,
        category,
        type: transactionType,
      }),
    });
    onClose();
  };

  return (
    <>
      <h2>{transactionType === 'income' ? 'Добавить доход' : 'Добавить расход'}</h2>

      <div className={clsx(styles.transactionsInputWrapper, errors.title && styles.errorBorder)}>
        <input
          type="text"
          placeholder={errors.title || 'Название операции'}
          value={title}
          className={styles.transactionsModalInput}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, title: '' }));
          }}
        />
      </div>

      <div className={clsx(styles.transactionsInputWrapper, errors.amount && styles.errorBorder)}>
        <input
          type="number"
          placeholder={errors.amount || 'Количество'}
          value={amount}
          className={styles.transactionsModalInput}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, amount: '' }));
          }}
        />
      </div>

      <select
        value={category}
        className={clsx(styles.transactionsSelect, errors.category && styles.errorBorder)}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, category: '' }));
        }}
      >
        <option value="">Выберите категорию</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className={styles.transactionsInputWrapper}>
        <DatePicker
          selected={date}
          className={styles.transactionsModalInput}
          onChange={(d) => {
            setDate(d);
          }}
        />
      </div>

      <div className={styles.transactionsButtonWrapper}>
        <Button className={styles.transactionsButtonAdd} onClick={handleSubmit}>
          Добавить
        </Button>
        <Button className={styles.transactionsButtonCancel} onClick={onClose}>
          Отмена
        </Button>
      </div>
    </>
  );
}
