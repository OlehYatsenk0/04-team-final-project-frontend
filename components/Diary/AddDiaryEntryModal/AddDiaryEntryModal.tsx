'use client';

import Modal from '@/components/Modal/Modal';
import AddDiaryEntryForm from './AddDiaryEntryForm';
import styles from './AddDiaryEntryModal.module.css';

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function AddDiaryEntryModal({ onClose, onCreated }: Props) {
  return (
    <Modal handleClose={onClose} className={styles.modal}>
      <h2 className={styles.title}>Новий запис</h2>

      <AddDiaryEntryForm onSuccess={onCreated} />
    </Modal>
  );
}
