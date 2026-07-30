import { AVATAR_API, percentFromProgress } from '@/lib/data';
import styles from '@/styles/studentrow.module.css';

export default function StudentRow({ student, progress }) {
  const pct = percentFromProgress(progress);
  const done = Object.values(progress || {}).filter(Boolean).length;
  const total = 3;

  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <img
          className={styles.avatar}
          src={`${AVATAR_API}${encodeURIComponent(student.name)}`}
          alt={student.name}
        />
        <div>
          <strong>{student.name}</strong>
          <span>{student.className} · Grade {student.grade}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.pct}>{pct}%</div>
        <div className={styles.detail}>{done}/{total} watched</div>
      </div>
    </div>
  );
}
