import styles from '@/styles/quickactions.module.css';

const actions = [
  { icon: '📚', label: 'Manage Curriculum', desc: 'Add, edit, or organize course content' },
  { icon: '👩‍🏫', label: 'Teacher Portal', desc: 'Facilitation notes and guidance' },
  { icon: '📊', label: 'Detailed Reports', desc: 'Export and analyze school data' },
];

export default function QuickActions({ lang }) {
  return (
    <div className={styles.grid}>
      {actions.map((action) => (
        <button key={action.label} className={styles.card}>
          <span className={styles.icon}>{action.icon}</span>
          <div>
            <strong>{action.label}</strong>
            <span>{action.desc}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
