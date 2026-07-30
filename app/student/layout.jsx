'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { school } from '@/lib/data';
import { t } from '@/lib/strings';
import styles from '@/styles/shell.module.css';

export default function StudentLayout({ children }) {
  const [lang, setLang] = useState('en');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('mindwell-demo-state');
    router.push('/');
  };

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
            role="student"
            lang={lang}
            user={{ name: 'Aarav', className: '5A', grade: '5' }}
            schoolName={school.name}
            onLogout={handleLogout}
          />
          <div className={styles.workspace}>
            <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--muted)' }}>
              <h2>{t(lang, 'studentDashboard')}</h2>
              <p>Coming in the next phase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
