'use client';

import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { CardSkeleton } from '@/components/Skeleton';
import { pillars, pillarColors } from '@/lib/data';
import IspanLogo from '@/components/IspanLogo';
import styles from '@/styles/student.module.css';

const mockTracks = [
  { pillarId: 'psychology', progress: 62, sessionsCompleted: 5, totalSessions: 8, status: 'in-progress', sessionTitle: 'Managing Exam Stress', sessionNum: 3, duration: '12 min' },
  { pillarId: 'nutrition', progress: 38, sessionsCompleted: 3, totalSessions: 8, status: 'in-progress', sessionTitle: 'Balanced Indian Meals', sessionNum: 2, duration: '10 min' },
  { pillarId: 'snc', progress: 100, sessionsCompleted: 8, totalSessions: 8, status: 'completed', sessionTitle: 'Core Strength', sessionNum: 8, duration: '20 min' },
  { pillarId: 'physiotherapy', progress: 0, sessionsCompleted: 0, totalSessions: 8, status: 'not-started', sessionTitle: 'Posture Basics', sessionNum: 1, duration: '15 min' },
];

const pillarStyles = {
  psychology: { gradient: 'linear-gradient(135deg, #2B5EA7, #4A90D9)', icon: '🧠' },
  nutrition: { gradient: 'linear-gradient(135deg, #7CB87A, #A8D8A0)', icon: '🥗' },
  snc: { gradient: 'linear-gradient(135deg, #C4A84D, #E8D080)', icon: '💪' },
  physiotherapy: { gradient: 'linear-gradient(135deg, #9B8EC4, #B8A8D8)', icon: '🦴' },
};

const badges = [
  { icon: '🏅', label: 'First Session', earned: true, color: '#FFD700' },
  { icon: '🔥', label: '3-Day Streak', earned: true, color: '#FF6B35' },
  { icon: '💪', label: 'S&C Champ', earned: true, color: '#C4A84D' },
  { icon: '🧠', label: 'Mind Pro', earned: true, color: '#9B8EC4' },
  { icon: '🍎', label: 'Nutrition Pro', earned: false, color: '#ccc' },
  { icon: '🏆', label: 'Champion', earned: false, color: '#ccc' },
];

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <CardSkeleton count={4} />;

  return (
    <div className={styles.studentWrap}>
      {/* Hero session card — gradient pill */}
      <div className={styles.heroCard}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>YOUR NEXT SESSION</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroEmoji}>🧠</span>
            Psychology — {mockTracks[0].sessionTitle}
          </h1>
          <p className={styles.heroMeta}>Session {mockTracks[0].sessionNum} of {mockTracks[0].totalSessions} · {mockTracks[0].duration}</p>
          <div className={styles.heroProgress}>
            <ProgressBar value={mockTracks[0].progress} color="rgba(255,255,255,0.9)" />
          </div>
          <button className={styles.heroBtn}>
            <span className={styles.playIcon}>▶</span>
            Continue Learning
          </button>
        </div>
      </div>

      {/* Track cards */}
      <div className={styles.sectionHeader}>
        <h2>YOUR TRACKS</h2>
      </div>
      <div className={styles.trackGrid}>
        {mockTracks.map((track) => {
          const pillar = pillars.find((p) => p.id === track.pillarId);
          const ps = pillarStyles[track.pillarId];
          const isComplete = track.status === 'completed';
          const isNotStarted = track.status === 'not-started';

          return (
            <div
              key={track.pillarId}
              className={`${styles.trackCard} ${isComplete ? styles.trackComplete : ''}`}
              style={{ background: ps.gradient }}
            >
              <div className={styles.trackTop}>
                <span className={styles.trackEmoji}>{ps.icon}</span>
                {isComplete && <span className={styles.doneBadge}>✅ DONE!</span>}
                {isNotStarted && <span className={styles.startBadge}>New!</span>}
              </div>
              <h3 className={styles.trackTitle}>{pillar?.label}</h3>
              <span className={styles.trackSessions}>{track.sessionsCompleted}/{track.totalSessions} done</span>
              <div className={styles.trackProgress}>
                <ProgressBar value={track.progress} color="rgba(255,255,255,0.85)" />
                <span className={styles.trackPct}>{track.progress}%</span>
              </div>
              {isComplete && (
                <button className={styles.trackBtnWhite}>View Badge 🏅</button>
              )}
              {!isComplete && (
                <button className={styles.trackBtnWhite}>
                  {isNotStarted ? 'Start ▶' : 'Continue ▶'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Streaks — three big numbers */}
      <div className={styles.sectionHeader}>
        <h2>YOUR STREAKS</h2>
      </div>
      <div className={styles.streaksCard}>
        <div className={styles.streakBlock}>
          <span className={styles.streakIcon}>🔥</span>
          <span className={styles.streakNum}>3</span>
          <span className={styles.streakLabel}>Day Streak</span>
        </div>
        <div className={styles.streakDivider} />
        <div className={styles.streakBlock}>
          <span className={styles.streakIcon}>⭐</span>
          <span className={styles.streakNum}>12</span>
          <span className={styles.streakLabel}>Sessions Done</span>
        </div>
        <div className={styles.streakDivider} />
        <div className={styles.streakBlock}>
          <span className={styles.streakIcon}>🏅</span>
          <span className={styles.streakNum}>4</span>
          <span className={styles.streakLabel}>Badges Earned</span>
        </div>
      </div>

      {/* Badges — scrollable row */}
      <div className={styles.sectionHeader}>
        <h2>BADGES</h2>
      </div>
      <div className={styles.badgesScroll}>
        {badges.map((b) => (
          <div key={b.label} className={`${styles.badgeItem} ${!b.earned ? styles.badgeLocked : ''}`}>
            <div className={styles.badgeCircle} style={b.earned ? { background: `${b.color}20`, borderColor: b.color } : {}}>
              <span className={styles.badgeEmoji}>{b.earned ? b.icon : '❓'}</span>
            </div>
            <span className={styles.badgeLabel}>{b.earned ? b.label : 'Locked'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
