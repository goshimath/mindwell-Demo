import styles from '@/styles/classtable.module.css';

const statusConfig = {
  'on-track': { color: '#22c55e', label: 'On track' },
  review: { color: '#f59e0b', label: 'Review' },
  behind: { color: '#ef4444', label: 'Behind' },
};

function getStatus(completedPct) {
  if (completedPct >= 75) return 'on-track';
  if (completedPct >= 50) return 'review';
  return 'behind';
}

export default function ClassTable({ classes, lang }) {
  if (!classes || classes.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{lang === 'hi' ? 'कोई कक्षा नहीं मिली' : 'No classes match this filter'}</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      {/* Desktop table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Class</th>
            <th>Students</th>
            <th>Completed</th>
            <th>In Progress</th>
            <th>Avg. Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => {
            const status = getStatus(cls.completed);
            const cfg = statusConfig[status];
            return (
              <tr key={cls.name}>
                <td className={styles.className}>{cls.name}</td>
                <td>{cls.students}</td>
                <td>
                  <div className={styles.progressCell}>
                    <span>{cls.completed}%</span>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${cls.completed}%`, background: cfg.color }}
                      />
                    </div>
                  </div>
                </td>
                <td>{cls.inProgress}%</td>
                <td>{cls.avgTime}</td>
                <td>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} style={{ background: cfg.color }} />
                    {cfg.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile card list */}
      <div className={styles.mobileList}>
        {classes.map((cls) => {
          const status = getStatus(cls.completed);
          const cfg = statusConfig[status];
          return (
            <div key={cls.name} className={styles.mobileCard}>
              <div className={styles.mobileTop}>
                <span className={styles.className}>{cls.name}</span>
                <span className={styles.statusBadge}>
                  <span className={styles.statusDot} style={{ background: cfg.color }} />
                  {cfg.label}
                </span>
              </div>
              <div className={styles.mobileProgress}>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${cls.completed}%`, background: cfg.color }}
                  />
                </div>
                <span>{cls.completed}% completed</span>
              </div>
              <div className={styles.mobileMeta}>
                <span>{cls.students} students</span>
                <span>{cls.inProgress}% in progress</span>
                <span>{cls.avgTime} avg</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
