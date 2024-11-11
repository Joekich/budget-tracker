import 'react-datepicker/dist/react-datepicker.css';

import clsx from 'clsx';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from 'shared/ui/button/ui/button';
import { z } from 'zod';

import styles from './transaction-add.module.scss';

type TransactionAddProps = {
  type: 'income' | 'expense';
  onClose: () => void;
};

const transactionSchema = z.object({
  title: z.string().min(1, 'Поле должно быть заполнено'),
  amount: z.string().min(1, 'Поле должно быть заполнено'),
  category: z.string().min(1, ''),
});

type TransactionFormFields = keyof z.infer<typeof transactionSchema>;
type ErrorsStateProps = Partial<Record<TransactionFormFields, string | undefined>>;

export function TransactionAdd({ type, onClose }: TransactionAddProps) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [errors, setErrors] = useState<ErrorsStateProps>({});

  const categories =
    type === 'income'
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
    const result = transactionSchema.safeParse({ title, amount, category });

    if (!result.success) {
      const { fieldErrors } = result.error.formErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        amount: fieldErrors.amount?.[0],
        category: fieldErrors.category?.[0],
      });
      return;
    }

    await fetch('/api/transaction', {
      method: 'POST',
      body: JSON.stringify({
        title,
        amount: parseFloat(amount),
        date: date?.toISOString(),
        category,
        type,
      }),
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

      <div className={styles.wrapper}>
        <DatePicker
          selected={date}
          className={styles.input}
          onChange={(d) => {
            setDate(d);
          }}
        />
      </div>

      <div className={styles.wrapper}>
        <Button className={styles.buttonAdd} onClick={handleSubmit}>
          Добавить
        </Button>
        <Button className={styles.buttonCancel} onClick={onClose}>
          Отмена
        </Button>
      </div>
    </>
  );
}
