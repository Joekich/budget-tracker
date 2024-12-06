import { z } from 'zod';

export const transactionSchema = z
  .object({
    id: z.number(),
    title: z.string().min(1, 'Поле должно быть заполнено'),
    amount: z.number().positive().or(z.string()),
    category: z.string().min(1, ''),
    date: z.string().min(1, 'Дата должна быть указана'),
    type: z.enum(['income', 'expense']),
  })
  .transform((obj) => {
    const amount = +obj.amount;

    if (Number.isNaN(amount)) {
      throw new Error('amount');
    }

    return {
      ...obj,
      amount,
    };
  });

export const transactionFormValidation = z.object({
  title: z.string().min(1, 'Поле должно быть заполнено'),
  amount: z.string().min(1, 'Поле должно быть заполнено'),
  category: z.string().min(1, 'Выберите категорию'),
  date: z.string().min(1, 'Дата должна быть указана'),
});
