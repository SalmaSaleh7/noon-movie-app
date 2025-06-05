import styles from '../styles/ErrorMessage.module.css';
import { ReactNode } from 'react';

interface ErrorMessageProps {
  message: string | ReactNode;
  variant?: 'error' | 'warning' | 'info';
  onRetry?: () => void;
}

export default function ErrorMessage({ 
  message, 
  variant = 'error', 
  onRetry 
}: ErrorMessageProps) {
  const variantClasses = {
    error: styles.error,
    warning: styles.warning,
    info: styles.info,
  };

  return (
    <div className={`${styles.errorContainer} ${variantClasses[variant]}`} role="alert">
      <div className={styles.errorContent}>
        <svg
          className={styles.errorIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {variant === 'error' && (
            <>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </>
          )}
          {variant === 'warning' && (
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
          )}
          {variant === 'info' && (
            <>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </>
          )}
        </svg>
        <div className={styles.errorMessage}>{message}</div>
      </div>
      {onRetry && (
        <button 
          className={styles.retryButton} 
          onClick={onRetry}
          aria-label="Retry"
        >
          Try Again
        </button>
      )}
    </div>
  );
}