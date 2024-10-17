import { type InputHTMLAttributes } from 'react';

export function Input({ type = 'text', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input type={type} {...props} />;
}
