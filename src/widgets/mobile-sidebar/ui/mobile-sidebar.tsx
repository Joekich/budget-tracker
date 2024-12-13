'use client';

import { signOut } from 'next-auth/react';
import { useRef, useState } from 'react';
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

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartY = e.touches[0]?.clientY;
    sidebarRef.current?.setAttribute('data-touch-start', String(touchStartY));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchStartY = Number(sidebarRef.current?.getAttribute('data-touch-start'));
    const touchCurrentY = e.touches[0]?.clientY;

    if (touchCurrentY !== undefined && touchCurrentY - touchStartY > 50) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={styles.mobileSidebar}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
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
