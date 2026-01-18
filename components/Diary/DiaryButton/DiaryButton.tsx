import { ButtonHTMLAttributes } from 'react';
import css from './DiaryButton.module.css';
import clsx from 'clsx';

interface DiaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  role?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
}

export function DiaryButton({
  type = 'button',
  role = 'primary',
  children,
  className,
  ...rest
}: DiaryButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      className={clsx(
        css.button,
        { [css.buttonSecondary]: role === 'secondary' },
        className,
      )}
    >
      {children}
    </button>
  );
}
