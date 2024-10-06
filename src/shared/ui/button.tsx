import { type ButtonHTMLAttributes } from 'react';

export const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props}>
    {children}
  </button>
);
