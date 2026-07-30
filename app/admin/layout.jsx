'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import { school } from '@/lib/data';
import styles from '@/styles/shell.module.css';

export default function AdminLayout({ children }) {
  const [lang, setLang] = useState('en');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('mindwell-demo-state');
    router.push('/');
  };

  const childWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { lang });
    }
    return child;
  });

  return (
    <div className={styles.appShell}>
      <TopNav lang={lang} onLogout={handleLogout} />
      <div className={styles.pageWidth}>
        <div className={styles.adminContent}>
          {childWithProps}
        </div>
      </div>
    </div>
  );
}
