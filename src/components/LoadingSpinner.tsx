import styles from '../styles/LoadingSpinner.module.css';

type Size = 'small' | 'medium' | 'large';

interface LoadingSpinnerProps {
  size?: Size;
  color?: string;
}

const sizeClasses: Record<Size, string> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large
};

export default function LoadingSpinner({ size = 'medium', color = '#ff4757' }: LoadingSpinnerProps) {
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