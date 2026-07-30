'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { school, demoAccounts } from '@/lib/data';
import styles from '@/styles/appshell.module.css';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user] = useState({ name: 'Admin', role: 'School Admin' });

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
      <Sidebar role="admin" user={user} onLogout={handleLogout} />
      <main className={styles.main}>
        <div className={styles.content}>
          {childWithProps}
        </div>
      </main>
    </div>
  );
}
