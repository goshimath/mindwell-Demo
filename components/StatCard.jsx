import styles from '@/styles/statcard.module.css';

export default function StatCard({ icon, label, value, trend, variant = 'dark' }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.top}>
        <div className={styles.icon}>{icon}</div>
        {trend && <div className={styles.trend}>{trend}</div>}
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
