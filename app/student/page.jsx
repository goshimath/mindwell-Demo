'use client';

import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { CardSkeleton } from '@/components/Skeleton';
import { pillars, pillarColors } from '@/lib/data';
import styles from '@/styles/student.module.css';

const mockTracks = [
  { pillarId: 'psychology', progress: 62, sessionsCompleted: 5, totalSessions: 8, status: 'in-progress' },
  { pillarId: 'nutrition', progress: 38, sessionsCompleted: 3, totalSessions: 8, status: 'in-progress' },
  { pillarId: 'snc', progress: 100, sessionsCompleted: 8, totalSessions: 8, status: 'completed' },
  { pillarId: 'physiotherapy', progress: 0, sessionsCompleted: 0, totalSessions: 8, status: 'not-started' },
];

const badges = [
  { icon: '🏅', label: 'First Session' },
  { icon: '🔥', label: '3-Day Streak' },
  { icon: '💪', label: 'S&C Champion' },
];

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <CardSkeleton count={4} />;

  return (
    <>
      {/* Hero session card */}
      <div className={styles.heroCard}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>CURRENT SESSION</span>
          <h1>Continuing your wellness journey</h1>
          <p>Pick up where you left off, or start a new track.</p>
          <button className={styles.heroBtn}>Continue Session →</button>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroBadge}>🧠</div>
        </div>
      </div>

      {/* Track grid */}
      <div className={styles.sectionHeader}>
        <h2>YOUR FOUR TRACKS</h2>
      </div>
      <div className={styles.trackGrid}>
        {mockTracks.map((track) => {
          const pillar = pillars.find((p) => p.id === track.pillarId);
          const color = pillarColors[track.pillarId];
          const buttonLabel = track.status === 'completed' ? 'Completed' : track.status === 'not-started' ? 'Start' : 'Continue';
          const isComplete = track.status === 'completed';

          return (
            <div key={track.pillarId} className={`${styles.trackCard} ${isComplete ? styles.trackComplete : ''}`}>
              <div className={styles.trackHeader}>
                <span className={styles.trackIcon} style={{ background: `${color}15` }}>{pillar?.icon}</span>
                <div>
                  <h3>{pillar?.label}</h3>
                  <span className={styles.trackMeta}>{track.sessionsCompleted}/{track.totalSessions} sessions</span>
                </div>
              </div>
              <div className={styles.trackProgress}>
                <div className={styles.trackProgressInfo}>
                  <span>{track.progress}%</span>
                </div>
                <ProgressBar value={track.progress} color={color} />
              </div>
              {!isComplete && (
                <button className={styles.trackBtn} style={{ borderColor: color, color }}>
                  {buttonLabel}
                </button>
              )}
              {isComplete && (
                <div className={styles.trackDone}>✓ Completed</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Streaks and badges */}
      <div className={styles.sectionHeader}>
        <h2>YOUR STREAKS & BADGES</h2>
      </div>
      <div className={styles.streaksCard}>
        <div className={styles.streakInfo}>
          <span className={styles.streakCount}>3</span>
          <div>
            <strong>Day Streak</strong>
            <span>Keep it going!</span>
          </div>
        </div>
        <div className={styles.badgesRow}>
          {badges.map((b) => (
            <div key={b.label} className={styles.badgeChip}>
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
