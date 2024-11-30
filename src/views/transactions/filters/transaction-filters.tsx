'use client';

import clsx from 'clsx';
import {
  TRANSACTION_EXPENSE_CATEGORIES,
  TRANSACTION_INCOME_CATEGORIES,
  type TransactionType,
} from 'entities/transaction';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'shared/ui/button';

import styles from './transaction-filters.module.scss';

export type FiltersState = {
  type: TransactionType | null;
  categories: string[];
  amountRange: { min: number | null; max: number | null };
  dateRange: { start: Date | null; end: Date | null };
};

const parseArrayFromString = (value: string | null): string[] => (value ? value.split(',') : []);

// const parseDate = (value: string | null) => new Date(`${value}T00:00:00Z`);

const parseDate = (value: string | null): Date | null => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseNumber = (value: string | null): number | null => {
  if (!value) return null;
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
};

export const parseFiltersFromUrl = (params: URLSearchParams): FiltersState => {
  const amountMin = params.get('amountMin');
  const amountMax = params.get('amountMax');
  const dateStart = params.get('dateStart');
  const dateEnd = params.get('dateEnd');

  return {
    type: (params.get('type') as TransactionType) || null,
    categories: parseArrayFromString(params.get('categories')),
    amountRange: {
      min: parseNumber(amountMin),
      max: parseNumber(amountMax),
    },
    dateRange: {
      start: parseDate(dateStart),
      end: parseDate(dateEnd),
    },
  };
};

type FiltersProps = {
  onClose: () => void;
};

export function TransactionFilters({ onClose }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FiltersState>(parseFiltersFromUrl(searchParams));

  const isIncomeSelected = filters.type === 'income';

  useEffect(() => {
    const parsedFilters = parseFiltersFromUrl(searchParams);
    setFilters(parsedFilters);
  }, [searchParams]);

  const handleApply = () => {
    const params = new URLSearchParams(window.location.search);

    const filterEntries = {
      type: filters.type,
      categories: filters.categories.length ? filters.categories.join(',') : null,
      amountMin: filters.amountRange.min?.toString() || null,
      amountMax: filters.amountRange.max?.toString() || null,
      dateStart: filters.dateRange.start?.toISOString().slice(0, 10) || null,
      dateEnd: filters.dateRange.end?.toISOString().slice(0, 10) || null,
    };

    Object.entries(filterEntries).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
    onClose();
  };

  const handleReset = () => {
    const params = new URLSearchParams(window.location.search);

    const filterKeys = {
      type: null,
      categories: null,
      amountMin: null,
      amountMax: null,
      dateStart: null,
      dateEnd: null,
    };

    Object.keys(filterKeys).forEach((key) => {
      params.delete(key);
    });

    router.push(`?${params.toString()}`);
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
              setFilters((prev) => ({ ...prev, type: e.target.value as TransactionType | null }));
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
              onChange={(e) => {
                const dateValue = e.target.value ? parseDate(e.target.value) : null;
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: dateValue },
                }));
              }}
            />
            <input
              className={clsx(styles.input)}
              type="date"
              value={filters.dateRange.end ? filters.dateRange.end.toISOString().slice(0, 10) : ''}
              onChange={(e) => {
                const dateValue = e.target.value ? parseDate(e.target.value) : null;
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: dateValue },
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
