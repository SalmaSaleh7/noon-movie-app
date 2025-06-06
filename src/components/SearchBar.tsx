import styles from '../styles/SearchBar.module.css';
import { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onKeyDown,
  isLoading = false,
  placeholder = 'Search movies...',
  disabled = false
}: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={styles.searchInput}
        aria-label="Search movies"
        disabled={disabled || isLoading}
      />
      {isLoading && (
        <div className={styles.spinner} aria-hidden="true">
          <div className={styles.spinnerInner} />
        </div>
      )}
      <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}