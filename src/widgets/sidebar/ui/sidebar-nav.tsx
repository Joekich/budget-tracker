'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { FiBarChart2, FiList, FiLogOut, FiMenu, FiUser } from 'react-icons/fi';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';

import styles from './sidebar-nav.module.scss';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: getPath('dashboard'), icon: FiBarChart2, label: 'Статистика' },
    { href: getPath('transactions'), icon: FiList, label: 'Транзакции' },
    { href: getPath('settings'), icon: FiUser, label: 'Настройки' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const signOutHandler = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (isOpen) {
      signOut({ callbackUrl: '/' });
    }
  };

  return (
    <aside className={clsx(styles.sidebar, isOpen && styles.open)}>
      <Button aria-label="Menu" className={styles.navItem} onClick={toggleSidebar} onKeyDown={toggleSidebar}>
        <FiMenu size={32} />
      </Button>
      <nav className={styles.navGroup}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.navItem}
            aria-label={item.label}
            onClick={closeSidebar}
          >
            <item.icon size={32} />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
        <Button
          className={clsx(styles.navItem, styles.logout, isOpen && styles.clickable)}
          onClick={signOutHandler}
          // onKeyDown={signOutHandler}
        >
          <FiLogOut size={32} />
          {isOpen && 'Выйти'}
        </Button>
      </nav>
    </aside>
  );
}
