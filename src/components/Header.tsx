import Link from 'next/link';
import styles from '../styles/Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/favorites', label: 'Favorites' }
];

export default function Header() {
  return (
    <header className={styles.header}>
      <nav aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}