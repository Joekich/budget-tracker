import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonOrLinkProps = (ButtonProps | LinkProps) & {
  theme?: 'icon' | 'secondary' | 'primary';
};

const Link = dynamic(async () => import('next/link'));

export function Button({ children, className, theme = 'secondary', href, ...props }: ButtonOrLinkProps) {
  const classNames = clsx(styles.root, theme && styles[theme], className);

  if (href) {
    return (
      <Link href={href} className={classNames} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classNames} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}