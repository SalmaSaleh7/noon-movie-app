import styles from '../styles/EmptyState.module.css';
import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  message: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

const defaultIcon = (
  <svg className={styles.emptyStateIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function EmptyState({ title, message, icon = defaultIcon, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyState} aria-live="polite">
      <div className={styles.emptyStateContent}>
        {icon}
        <h2 className={styles.emptyStateTitle}>{title}</h2>
        <p className={styles.emptyStateMessage}>{message}</p>
        {action && <div className={styles.emptyStateAction}>{action}</div>}
      </div>
    </div>
  );
}