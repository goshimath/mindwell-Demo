import styles from '@/styles/skeleton.module.css';

export function StatSkeleton() {
  return (
    <div className={`${styles.card} ${styles.dark}`}>
      <div className={styles.line} style={{ width: '40%', height: 14 }} />
      <div className={styles.line} style={{ width: '60%', height: 28, marginTop: 12 }} />
      <div className={styles.line} style={{ width: '30%', height: 12, marginTop: 8 }} />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className={styles.tableSkeleton}>
      <div className={styles.tableHeader}>
        {[60, 50, 55, 55, 45, 50].map((w, i) => (
          <div key={i} className={styles.line} style={{ width: w, height: 12 }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.tableRow}>
          <div className={styles.line} style={{ width: 80, height: 14 }} />
          <div className={styles.line} style={{ width: 30, height: 14 }} />
          <div className={styles.line} style={{ width: 100, height: 14 }} />
          <div className={styles.line} style={{ width: 40, height: 14 }} />
          <div className={styles.line} style={{ width: 50, height: 14 }} />
          <div className={styles.line} style={{ width: 70, height: 14 }} />
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className={styles.dashboardSkeleton}>
      <div className={styles.line} style={{ width: 200, height: 24 }} />
      <div className={styles.line} style={{ width: 300, height: 14, marginTop: 8 }} />
      <div className={styles.statGrid}>
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
