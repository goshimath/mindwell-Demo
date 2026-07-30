import styles from '@/styles/activityitem.module.css';

export default function ActivityItem({ icon, text, time }) {
  return (
    <div className={styles.item}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.content}>
        <span className={styles.text}>{text}</span>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
}
