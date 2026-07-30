'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/sidebar.module.css';
import { AVATAR_API } from '@/lib/data';
import { t } from '@/lib/strings';

const navConfig = {
  admin: [
    { id: 'dashboard', label: 'dashboard', href: '/admin' },
    { id: 'students', label: 'students', href: '/admin/students' },
    { id: 'reports', label: 'reports', href: '/admin/reports' },
    { id: 'curriculum', label: 'curriculum', href: '/admin/curriculum' },
    { id: 'settings', label: 'settings', href: '/admin/settings' },
  ],
  student: [
    { id: 'my-learning', label: 'myLearning', href: '/student' },
    { id: 'progress', label: 'progress', href: '/student/progress' },
    { id: 'achievements', label: 'achievements', href: '/student/achievements' },
  ],
  parent: [
    { id: 'child-progress', label: 'childProgress', href: '/parent' },
    { id: 'resources', label: 'resources', href: '/parent/resources' },
    { id: 'support', label: 'support', href: '/parent/support' },
  ],
};

export default function Sidebar({ role, lang, user, schoolName, onLogout }) {
  const pathname = usePathname();
  const navItems = navConfig[role] || navConfig.student;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
        </div>
        <div>
          <strong>{schoolName}</strong>
          <span>{t(lang, 'enterprise')}</span>
        </div>
      </div>

      <div className={styles.roleSwitcher}>
        <span className={styles.sectionLabel}>{t(lang, 'switchView')}</span>
        <div className={styles.roleButtons}>
          <Link href="/admin" className={`${styles.roleBtn} ${role === 'admin' ? styles.active : ''}`}>
            {t(lang, 'admin')}
          </Link>
          <Link href="/student" className={`${styles.roleBtn} ${role === 'student' ? styles.active : ''}`}>
            {t(lang, 'student')}
          </Link>
          <Link href="/parent" className={`${styles.roleBtn} ${role === 'parent' ? styles.active : ''}`}>
            {t(lang, 'parent')}
          </Link>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && item.href !== '/student' && item.href !== '/parent' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navActive : ''}`}
            >
              {t(lang, item.label)}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={onLogout}>
          {t(lang, 'signOut')}
        </button>
        {user && (
          <div className={styles.profileChip}>
            <img
              src={`${AVATAR_API}${encodeURIComponent(user.name)}`}
              alt={user.name}
              className={styles.avatar}
            />
            <div>
              <strong>{user.name}</strong>
              <span>{user.className} · {user.grade}th grade</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
