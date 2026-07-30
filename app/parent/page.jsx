'use client';

import { useState, useEffect } from 'react';
import KPICard from '@/components/KPICard';
import ProgressBar from '@/components/ProgressBar';
import { pillars, pillarColors, milestones } from '@/lib/data';
import { CardSkeleton } from '@/components/Skeleton';
import styles from '@/styles/parent.module.css';

const childData = {
  name: 'Aarav',
  className: 'Grade 5A',
  streak: 3,
  badges: 4,
  wellnessScore: 72,
  sessionsCompleted: 16,
  pillarProgress: {
    emotional: 80,
    nutrition: 60,
    snc: 45,
    physiotherapy: 70,
  },
};

const resources = [
  { icon: '📖', title: 'Understanding Your Child\'s Emotions', type: 'Guide' },
  { icon: '🎧', title: 'Screen Time Balance Tips', type: 'Audio' },
  { icon: '📋', title: 'Nutrition Checklist for Growing Kids', type: 'Download' },
];

export default function ParentDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <CardSkeleton count={4} />;

  return (
    <>
      {/* Greeting */}
      <div className={styles.greeting}>
        <h1>Welcome, Parent</h1>
        <p>{childData.name}&apos;s Wellness Journey — {childData.className}</p>
      </div>

      {/* Child overview metrics */}
      <div className={styles.kpiRow}>
        <KPICard icon="✅" label="Sessions Completed" value={childData.sessionsCompleted} />
        <KPICard icon="🔥" label="Current Streak" value={`${childData.streak} days`} variant="variant-gold" />
        <KPICard icon="💚" label="Wellness Score" value={`${childData.wellnessScore}%`} variant="variant-green" />
        <KPICard icon="🏅" label="Badges Earned" value={childData.badges} variant="variant-purple" />
      </div>

      {/* Learning summary — pillar progress */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>What {childData.name} is learning</h2>
        </div>
        <div className={styles.pillarList}>
          {pillars.map((p) => {
            const progress = childData.pillarProgress[p.id] || 0;
            return (
              <div key={p.id} className={styles.pillarRow}>
                <div className={styles.pillarInfo}>
                  <span className={styles.pillarIcon} style={{ background: `${pillarColors[p.id]}15` }}>
                    {p.icon}
                  </span>
                  <span className={styles.pillarLabel}>{p.label}</span>
                </div>
                <div className={styles.pillarProgress}>
                  <span>{progress}%</span>
                  <ProgressBar value={progress} color={pillarColors[p.id]} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy note — always visible */}
      <div className={styles.privacyNote}>
        <span className={styles.privacyIcon}>🔒</span>
        <p>This shows overall progress. Individual session content and responses are private to the child and their school counsellor.</p>
      </div>

      {/* Resources */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Resources for you</h2>
        </div>
        <div className={styles.resourceGrid}>
          {resources.map((r) => (
            <div key={r.title} className={styles.resourceCard}>
              <span className={styles.resourceIcon}>{r.icon}</span>
              <div>
                <strong>{r.title}</strong>
                <span>{r.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Milestones</h2>
        </div>
        <div className={styles.milestoneList}>
          {milestones.map((m) => (
            <div key={m.id} className={styles.milestoneItem}>
              <span className={styles.milestoneIcon}>{m.icon}</span>
              <div>
                <span className={styles.milestoneText}>{m.text}</span>
                <span className={styles.milestoneDate}>{m.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
