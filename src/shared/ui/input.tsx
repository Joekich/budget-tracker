import { type InputHTMLAttributes } from 'react';

export const Input = ({ type = 'text', ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input type={type} {...props} />
);
