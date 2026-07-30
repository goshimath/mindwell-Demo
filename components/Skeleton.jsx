import styles from '@/styles/skeleton.module.css';

export function KPISkeleton() {
  return (
    <div className={styles.kpiCard}>
      <div className={styles.kpiTop}>
        <div className={styles.circle} />
        <div className={styles.line} style={{ width: 50 }} />
      </div>
      <div className={styles.line} style={{ width: '45%', height: 28, marginTop: 12 }} />
      <div className={styles.line} style={{ width: '60%', height: 12, marginTop: 8 }} />
    </div>
  );
}

export function TableSkeleton({ rows = 4, cols = 5 }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableHeader}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className={styles.line} style={{ width: 60 + i * 10, height: 12 }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className={styles.tableRow}>
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className={styles.line} style={{ width: 50 + c * 8, height: 14 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className={styles.dashboardSkeleton}>
      <div className={styles.line} style={{ width: 220, height: 24 }} />
      <div className={styles.line} style={{ width: 320, height: 14, marginTop: 8 }} />
      <div className={styles.kpiGrid}>
        <KPISkeleton />
        <KPISkeleton />
        <KPISkeleton />
        <KPISkeleton />
      </div>
      <TableSkeleton rows={4} cols={5} />
      <TableSkeleton rows={5} cols={6} />
    </div>
  );
}

export function CardSkeleton({ count = 4 }) {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.cardSkeleton}>
          <div className={styles.circle} style={{ width: 48, height: 48 }} />
          <div className={styles.line} style={{ width: '70%', height: 14, marginTop: 12 }} />
          <div className={styles.line} style={{ width: '50%', height: 12, marginTop: 8 }} />
          <div className={styles.line} style={{ width: '90%', height: 8, marginTop: 12 }} />
        </div>
      ))}
    </div>
  );
}
