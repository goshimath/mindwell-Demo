'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IspanLogo from '@/components/IspanLogo';
import styles from '@/styles/sidebar.module.css';

const navConfig = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: '📊' },
    { id: 'students', label: 'Students', href: '/admin', icon: '👥' },
    {
      id: 'wellbeing',
      label: 'Wellbeing Program',
      icon: '🧘',
      children: [
        { id: 'emotional', label: 'Emotional Health', href: '/admin', color: '#9B8EC4' },
        { id: 'nutrition', label: 'Nutrition', href: '/admin', color: '#7CB87A' },
        { id: 'snc', label: 'Strength & Conditioning', href: '/admin', color: '#C4A84D' },
        { id: 'physiotherapy', label: 'Physiotherapy', href: '/admin', color: '#2B5EA7' },
      ],
    },
    { id: 'reports', label: 'Reports', href: '/admin', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '/admin', icon: '⚙️' },
  ],
  student: [
    { id: 'dashboard', label: 'Dashboard', href: '/student', icon: '📊' },
    {
      id: 'wellbeing',
      label: 'Wellbeing Program',
      icon: '🧘',
      children: [
        { id: 'emotional', label: 'Emotional Health', href: '/student', color: '#9B8EC4' },
        { id: 'nutrition', label: 'Nutrition', href: '/student', color: '#7CB87A' },
        { id: 'snc', label: 'Strength & Conditioning', href: '/student', color: '#C4A84D' },
        { id: 'physiotherapy', label: 'Physiotherapy', href: '/student', color: '#2B5EA7' },
      ],
    },
    { id: 'progress', label: 'Progress', href: '/student', icon: '📈' },
    { id: 'achievements', label: 'Achievements', href: '/student', icon: '🏅' },
  ],
  parent: [
    { id: 'dashboard', label: 'Dashboard', href: '/parent', icon: '📊' },
    { id: 'child-progress', label: 'Child Progress', href: '/parent', icon: '👶' },
    { id: 'resources', label: 'Resources', href: '/parent', icon: '📚' },
    { id: 'milestones', label: 'Milestones', href: '/parent', icon: '🏅' },
  ],
  'super-admin': [
    { id: 'dashboard', label: 'Dashboard', href: '/super-admin', icon: '📊' },
    { id: 'schools', label: 'Schools', href: '/super-admin', icon: '🏫' },
    { id: 'subscriptions', label: 'Subscriptions', href: '/super-admin', icon: '💳' },
    { id: 'revenue', label: 'Revenue', href: '/super-admin', icon: '📈' },
    { id: 'settings', label: 'Settings', href: '/super-admin', icon: '⚙️' },
  ],
};

export default function Sidebar({ role, user, onLogout }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({ wellbeing: true });
  const navItems = navConfig[role] || navConfig.student;

  const toggleGroup = (id) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (href) => pathname === href;

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
      </button>

      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.logoSection}>
          <Link href={`/${role}`} className={styles.logoLink}>
            <IspanLogo size="md" className={styles.logoWhite} />
          </Link>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <div key={item.id}>
              {item.children ? (
                <>
                  <button className={`${styles.navItem} ${styles.navGroup}`} onClick={() => toggleGroup(item.id)}>
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                    <span className={`${styles.chevron} ${expandedGroups[item.id] ? styles.chevronOpen : ''}`}>▾</span>
                  </button>
                  {expandedGroups[item.id] && (
                    <div className={styles.subNav}>
                      {item.children.map((child) => (
                        <Link key={child.id} href={child.href} className={`${styles.subItem} ${isActive(child.href) ? styles.subActive : ''}`}
                          onClick={() => setMobileOpen(false)}>
                          <span className={styles.subDot} style={{ background: child.color }} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} className={`${styles.navItem} ${isActive(item.href) ? styles.navActive : ''}`}
                  onClick={() => setMobileOpen(false)}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.footer}>
          {user && (
            <div className={styles.profile}>
              <div className={styles.avatar}>{user.name?.charAt(0)}</div>
              <div className={styles.profileInfo}>
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>
            </div>
          )}
          <button className={styles.logoutBtn} onClick={onLogout}>Sign out</button>
        </div>
      </aside>
    </>
  );
}
