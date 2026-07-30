'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { school, students, videos, percentFromProgress, demoAccounts } from '@/lib/data';
import { t } from '@/lib/strings';
import styles from '@/styles/shell.module.css';

export default function AdminLayout({ children }) {
  const [lang, setLang] = useState('en');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('mindwell-demo-state');
    router.push('/');
  };

  // Pass lang to children via context-like pattern (cloneElement)
  const childWithProps = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { lang });
      }
      return child;
    });
  }, [children, lang]);

  return (
    <div className={styles.appShell}>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.topbarLeft}>
            <div className={styles.logoSmall}>MW</div>
            <span className={styles.topbarTitle}>MindWell</span>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.langToggle}>
              <button className={lang === 'en' ? styles.langActive : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'hi' ? styles.langActive : ''} onClick={() => setLang('hi')}>हि</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pageWidth}>
        <div className={styles.appLayout}>
          <Sidebar
            role="admin"
            lang={lang}
            user={null}
            schoolName={school.name}
            onLogout={handleLogout}
          />
          <div className={styles.workspace}>
            {childWithProps}
          </div>
        </div>
      </div>
    </div>
  );
}

// Need React in scope for cloneElement
import React from 'react';
