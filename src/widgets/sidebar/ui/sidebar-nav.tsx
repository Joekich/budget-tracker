'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';
import { DashboardPageIcon } from 'shared/ui/icons/dashboard-page-icon';
import { LogoutIcon } from 'shared/ui/icons/logout-icon';
import { NavSidebarIcon } from 'shared/ui/icons/nav-sidebar-icon';
import { ProfilePageIcon } from 'shared/ui/icons/profile-page-icon';
import { TransactionsPageIcon } from 'shared/ui/icons/transactions-page-icon';

import styles from './sidebar-nav.module.scss';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: getPath('dashboard'), icon: <DashboardPageIcon />, label: 'Статистика' },
    { href: getPath('transactions'), icon: <TransactionsPageIcon />, label: 'Транзакции' },
    { href: getPath('settings'), icon: <ProfilePageIcon />, label: 'Настройки' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
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
        <NavSidebarIcon />
      </Button>
      <nav className={styles.navGroup}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navItem}>
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
        <Button
          className={clsx(styles.navItem, styles.logout, isOpen && styles.clickable)}
          onClick={signOutHandler}
          onKeyDown={signOutHandler}
        >
          <LogoutIcon />
          {isOpen && 'Выйти'}
        </Button>
      </nav>
    </aside>
  );
}
