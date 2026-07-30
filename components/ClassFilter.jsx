import styles from '@/styles/classfilter.module.css';

const classes = ['All', '4B', '5A', '6B', '7A', '8C'];

export default function ClassFilter({ selected, onSelect, lang }) {
  const label = lang === 'hi' ? 'सभी कक्षाएँ' : 'All classes';

  return (
    <div className={styles.filter}>
      {classes.map((cls) => (
        <button
          key={cls}
          className={`${styles.chip} ${selected === cls ? styles.active : ''}`}
          onClick={() => onSelect(cls)}
        >
          {cls === 'All' ? label : cls}
        </button>
      ))}
    </div>
  );
}
