'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/topnav.module.css';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Students', href: '/admin/students' },
  { label: 'Curriculum', href: '/admin/curriculum' },
  { label: 'Reports', href: '/admin/reports' },
];

export default function TopNav({ lang, onLogout }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.topnav}>
      <div className={styles.inner}>
        {/* Left: logo + nav links */}
        <div className={styles.left}>
          <Link href="/admin" className={styles.brand}>
            <div className={styles.logo}>MW</div>
            <span>MindWell</span>
          </Link>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.navActive : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: lang + admin dropdown */}
        <div className={styles.right}>
          <div className={styles.langToggle}>
            <button className={lang === 'en' ? styles.langActive : ''}>EN</button>
            <button className={lang === 'hi' ? styles.langActive : ''}>हि</button>
          </div>
          <div className={styles.adminBadge}>
            <span className={styles.adminDot} />
            Admin
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink} ${pathname === item.href ? styles.navActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button className={styles.mobileLogout} onClick={onLogout}>Sign out</button>
        </div>
      )}
    </nav>
  );
}
