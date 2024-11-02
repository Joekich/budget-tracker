import { z } from 'zod';

export const schemaSignupValidation = z
  .object({
    login: z.string().min(4, 'Login should be more than 4 characters'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password is required')
      .refine((password) => /[A-Z]/.test(password), { message: 'Password should contain at least one upper letter' })
      .refine((password) => /[0-9]/.test(password), { message: 'Password should contain at least one number' }),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password should be the same',
  });
