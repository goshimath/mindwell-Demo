'use client';

import { useState } from 'react';

const childData = {
  name: 'Aarav Patel',
  grade: '10',
  class: 'A',
  overallScore: 72,
  avatar: '👦'
};

const pillarProgress = [
  { name: 'Emotional Health', progress: 75, color: '#6366f1', sessions: '6/8' },
  { name: 'Nutrition', progress: 55, color: '#10b981', sessions: '4/8' },
  { name: 'Strength & Conditioning', progress: 65, color: '#f59e0b', sessions: '5/8' },
  { name: 'Physiotherapy', progress: 40, color: '#ef4444', sessions: '3/8' }
];

const weeklyActivity = [
  { day: 'Mon', sessions: 2, minutes: 45 },
  { day: 'Tue', sessions: 1, minutes: 30 },
  { day: 'Wed', sessions: 0, minutes: 0 },
  { day: 'Thu', sessions: 2, minutes: 55 },
  { day: 'Fri', sessions: 1, minutes: 25 },
  { day: 'Sat', sessions: 1, minutes: 35 },
  { day: 'Sun', sessions: 0, minutes: 0 }
];

const recentSessions = [
  { id: 1, name: 'Understanding Anxiety Triggers', pillar: 'Emotional Health', pillarIcon: '🧠', completed: true, date: '2 hours ago' },
  { id: 2, name: 'Balanced Diet Planning', pillar: 'Nutrition', pillarIcon: '🥗', completed: true, date: 'Yesterday' },
  { id: 3, name: 'Core Strengthening Basics', pillar: 'S&C', pillarIcon: '💪', completed: true, date: '2 days ago' },
  { id: 4, name: 'Posture Correction Exercises', pillar: 'Physiotherapy', pillarIcon: '🏥', completed: false, date: '3 days ago' },
  { id: 5, name: 'Mindfulness Meditation', pillar: 'Emotional Health', pillarIcon: '🧠', completed: true, date: '4 days ago' }
];

export default function ParentProgressPage() {
  const [child] = useState(childData);
  const [sessions] = useState(recentSessions);
  const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Child Header */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '32px',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}>
            {child.avatar}
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0' }}>
              {child.name}
            </h1>
            <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
              Grade {child.grade} • Class {child.class}
            </p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <p style={{ fontSize: '14px', opacity: 0.8, margin: '0 0 4px 0' }}>Overall Score</p>
            <p style={{ fontSize: '42px', fontWeight: '700', margin: 0 }}>{child.overallScore}%</p>
          </div>
        </div>
      </div>

      {/* Pillar Progress */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>
          Pillar Progress
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {pillarProgress.map((pillar) => (
            <div key={pillar.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>
                  {pillar.name}
                </span>
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {pillar.sessions} sessions • {pillar.progress}%
                </span>
              </div>
              <div style={{ 
                height: '10px', 
                background: '#f1f5f9', 
                borderRadius: '5px', 
                overflow: 'hidden' 
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${pillar.progress}%`, 
                  background: pillar.color,
                  borderRadius: '5px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>
          Weekly Activity
        </h2>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          height: '160px',
          padding: '0 20px',
          gap: '12px'
        }}>
          {weeklyActivity.map((day) => (
            <div key={day.day} style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#64748b',
                marginBottom: '8px'
              }}>
                {day.minutes > 0 ? `${day.minutes}m` : '-'}
              </div>
              <div
                style={{
                  width: '100%',
                  maxWidth: '48px',
                  height: day.minutes > 0 ? `${(day.minutes / maxMinutes) * 100}px` : '4px',
                  background: day.sessions > 0 
                    ? 'linear-gradient(180deg, #6366f1 0%, #818cf8 100%)' 
                    : '#e2e8f0',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  minHeight: '4px'
                }}
              />
              <div style={{
                fontSize: '13px',
                fontWeight: '500',
                color: '#1e293b',
                marginTop: '10px'
              }}>
                {day.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>
          Recent Sessions
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sessions.map((session) => (
            <div
              key={session.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }}>
                  {session.pillarIcon}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                    {session.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    {session.pillar} • {session.date}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {session.completed ? (
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: '#dcfce7',
                    color: '#166534'
                  }}>
                    ✓ Completed
                  </span>
                ) : (
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: '#fef3c7',
                    color: '#92400e'
                  }}>
                    ○ Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
