'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/appshell.module.css';

export default function StudentLayout({ children }) {
  const router = useRouter();
  const [user] = useState({ name: 'Aarav', role: 'Student · Grade 5A' });

  const handleLogout = useCallback(() => {
    localStorage.removeItem('ispan-demo-state');
    router.push('/');
  }, [router]);

  const childWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user, onLogout: handleLogout });
    }
    return child;
  });

  return (
    <div className={styles.shell}>
      <Sidebar role="student" user={user} onLogout={handleLogout} />
      <main className={styles.main}>
        <div className={styles.content}>
          {childWithProps}
        </div>
      </main>
    </div>
  );
}
