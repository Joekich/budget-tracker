import { z } from 'zod';

export const schemaSignupValidation = z
  .object({
    login: z.string().min(1, 'Введите логин').min(4, 'Логин слишком короткий'),
    password: z
      .string()
      .min(1, 'Введите пароль')
      .min(8, 'Пароль должен быть минимум 8 символов')
      .refine((password) => /[A-Z]/.test(password), { message: 'Пароль должен содержать заглавную букву' })
      .refine((password) => /[0-9]/.test(password), { message: 'Пароль должен содержать цифру' }),
    confirmPassword: z.string().min(1, 'Введите пароль').min(8, 'Пароль должен быть минимум 8 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
