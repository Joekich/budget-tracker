'use client';

import clsx from 'clsx';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  forceMount?: boolean;
};

export function Modal({ onClose, children, isOpen, forceMount }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [initial, setInitial] = useState(forceMount);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        onClose?.();
      }
    };

    window.addEventListener('mousedown', handleBackdropClick);
    return () => {
      window.removeEventListener('mousedown', handleBackdropClick);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen && !forceMount) setInitial(true);
  }, [forceMount, isOpen]);

  return (
    (forceMount || (initial && isOpen)) &&
    createPortal(
      <div ref={modalRef} className={clsx(styles.modalBackdrop, isOpen && styles.open)}>
        <div className={styles.modalContent}>{children}</div>
      </div>,
      document.body,
    )
  );
}
