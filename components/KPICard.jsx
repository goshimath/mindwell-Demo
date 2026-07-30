import styles from '@/styles/kpicard.module.css';

export default function KPICard({ icon, label, value, trend, variant = 'default' }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.top}>
        <div className={styles.icon}>{icon}</div>
        {trend && <span className={styles.trend}>{trend}</span>}
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
