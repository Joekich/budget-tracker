'use client';

import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { FiBarChart2, FiList, FiLogOut, FiMenu } from 'react-icons/fi';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button/ui/button';

import styles from './sidebar-nav.module.scss';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: getPath('dashboard'), icon: FiBarChart2, label: 'Статистика' },
    { href: getPath('transactions'), icon: FiList, label: 'Транзакции' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const signOutHandler = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside ref={sidebarRef} className={clsx(styles.sidebar, isOpen && styles.open)}>
      <Button aria-label="Menu" theme="icon" className={styles.navItem} onClick={toggleSidebar}>
        <FiMenu size={32} />
      </Button>
      <nav className={styles.navGroup}>
        {navItems.map((item) => (
          <Button
            key={item.href}
            theme="icon"
            href={item.href}
            className={styles.navItem}
            aria-label={item.label}
            onClick={closeSidebar}
          >
            <item.icon size={32} />
            <span>{item.label}</span>
          </Button>
        ))}
        <Button
          theme="icon"
          className={clsx(styles.navItem, styles.logout, isOpen && styles.clickable)}
          onClick={signOutHandler}
        >
          <FiLogOut size={32} />
          <span>Выйти</span>
        </Button>
      </nav>
    </aside>
  );
}
