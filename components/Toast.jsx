'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/toast.module.css';

export default function Toast({ message, onClose, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${!visible ? styles.hide : ''}`}>
      <span className={styles.icon}>✓</span>
      {message}
    </div>
  );
}
