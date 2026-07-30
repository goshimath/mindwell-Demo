import styles from '@/styles/pillarbadge.module.css';
import { getStatus, getStatusLabel, getStatusColor } from '@/lib/data';

export default function PillarBadge({ value }) {
  const status = getStatus(value);
  const color = getStatusColor(status);

  return (
    <span className={styles.badge}>
      <span className={styles.dot} style={{ background: color }} />
      {getStatusLabel(status)}
    </span>
  );
}
