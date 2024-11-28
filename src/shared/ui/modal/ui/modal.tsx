import clsx from 'clsx';
import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  isVisible: boolean;
};

export function Modal({ onClose, children, isVisible }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('mousedown', handleBackdropClick);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('mousedown', handleBackdropClick);
    };
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div ref={modalRef} className={clsx(styles.modalBackdrop)}>
      <div className={clsx(styles.modalContent)}>{children}</div>
    </div>,
    document.body,
  );
}
