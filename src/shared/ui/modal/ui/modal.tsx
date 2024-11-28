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

export function Modal({ isOpen, children, onClose = undefined, forceMount = false }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [initial, setInitial] = useState(forceMount);

  const selectorRef = useRef<Element | null>(null);
  useEffect(() => {
    selectorRef.current = document.body;
  }, []);

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

  return (forceMount || (initial && isOpen)) && selectorRef.current
    ? createPortal(
        <div ref={modalRef} className={clsx(styles.modalBackdrop, isOpen && styles.open)}>
          <div className={styles.modalContent}>{children}</div>
        </div>,
        selectorRef.current,
      )
    : null;
}
