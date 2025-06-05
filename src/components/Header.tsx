import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav aria-label="Main navigation">
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/favorites" className={styles.navLink}>
          Favorites
        </Link>
      </nav>
    </header>
  );
}