'use client';

import { useState } from 'react';

const earnedBadges = [
  { 
    id: 1, 
    name: 'First Steps', 
    icon: '🌱', 
    description: 'Complete your first wellbeing session',
    earnedDate: '15 Jan 2025',
    color: '#10b981'
  },
  { 
    id: 2, 
    name: 'Streak Champion', 
    icon: '🔥', 
    description: 'Maintain a 3-day activity streak',
    earnedDate: '18 Jan 2025',
    color: '#f59e0b'
  },
  { 
    id: 3, 
    name: 'Emotional Explorer', 
    icon: '🧠', 
    description: 'Complete 3 Emotional Health sessions',
    earnedDate: '22 Jan 2025',
    color: '#6366f1'
  },
  { 
    id: 4, 
    name: 'Knowledge Seeker', 
    icon: '📚', 
    description: 'Finish the introductory module',
    earnedDate: '25 Jan 2025',
    color: '#8b5cf6'
  }
];

const lockedBadges = [
  { 
    id: 5, 
    name: 'Nutrition Master', 
    icon: '🥗', 
    description: 'Complete all Nutrition sessions',
    requirement: 'Complete 8 Nutrition sessions'
  },
  { 
    id: 6, 
    name: 'Iron Will', 
    icon: '💪', 
    description: 'Finish the S&C program',
    requirement: 'Complete S&C Level 1'
  },
  { 
    id: 7, 
    name: '7-Day Warrior', 
    icon: '⚡', 
    description: 'Achieve a 7-day streak',
    requirement: 'Maintain 7-day streak'
  },
  { 
    id: 8, 
    name: 'Wellness Champion', 
    icon: '🏆', 
    description: 'Reach 75% overall progress',
    requirement: 'Reach 75% progress'
  }
];

export default function AchievementsPage() {
  const [earned] = useState(earnedBadges);
  const [locked] = useState(lockedBadges);
  const nextMilestone = { current: 4, target: 8, name: 'Badge Collector' };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Achievements & Badges
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Collect badges as you progress through your wellness journey
        </p>
      </div>

      {/* Next Milestone */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '40px',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 4px 0' }}>Next Milestone</p>
            <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>{nextMilestone.name}</h3>
          </div>
          <span style={{ 
            fontSize: '24px', 
            fontWeight: '700',
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '8px'
          }}>
            {nextMilestone.current}/{nextMilestone.target}
          </span>
        </div>
        <div style={{ 
          height: '10px', 
          background: 'rgba(255,255,255,0.2)', 
          borderRadius: '5px', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            height: '100%', 
            width: `${(nextMilestone.current / nextMilestone.target) * 100}%`, 
            background: '#fff',
            borderRadius: '5px',
            transition: 'width 0.5s ease'
          }} />
        </div>
        <p style={{ fontSize: '13px', opacity: 0.8, margin: '8px 0 0 0' }}>
          Earn {nextMilestone.target - nextMilestone.current} more badges to unlock this milestone!
        </p>
      </div>

      {/* Earned Badges */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✅ Earned Badges</span>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#10b981',
            background: '#dcfce7',
            padding: '4px 12px',
            borderRadius: '20px'
          }}>
            {earned.length}
          </span>
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px' 
        }}>
          {earned.map((badge) => (
            <div
              key={badge.id}
              style={{
                background: '#fff',
                border: '2px solid',
                borderColor: badge.color,
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: badge.color,
                color: '#fff',
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '20px'
              }}>
                Earned
              </div>
              
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '16px',
                background: `${badge.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                marginBottom: '16px'
              }}>
                {badge.icon}
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: '0 0 8px 0' }}>
                {badge.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 12px 0' }}>
                {badge.description}
              </p>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                Earned on {badge.earnedDate}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔒 Locked Badges</span>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#94a3b8',
            background: '#f1f5f9',
            padding: '4px 12px',
            borderRadius: '20px'
          }}>
            {locked.length}
          </span>
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px' 
        }}>
          {locked.map((badge) => (
            <div
              key={badge.id}
              style={{
                background: '#f8fafc',
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
                opacity: 0.7
              }}
            >
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#94a3b8',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '20px'
              }}>
                Locked
              </div>
              
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '16px',
                background: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                marginBottom: '16px',
                filter: 'grayscale(100%)'
              }}>
                {badge.icon}
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#64748b', margin: '0 0 8px 0' }}>
                {badge.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 12px 0' }}>
                {badge.description}
              </p>
              <p style={{ 
                fontSize: '12px', 
                color: '#6366f1', 
                margin: 0,
                background: '#eef2ff',
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'inline-block'
              }}>
                🎯 {badge.requirement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
