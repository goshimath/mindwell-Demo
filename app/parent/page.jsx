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
  { icon: '📖', title: 'Understanding Your Child\'s Emotions', type: 'Guide', color: '#9B8EC4' },
  { icon: '🎧', title: 'Screen Time Balance Tips', type: 'Audio', color: '#2B5EA7' },
  { icon: '📋', title: 'Nutrition Checklist for Growing Kids', type: 'Download', color: '#7CB87A' },
];

export default function ParentDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <CardSkeleton count={4} />;

  return (
    <div className={styles.parentWrap}>
      {/* Greeting */}
      <div className={styles.greeting}>
        <h1>Welcome, Parent</h1>
        <p>{childData.name}&apos;s Wellness Journey — {childData.className}</p>
      </div>

      {/* Metric cards — big numbers, soft colors */}
      <div className={styles.metricGrid}>
        <div className={`${styles.metricCard} ${styles.metricGreen}`}>
          <span className={styles.metricIcon}>✅</span>
          <span className={styles.metricValue}>{childData.sessionsCompleted}</span>
          <span className={styles.metricLabel}>sessions completed</span>
        </div>
        <div className={`${styles.metricCard} ${styles.metricGold}`}>
          <span className={styles.metricIcon}>🔥</span>
          <span className={styles.metricValue}>{childData.streak}</span>
          <span className={styles.metricLabel}>day streak</span>
        </div>
        <div className={`${styles.metricCard} ${styles.metricBlue}`}>
          <span className={styles.metricIcon}>💚</span>
          <span className={styles.metricValue}>{childData.wellnessScore}%</span>
          <span className={styles.metricLabel}>wellness score</span>
        </div>
        <div className={`${styles.metricCard} ${styles.metricPurple}`}>
          <span className={styles.metricIcon}>🏅</span>
          <span className={styles.metricValue}>{childData.badges}</span>
          <span className={styles.metricLabel}>badges earned</span>
        </div>
      </div>

      {/* Learning summary */}
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
                  <span className={styles.pillarIcon} style={{ background: `${pillarColors[p.id]}12` }}>
                    {p.icon}
                  </span>
                  <span className={styles.pillarLabel}>{p.label}</span>
                </div>
                <div className={styles.pillarProgress}>
                  <span className={styles.pillarPct}>{progress}%</span>
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
            <div key={r.title} className={styles.resourceCard} style={{ borderColor: `${r.color}30` }}>
              <span className={styles.resourceIcon} style={{ background: `${r.color}10` }}>{r.icon}</span>
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
    </div>
  );
}
