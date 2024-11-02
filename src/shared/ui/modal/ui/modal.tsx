import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type ModalProps = {
  onClose: () => void;
  transactionType: 'income' | 'expense';
};

export const Modal = ({ onClose, transactionType }: ModalProps) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest(`.${styles.modal}`) === null) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        body: JSON.stringify({
          title,
          amount: parseFloat(amount) || 0,
          date: date ? date.toISOString() : null,
          category,
          type: transactionType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ошибка при отправке запроса:', errorData);
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      onClose();
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>{transactionType === 'income' ? 'Добавить доход' : 'Добавить расход'}</div>
        <div className={styles.modalContent}>
          <input
            type="text"
            value={title}
            placeholder="Название операции"
            className={styles.input}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="number"
            value={amount}
            placeholder="Количество"
            className={styles.input}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <select
            value={category}
            className={styles.select}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <DatePicker
            selected={date}
            className={styles.input}
            placeholderText="Выберите дату"
            onChange={(selectedDate) => {
              setDate(selectedDate);
            }}
          />
        </div>
        <div className={styles.modalButtons}>
          <button type="button" className={styles.buttonCancel} onClick={onClose}>
            Отмена
          </button>
          <button type="button" className={styles.buttonAdd} onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
