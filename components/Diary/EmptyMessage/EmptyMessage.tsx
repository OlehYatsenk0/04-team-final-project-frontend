'use client';
import css from './EmptyMessage.module.css';

interface EmptyMessageProps {
  message?: string;
}

export default function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <p className={css.text}>
      {message ? message : '🧐 Записи відсутні'}
    </p>
  );
}
