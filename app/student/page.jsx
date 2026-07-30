'use client';

import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { CardSkeleton } from '@/components/Skeleton';
import { pillars, pillarColors } from '@/lib/data';
import styles from '@/styles/student.module.css';

const mockTracks = [
  { pillarId: 'psychology', progress: 62, sessionsCompleted: 5, totalSessions: 8, status: 'in-progress', emoji: '🧠', color: '#9B8EC4', bgGradient: 'linear-gradient(135deg, #E8DEFF 0%, #F5F0FF 100%)' },
  { pillarId: 'nutrition', progress: 38, sessionsCompleted: 3, totalSessions: 8, status: 'in-progress', emoji: '🍎', color: '#7CB87A', bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8F1 100%)' },
  { pillarId: 'snc', progress: 100, sessionsCompleted: 8, totalSessions: 8, status: 'completed', emoji: '💪', color: '#C4A84D', bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFFDF5 100%)' },
  { pillarId: 'physiotherapy', progress: 0, sessionsCompleted: 0, totalSessions: 8, status: 'not-started', emoji: '🏃', color: '#2B5EA7', bgGradient: 'linear-gradient(135deg, #E3F2FD 0%, #F5F9FF 100%)' },
];

const badges = [
  { icon: '🌟', label: 'First Session', color: '#FFD700' },
  { icon: '🔥', label: '3-Day Streak', color: '#FF6B35' },
  { icon: '💪', label: 'S&C Champion', color: '#C4A84D' },
  { icon: '🧠', label: 'Mind Master', color: '#9B8EC4' },
];

const floatingEmojis = ['🌟', '⭐', '🎯', '🎨', '📚', '🦋', '🌈', '🌻'];

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <CardSkeleton count={4} />;

  return (
    <div className={styles.studentWrap}>
      {/* Floating background decoration */}
      <div className={styles.floatingDecor}>
        {floatingEmojis.map((e, i) => (
          <span key={i} className={styles.floatingEmoji} style={{
            left: `${10 + (i * 12)}%`,
            animationDelay: `${i * 0.7}s`,
            fontSize: `${1.2 + Math.random() * 0.8}rem`,
          }}>{e}</span>
        ))}
      </div>

      {/* Hero greeting */}
      <div className={styles.heroCard}>
        <div className={styles.heroContent}>
          <div className={styles.heroGreeting}>
            <span className={styles.wave}>👋</span>
            <h1>Hi Aarav!</h1>
          </div>
          <p className={styles.heroSub}>Ready to continue your wellness adventure?</p>
          <button className={styles.heroBtn}>
            <span className={styles.btnIcon}>▶</span>
            Continue Session
          </button>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroCircle}>
            <span className={styles.heroBigEmoji}>🧠</span>
          </div>
          <div className={styles.heroDots}>
            <span className={styles.dot} style={{ background: '#9B8EC4' }} />
            <span className={styles.dot} style={{ background: '#7CB87A' }} />
            <span className={styles.dot} style={{ background: '#C4A84D' }} />
            <span className={styles.dot} style={{ background: '#2B5EA7' }} />
          </div>
        </div>
      </div>

      {/* Track cards */}
      <div className={styles.sectionHeader}>
        <h2>🎯 Your Four Tracks</h2>
        <span className={styles.sectionSub}>Pick a track to continue learning</span>
      </div>
      <div className={styles.trackGrid}>
        {mockTracks.map((track) => {
          const pillar = pillars.find((p) => p.id === track.pillarId);
          const isComplete = track.status === 'completed';
          const isStarted = track.status === 'in-progress';
          const buttonLabel = isComplete ? '✅ Done!' : isStarted ? 'Continue →' : '🚀 Start';

          return (
            <div
              key={track.pillarId}
              className={`${styles.trackCard} ${isComplete ? styles.trackComplete : ''}`}
              style={{ background: track.bgGradient }}
            >
              <div className={styles.trackTop}>
                <span className={styles.trackEmoji}>{track.emoji}</span>
                {isComplete && <span className={styles.completeBadge}>⭐ Complete!</span>}
              </div>
              <h3 className={styles.trackTitle}>{pillar?.label}</h3>
              <span className={styles.trackMeta}>{track.sessionsCompleted}/{track.totalSessions} sessions</span>
              <div className={styles.trackProgress}>
                <div className={styles.trackProgressInfo}>
                  <span className={styles.trackPct}>{track.progress}%</span>
                </div>
                <ProgressBar value={track.progress} color={track.color} />
              </div>
              <button
                className={`${styles.trackBtn} ${isComplete ? styles.trackBtnDone : ''}`}
                style={{ borderColor: track.color, color: track.color }}
              >
                {buttonLabel}
              </button>
            </div>
          );
        })}
      </div>

      {/* Streaks and badges */}
      <div className={styles.streaksSection}>
        <div className={styles.sectionHeader}>
          <h2>🏆 Your Streaks & Badges</h2>
        </div>
        <div className={styles.streaksCard}>
          <div className={styles.streakInfo}>
            <div className={styles.streakFire}>🔥</div>
            <div>
              <span className={styles.streakCount}>3</span>
              <strong>Day Streak</strong>
              <span className={styles.streakMsg}>Keep it going, superstar!</span>
            </div>
          </div>
          <div className={styles.badgesRow}>
            {badges.map((b) => (
              <div key={b.label} className={styles.badgeChip} style={{ borderColor: b.color }}>
                <span className={styles.badgeIcon}>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Encouragement */}
      <div className={styles.encourageCard}>
        <span className={styles.encourageEmoji}>🌟</span>
        <div>
          <strong>You&apos;re doing amazing!</strong>
          <span>Complete all 4 tracks to become a Wellness Champion</span>
        </div>
      </div>
    </div>
  );
}
