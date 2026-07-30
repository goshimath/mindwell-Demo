'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { demoAccounts, school, pillars } from '@/lib/data';
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

    localStorage.setItem('ispan-demo-state', JSON.stringify({ role, email, school: school.name }));
    router.push(`/${role}`);
  };

  return (
    <main className={styles.landing}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.pageWidth}>
          <div className={styles.topbar}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <span className={styles.logoIcon}>✦</span>
                <span>iSpan</span>
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
              <span className={styles.eyebrow}>{t(lang, 'subtitle')}</span>
              <h1>{t(lang, 'inspiring')}</h1>
              <p className={styles.heroDesc}>{t(lang, 'inspiringDesc')}</p>
              <div className={styles.heroPills}>
                <span>🧠 {t(lang, 'pillarPsychology')}</span>
                <span>💪 {t(lang, 'pillarPhysio')}</span>
                <span>🍎 {t(lang, 'pillarNutrition')}</span>
                <span>🏋️ {t(lang, 'pillarStrength')}</span>
              </div>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <strong>10,000+</strong>
                  <span>Students</span>
                </div>
                <div className={styles.heroStat}>
                  <strong>50+</strong>
                  <span>Schools</span>
                </div>
                <div className={styles.heroStat}>
                  <strong>4</strong>
                  <span>Pillars</span>
                </div>
              </div>
            </div>

            <div className={styles.heroCard}>
              <div className={styles.loginHeader}>
                <h3>{t(lang, 'loginTitle')}</h3>
                <p>{t(lang, 'loginSub')}</p>
              </div>

              <div className={styles.field}>
                <label>{t(lang, 'role')}</label>
                <select value={role} onChange={(e) => { setRole(e.target.value); setEmail(demoAccounts[e.target.value]?.email || ''); }}>
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
                  <strong>{t(lang, 'schoolId')}:</strong> ISP-001<br />
                  <strong>Admin:</strong> admin@ispan.in / demo123<br />
                  <strong>Student:</strong> student1@ispan.in / demo123<br />
                  <strong>Parent:</strong> parent@ispan.in / demo123
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className={styles.pillarsSection}>
        <div className={styles.pageWidth}>
          <div className={styles.sectionHeader}>
            <h2>{t(lang, 'ourPillars')}</h2>
            <p>{t(lang, 'pillarSubtitle')}</p>
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map((pillar) => (
              <div key={pillar.id} className={styles.pillarCard}>
                <span className={styles.pillarIcon}>{pillar.icon}</span>
                <h3>{pillar.label}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className={styles.forSection}>
        <div className={styles.pageWidth}>
          <div className={styles.forGrid}>
            <div className={styles.forCard}>
              <div className={styles.forIcon}>🎓</div>
              <h3>{t(lang, 'forStudents')}</h3>
              <p>{t(lang, 'studentsDesc')}</p>
            </div>
            <div className={styles.forCard}>
              <div className={styles.forIcon}>👩‍🏫</div>
              <h3>{t(lang, 'forTeachers')}</h3>
              <p>{t(lang, 'teachersDesc')}</p>
            </div>
            <div className={styles.forCard}>
              <div className={styles.forIcon}>👪</div>
              <h3>{t(lang, 'forParents')}</h3>
              <p>{t(lang, 'parentsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.missionSection}>
        <div className={styles.pageWidth}>
          <div className={styles.missionContent}>
            <h2>{t(lang, 'holistic')}</h2>
            <p>{t(lang, 'holisticDesc')}</p>
            <div className={styles.missionCta}>
              <button className={styles.primaryBtn} onClick={handleLogin}>{t(lang, 'getStarted')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.pageWidth}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <div className={styles.logo}>
                <span className={styles.logoIcon}>✦</span>
                <span>iSpan</span>
              </div>
              <p>India&apos;s first integrated wellness studio</p>
            </div>
            <div className={styles.footerMeta}>
              <span>Bangalore, India</span>
              <span>Mon–Sat: 9am–7pm</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
