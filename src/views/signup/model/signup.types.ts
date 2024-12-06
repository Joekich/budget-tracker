import { z } from 'zod';

export const schemaSignupValidation = z
  .object({
    login: z
      .string({ required_error: 'Введите логин' })
      .min(4, 'Логин не соответствует требованиям')
      .refine((login) => login.length > 0, { message: 'Введите логин' }),
    password: z
      .string({ required_error: 'Введите пароль' })
      .min(8, 'Пароль должен быть минимум 8 символов')
      .refine((password) => /[A-Z]/.test(password), { message: 'Пароль должен содержать заглавную букву' })
      .refine((password) => /[0-9]/.test(password), { message: 'Пароль должен содержать цифру' }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (!password && !confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Введите пароль',
      });
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Подтвердите пароль',
      });
      return;
    }

    if (!password && confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Введите пароль',
      });
      return;
    }

    if (password && !confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Подтвердите пароль',
      });
      return;
    }

    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Пароли не совпадают',
      });
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Пароли не совпадают',
      });
      return;
    }

    const isPasswordInvalid = password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password);

    if (isPasswordInvalid) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Пароль не соответствует требованиям',
      });
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Пароль не соответствует требованиям',
      });
    }
  });
