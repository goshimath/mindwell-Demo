'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { demoAccounts, school } from '@/lib/data';
import { t } from '@/lib/strings';
import styles from '@/styles/landing.module.css';

export default function LandingPage() {
  const [lang, setLang] = useState('en');
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState(demoAccounts.student.email);
  const [password, setPassword] = useState(demoAccounts.student.password);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    setError('');
    const valid =
      (email === demoAccounts.admin.email && password === demoAccounts.admin.password && role === 'admin') ||
      (email === demoAccounts.student.email && password === demoAccounts.student.password && role === 'student') ||
      (email === demoAccounts.parent.email && password === demoAccounts.parent.password && role === 'parent');

    if (!valid) {
      setError(lang === 'hi' ? 'गलत प्रमाण-पत्र' : 'Invalid credentials');
      return;
    }

    // Store minimal session
    localStorage.setItem('mindwell-demo-state', JSON.stringify({
      role,
      email,
      school: school.name,
    }));

    // Route to role-specific dashboard
    router.push(`/${role}`);
  };

  return (
    <main className={styles.landing}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.pageWidth}>
          <div className={styles.topbar}>
            <div className={styles.brand}>
              <div className={styles.logo}>MW</div>
              <div>
                <h1>{t(lang, 'appName')}</h1>
                <p>{t(lang, 'tagline')}</p>
              </div>
            </div>
            <div className={styles.topActions}>
              <Link className={styles.navLink} href="/pricing">{t(lang, 'pricing')}</Link>
              <div className={styles.langToggle}>
                <button className={lang === 'en' ? styles.langActive : ''} onClick={() => setLang('en')}>EN</button>
                <button className={lang === 'hi' ? styles.langActive : ''} onClick={() => setLang('hi')}>हि</button>
              </div>
            </div>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Enterprise-ready wellbeing for Indian schools</span>
              <h2>{t(lang, 'loginTitle')}</h2>
              <p>{t(lang, 'loginSub')}</p>
              <div className={styles.heroPills}>
                <span>Student learning</span>
                <span>Parent visibility</span>
                <span>School analytics</span>
                <span>Role-based access</span>
              </div>
            </div>

            <div className={styles.heroCard}>
              <h3>{t(lang, 'loginTitle')}</h3>
              <p className={styles.heroSub}>{t(lang, 'enterprise')}</p>

              <div className={styles.field}>
                <label>{t(lang, 'role')}</label>
                <select value={role} onChange={(e) => {
                  setRole(e.target.value);
                  setEmail(demoAccounts[e.target.value]?.email || '');
                }}>
                  <option value="student">{t(lang, 'student')}</option>
                  <option value="admin">{t(lang, 'admin')}</option>
                  <option value="parent">{t(lang, 'parent')}</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>{t(lang, 'email')}</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>{t(lang, 'password')}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <button className={styles.primaryBtn} onClick={handleLogin}>{t(lang, 'signIn')}</button>

              <details className={styles.demoToggle}>
                <summary>{t(lang, 'demoCreds')}</summary>
                <div className={styles.demoAccess}>
                  <strong>{t(lang, 'schoolId')}:</strong> SCH-101<br />
                  <strong>Admin:</strong> school@mindwell.app / demo123<br />
                  <strong>Student:</strong> student1@mindwell.app / demo123<br />
                  <strong>Parent:</strong> parent@mindwell.app / demo123
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Why schools choose MindWell */}
      <section className={styles.whySection}>
        <div className={styles.pageWidth}>
          <h2>Why schools choose MindWell</h2>
          <p className={styles.whySub}>Clear, trustworthy, scalable</p>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <strong>Students</strong>
              Engaging video learning with progress, badges, and quick wins.
            </div>
            <div className={styles.whyCard}>
              <strong>Parents</strong>
              Privacy-safe milestones and supportive guidance.
            </div>
            <div className={styles.whyCard}>
              <strong>Schools</strong>
              Class-wise reporting and role-based access.
            </div>
            <div className={styles.whyCard}>
              <strong>Enterprise</strong>
              Built to scale across multiple schools and campuses.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
