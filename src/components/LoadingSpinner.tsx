import styles from '../styles/LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = '#ff4757' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <div className={styles.spinnerContainer} aria-live="polite" aria-busy="true">
      <div 
        className={`${styles.spinner} ${sizeClasses[size]}`}
        style={{ borderTopColor: color }}
      />
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}