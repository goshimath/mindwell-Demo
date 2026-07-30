'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IspanLogo from '@/components/IspanLogo';
import styles from '@/styles/sidebar.module.css';

const navConfig = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: '📊' },
    { id: 'students', label: 'Students', href: '/admin/students', icon: '👥' },
    {
      id: 'sessions',
      label: 'Sessions',
      icon: '📋',
      children: [
        { id: 'psychology', label: 'Psychology', href: '/admin/sessions/psychology', color: '#9B8EC4' },
        { id: 'nutrition', label: 'Nutrition', href: '/admin/sessions/nutrition', color: '#7CB87A' },
        { id: 'snc', label: 'Strength & Conditioning', href: '/admin/sessions/snc', color: '#C4A84D' },
        { id: 'physiotherapy', label: 'Physiotherapy', href: '/admin/sessions/physiotherapy', color: '#2B5EA7' },
      ],
    },
    { id: 'reports', label: 'Reports', href: '/admin/reports', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ],
  student: [
    { id: 'dashboard', label: 'Dashboard', href: '/student', icon: '📊' },
    { id: 'my-learning', label: 'My Tracks', href: '/student/tracks', icon: '🎯' },
    { id: 'progress', label: 'Progress', href: '/student/progress', icon: '📈' },
    { id: 'achievements', label: 'Achievements', href: '/student/achievements', icon: '🏅' },
  ],
  parent: [
    { id: 'dashboard', label: 'Dashboard', href: '/parent', icon: '📊' },
    { id: 'child-progress', label: 'Child Progress', href: '/parent/progress', icon: '👶' },
    { id: 'resources', label: 'Resources', href: '/parent/resources', icon: '📚' },
    { id: 'milestones', label: 'Milestones', href: '/parent/milestones', icon: '🏅' },
  ],
};

export default function Sidebar({ role, user, onLogout }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({ sessions: true });
  const navItems = navConfig[role] || navConfig.student;

  const toggleGroup = (id) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
      </button>

      {/* Overlay */}
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ''}`}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <Link href={`/${role}`} className={styles.logoLink}>
            <IspanLogo size="md" className={styles.logoWhite} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <div key={item.id}>
              {item.children ? (
                <>
                  <button
                    className={`${styles.navItem} ${styles.navGroup}`}
                    onClick={() => toggleGroup(item.id)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                    <span className={`${styles.chevron} ${expandedGroups[item.id] ? styles.chevronOpen : ''}`}>
                      ▾
                    </span>
                  </button>
                  {expandedGroups[item.id] && (
                    <div className={styles.subNav}>
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className={`${styles.subItem} ${isActive(child.href) ? styles.subActive : ''}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className={styles.subDot} style={{ background: child.color }} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${isActive(item.href) ? styles.navActive : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.footer}>
          {user && (
            <div className={styles.profile}>
              <div className={styles.avatar}>
                {user.name?.charAt(0)}
              </div>
              <div className={styles.profileInfo}>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
            </div>
          )}
          <button className={styles.logoutBtn} onClick={onLogout}>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
