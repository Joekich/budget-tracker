import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'shared/ui/button';

import styles from './transaction-filters.module.scss';

export type FiltersState = {
  type: 'income' | 'expense' | null;
  categories: string[];
  amountRange: { min: number | null; max: number | null };
  dateRange: { start: Date | null; end: Date | null };
};

type FiltersProps = {
  onClose: () => void;
  onFiltersChange: (activeFiltersCount: number) => void;
};

const FILTERS_STORAGE_KEY = 'transactionFilters';

export function Filters({ onClose, onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    type: null,
    categories: [],
    amountRange: { min: null, max: null },
    dateRange: { start: null, end: null },
  });

  const normalizeDateRange = (dateRange: { start: Date | null; end: Date | null }) => ({
    start: dateRange.start ? new Date(dateRange.start) : null,
    end: dateRange.end ? new Date(dateRange.end) : null,
  });

  useEffect(() => {
    const storedFilters = sessionStorage.getItem(FILTERS_STORAGE_KEY);
    if (storedFilters) {
      const parsedFilters: FiltersState = JSON.parse(storedFilters);
      setFilters({
        ...parsedFilters,
        dateRange: normalizeDateRange(parsedFilters.dateRange),
      });
    }
  }, []);

  const calculateActiveFilters = () => {
    let count = 0;

    if (filters.type) count += 1;
    if (filters.amountRange.min !== null || filters.amountRange.max !== null) count += 1;
    if (filters.dateRange.start !== null || filters.dateRange.end !== null) count += 1;

    return count;
  };

  const router = useRouter();

  const incomeCategories = ['Зарплата', 'Фриланс', 'Доход от инвестиций', 'Подарки'];
  const expenseCategories = [
    'Жилье и коммунальные услуги',
    'Еда',
    'Развлечения',
    'Штрафы и налоги',
    'Медицина',
    'Образование',
    'Одежда',
    'Электроника',
    'Транспорт и передвижение',
  ];

  const handleApply = () => {
    const params = new URLSearchParams(window.location.search);

    const filterEntries: [string, string | null][] = [
      ['type', filters.type],
      ['categories', filters.categories.length ? filters.categories.join(',') : null],
      ['amountMin', filters.amountRange.min?.toString() || null],
      ['amountMax', filters.amountRange.max?.toString() || null],
      ['dateStart', filters.dateRange.start?.toISOString().slice(0, 10) || null],
      ['dateEnd', filters.dateRange.end?.toISOString().slice(0, 10) || null],
      ['page', '1'],
    ];

    filterEntries.forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    sessionStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
    router.push(`?${params.toString()}`);

    const activeFiltersCount = calculateActiveFilters();
    onFiltersChange(activeFiltersCount);

    onClose();
  };

  const handleReset = () => {
    setFilters({
      type: null,
      categories: [],
      amountRange: { min: null, max: null },
      dateRange: { start: null, end: null },
    });

    sessionStorage.removeItem(FILTERS_STORAGE_KEY);

    const params = new URLSearchParams(window.location.search);
    ['type', 'categories', 'amountMin', 'amountMax', 'dateStart', 'dateEnd', 'page'].forEach((key) => {
      params.delete(key);
    });

    router.push(`?${params.toString()}`);
    onFiltersChange(0);
    onClose();
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category],
    }));
  };

  const isIncomeSelected = filters.type === 'income';

  return (
    <div>
      <h3 className={clsx(styles.h3)}>Фильтры</h3>
      <div className={clsx(styles.buttonWrapper)}>
        <Button theme="secondary" className={clsx(styles.button)} onClick={handleReset}>
          Сбросить фильтры
        </Button>
      </div>
      <div className={clsx(styles.wrapper)}>
        <label>
          Тип транзакции:
          <select
            className={clsx(styles.select)}
            value={filters.type || ''}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, type: e.target.value as 'income' | 'expense' | null }));
            }}
          >
            <option value="">Все</option>
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </label>
      </div>

      {filters.type && (
        <div className={clsx(styles.categoryBlock)}>
          <fieldset>
            <legend>{isIncomeSelected ? 'Доходы' : 'Расходы'}</legend>
            {(isIncomeSelected ? incomeCategories : expenseCategories).map((cat) => (
              <label key={cat} className={clsx(styles.checkboxLabel)}>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => {
                    toggleCategory(cat);
                  }}
                />
                {cat}
              </label>
            ))}
          </fieldset>
        </div>
      )}

      <div>
        <label className={clsx(styles.font)}>
          Сумма:
          <div className={clsx(styles.dateInputs)}>
            <input
              className={clsx(styles.input)}
              type="number"
              placeholder="От"
              value={filters.amountRange.min || ''}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  amountRange: { ...prev.amountRange, min: e.target.value ? parseFloat(e.target.value) : null },
                }));
              }}
            />
            <input
              className={clsx(styles.input)}
              type="number"
              placeholder="До"
              value={filters.amountRange.max || ''}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  amountRange: { ...prev.amountRange, max: e.target.value ? parseFloat(e.target.value) : null },
                }));
              }}
            />
          </div>
        </label>
        <label className={clsx(styles.font)}>
          Дата:
          <div className={clsx(styles.dateInputs)}>
            <input
              className={clsx(styles.input)}
              type="date"
              value={filters.dateRange.start ? filters.dateRange.start.toISOString().slice(0, 10) : ''}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value ? new Date(e.target.value) : null },
                }));
              }}
            />
            <input
              className={clsx(styles.input)}
              type="date"
              value={filters.dateRange.end ? filters.dateRange.end.toISOString().slice(0, 10) : ''}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value ? new Date(e.target.value) : null },
                }));
              }}
            />
          </div>
        </label>
      </div>

      <div className={clsx(styles.buttonWrapper)}>
        <Button theme="primary" className={clsx(styles.button)} onClick={handleApply}>
          Применить
        </Button>
        <Button theme="secondary" className={clsx(styles.button)} onClick={onClose}>
          Отмена
        </Button>
      </div>
    </div>
  );
}
