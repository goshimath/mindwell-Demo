import styles from '@/styles/progressbar.module.css';

export default function ProgressBar({ value, color, height = 8 }) {
  return (
    <div className={styles.track} style={{ height }}>
      <div
        className={styles.fill}
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color || 'var(--brand-blue)' }}
      />
    </div>
  );
}
