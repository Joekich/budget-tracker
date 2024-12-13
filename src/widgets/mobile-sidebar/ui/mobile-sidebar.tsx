'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { FiBarChart2, FiList, FiLogOut, FiMenu } from 'react-icons/fi';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button/ui/button';

import styles from './mobile-sidebar.module.scss';

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: getPath('dashboard'), icon: FiBarChart2, label: 'Статистика' },
    { href: getPath('transactions'), icon: FiList, label: 'Транзакции' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const signOutHandler = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  const handleClickOutside = (event: PointerEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
    } else {
      document.removeEventListener('pointerdown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={sidebarRef} className={styles.mobileSidebar}>
      <Button aria-label="Menu" theme="icon" className={styles.menuButton} onClick={toggleSidebar}>
        <FiMenu size={32} />
      </Button>
      <div className={`${styles.navGroup} ${isOpen ? styles.open : ''}`} aria-hidden={!isOpen}>
        {navItems.map((item) => (
          <div key={item.label} className={styles.navItemContainer}>
            <Button theme="icon" href={isOpen ? item.href : undefined} className={styles.navItem}>
              <item.icon size={24} />
              <span>{item.label}</span>
            </Button>
          </div>
        ))}
        <div className={styles.navItemContainer}>
          <Button theme="icon" className={styles.logoutButton} disabled={!isOpen} onClick={signOutHandler}>
            <FiLogOut size={24} />
            <span>Выйти</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
