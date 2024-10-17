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

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

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
        <Link href={getPath('dashboard')} className={styles.navItem}>
          <DashboardPageIcon />
          {isOpen && <span>Статистика</span>}
        </Link>
        <Link href={getPath('transactions')} className={styles.navItem}>
          <TransactionsPageIcon />
          {isOpen && <span>Транзакции</span>}
        </Link>

        <Link href={getPath('settings')} className={styles.navItem}>
          <ProfilePageIcon />
          {isOpen && <span>Настройки</span>}
        </Link>
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
};
