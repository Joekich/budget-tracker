import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    dialog.showModal();

    const handleMouseDown = (event: MouseEvent) => {
      if (event.target === dialog) onClose();
    };

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener('mousedown', handleMouseDown);
    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('mousedown', handleMouseDown);
      dialog.removeEventListener('cancel', handleCancel);
      dialog.close();
    };
  }, [onClose]);

  return createPortal(
    <dialog ref={dialogRef} className={styles.dialogContainer}>
      <div className={styles.sharedModal}>{children}</div>
    </dialog>,
    document.body,
  );
};
