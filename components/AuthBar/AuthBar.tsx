'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import styles from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <div className={styles.boxFooter}>
      <ul className={styles.boxFooterList}>
        <li className={styles.sign_link_modal}>
          <Link className={styles.sign_link} href="/sign-up">
            Зареєстуватись
          </Link>
        </li>
        <li className={styles.sign_link_modal}>
          <Link
            className={clsx(styles.sign_link, styles.sign_link_secondary)}
            href="/sign-in"
          >
            Увійти
          </Link>
        </li>
      </ul>
    </div>
  );
}
