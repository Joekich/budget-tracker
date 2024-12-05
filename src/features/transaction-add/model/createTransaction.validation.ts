import { z } from 'zod';

export const createTransactionClientValidation = z.object({
  title: z.string().min(1, 'Поле должно быть заполнено'),
  amount: z.string().min(1, 'Поле должно быть заполнено'),
  category: z.string().min(1, ''),
  date: z.string().min(1, 'Дата должна быть указана'),
});

export const createTransactionValidation = createTransactionClientValidation
  .extend({
    type: z.enum(['income', 'expense']),
  })
  .transform((obj) => {
    const amount = parseFloat(obj.amount);

    if (Number.isNaN(amount)) {
      throw new Error('amount');
    }

    return {
      ...obj,
      amount,
    };
  });
