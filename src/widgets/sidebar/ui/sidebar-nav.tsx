'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { DashboardPageIcon } from 'shared/assets/icons/dashboard-page-icon';
import { LogoutIcon } from 'shared/assets/icons/logout-icon';
import { NavSidebarIcon } from 'shared/assets/icons/nav-sidebar-icon';
import { ProfilePageIcon } from 'shared/assets/icons/profile-page-icon';
import { TransactionsPageIcon } from 'shared/assets/icons/transactions-page-icon';

import styles from './sidebar-nav.module.scss';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.toggleButton} role="presentation" onClick={toggleSidebar} onKeyDown={toggleSidebar}>
        <NavSidebarIcon />
      </div>
      <nav className={styles.navGroup}>
        <div className={clsx(styles.navItem, isOpen && styles.clickable)}>
          <Link
            href="/profile/dashboard"
            className={clsx(styles.link, !isOpen && styles.disabledLink)}
            onClick={(e) => !isOpen && e.preventDefault()}
          >
            <DashboardPageIcon />
            {isOpen && <span>Статистика</span>}
          </Link>
        </div>
        <div className={clsx(styles.navItem, isOpen && styles.clickable)}>
          <Link
            href="/profile/transactions"
            className={clsx(styles.link, !isOpen && styles.disabledLink)}
            onClick={(e) => !isOpen && e.preventDefault()}
          >
            <TransactionsPageIcon />
            {isOpen && <span>Транзакции</span>}
          </Link>
        </div>
        <div className={clsx(styles.navItem, isOpen && styles.clickable)}>
          <Link
            href="/profile/settings"
            className={clsx(styles.link, !isOpen && styles.disabledLink)}
            onClick={(e) => !isOpen && e.preventDefault()}
          >
            <ProfilePageIcon />
            {isOpen && <span>Настройки</span>}
          </Link>
        </div>
      </nav>
      <nav className={styles.navGroup}>
        <div
          role="presentation"
          className={clsx(styles.logout, isOpen && styles.clickable)}
          onClick={(e) => {
            if (!isOpen) {
              e.preventDefault();
            } else {
              signOut({ callbackUrl: '/' });
            }
          }}
          onKeyDown={(e) => {
            if (!isOpen) {
              e.preventDefault();
            } else {
              signOut({ callbackUrl: '/' });
            }
          }}
        >
          <LogoutIcon />
          {isOpen && <span>Выйти</span>}
        </div>
      </nav>
    </aside>
  );
};
