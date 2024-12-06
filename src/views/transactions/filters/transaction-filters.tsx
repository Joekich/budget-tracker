'use client';

import { type Transaction } from '@prisma/client';
import clsx from 'clsx';
import { TRANSACTION_EXPENSE_CATEGORIES, TRANSACTION_INCOME_CATEGORIES } from 'entities/transaction';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';

import styles from './transaction-filters.module.scss';

export type FiltersState = {
  type: Transaction['type'] | null;
  categories: string[];
  amountRange: { min: number | null; max: number | null };
  dateRange: { start: Date | null; end: Date | null };
};

export const parseFiltersFromUrl = (params: URLSearchParams): FiltersState => {
  const amountMin = params.get('amountMin');
  const amountMax = params.get('amountMax');
  const dateStart = params.get('dateStart');
  const dateEnd = params.get('dateEnd');

  return {
    type: (params.get('type') as Transaction['type']) || null,
    categories: params.get('categories')?.split(',') || [],
    amountRange: {
      min: amountMin ? parseFloat(amountMin) : null,
      max: amountMax ? parseFloat(amountMax) : null,
    },
    dateRange: {
      start: dateStart ? new Date(dateStart) : null,
      end: dateEnd ? new Date(dateEnd) : null,
    },
  };
};

type FiltersProps = {
  onClose: () => void;
};

export function TransactionFilters({ onClose }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FiltersState>({
    type: null,
    categories: [],
    amountRange: { min: null, max: null },
    dateRange: { start: null, end: new Date() },
  });

  const isIncomeSelected = filters.type === 'income';

  useEffect(() => {
    const parsedFilters = parseFiltersFromUrl(searchParams);
    setFilters({
      ...parsedFilters,
      dateRange: {
        start: parsedFilters.dateRange.start,
        end: parsedFilters.dateRange.end || new Date(),
      },
    });
  }, [searchParams]);

  const handleApply = () => {
    const params = new URLSearchParams();
    if (filters.type) params.set('type', filters.type);
    if (filters.categories.length) params.set('categories', filters.categories.join(','));
    if (filters.amountRange.min) params.set('amountMin', filters.amountRange.min.toString());
    if (filters.amountRange.max) params.set('amountMax', filters.amountRange.max.toString());
    if (filters.dateRange.start) params.set('dateStart', filters.dateRange.start.toISOString().slice(0, 10));
    if (filters.dateRange.end) params.set('dateEnd', filters.dateRange.end.toISOString().slice(0, 10));

    router.push(`?${params.toString()}`);
    onClose();
  };
  const handleReset = () => {
    router.push(getPath('transactions'));
    setFilters({
      type: null,
      categories: [],
      amountRange: { min: null, max: null },
      dateRange: { start: null, end: null },
    });
    onClose();
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const updatedCategories = new Set(prev.categories);
      if (updatedCategories.has(category)) {
        updatedCategories.delete(category);
      } else {
        updatedCategories.add(category);
      }
      return {
        ...prev,
        categories: Array.from(updatedCategories),
      };
    });
  };

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
              setFilters((prev) => ({ ...prev, type: e.target.value as Transaction['type'] | null }));
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
            {(isIncomeSelected ? TRANSACTION_INCOME_CATEGORIES : TRANSACTION_EXPENSE_CATEGORIES).map((cat) => (
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
              onClick={(e) => {
                (e.target as HTMLInputElement).showPicker?.();
              }}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange,
                    start: e.target.value ? new Date(e.target.value) : null,
                  },
                }));
              }}
            />
            <input
              className={clsx(styles.input)}
              type="date"
              value={filters.dateRange.end ? filters.dateRange.end.toISOString().slice(0, 10) : ''}
              onClick={(e) => {
                (e.target as HTMLInputElement).showPicker?.();
              }}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange,
                    end: e.target.value ? new Date(e.target.value) : null,
                  },
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
