export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  date: Date;
  category: string;
  type: TransactionType;
};
