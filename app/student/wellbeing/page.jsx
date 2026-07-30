'use client';

import { useState } from 'react';

const wellbeingAreas = [
  {
    id: 1,
    title: 'Emotional Health',
    icon: '🧠',
    progress: 65,
    sessionsCompleted: 5,
    totalSessions: 8,
    color: '#6366f1',
    description: 'Building emotional resilience and self-awareness'
  },
  {
    id: 2,
    title: 'Nutrition',
    icon: '🥗',
    progress: 40,
    sessionsCompleted: 3,
    totalSessions: 8,
    color: '#10b981',
    description: 'Understanding healthy eating habits'
  },
  {
    id: 3,
    title: 'Strength & Conditioning',
    icon: '💪',
    progress: 55,
    sessionsCompleted: 4,
    totalSessions: 8,
    color: '#f59e0b',
    description: 'Physical fitness and body awareness'
  },
  {
    id: 4,
    title: 'Physiotherapy',
    icon: '🏥',
    progress: 25,
    sessionsCompleted: 2,
    totalSessions: 8,
    color: '#ef4444',
    description: 'Injury prevention and recovery'
  }
];

const recentSessions = [
  { id: 1, title: 'Understanding Anxiety Triggers', duration: '25 min', pillar: 'Emotional Health', completed: true, date: '2 hours ago' },
  { id: 2, title: 'Balanced Diet Planning', duration: '30 min', pillar: 'Nutrition', completed: true, date: 'Yesterday' },
  { id: 3, title: 'Core Strengthening Basics', duration: '35 min', pillar: 'S&C', completed: true, date: '2 days ago' },
  { id: 4, title: 'Posture Correction Exercises', duration: '20 min', pillar: 'Physiotherapy', completed: false, date: '3 days ago' },
  { id: 5, title: 'Mindfulness Meditation', duration: '15 min', pillar: 'Emotional Health', completed: true, date: '4 days ago' },
  { id: 6, title: 'Hydration & Sports Performance', duration: '22 min', pillar: 'Nutrition', completed: false, date: '5 days ago' }
];

export default function WellbeingPage() {
  const [areas] = useState(wellbeingAreas);
  const [sessions] = useState(recentSessions);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          My Wellbeing Journey
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Track your progress across all wellbeing pillars
        </p>
      </div>

      {/* Wellbeing Areas Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {areas.map((area) => (
          <div
            key={area.id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{area.icon}</span>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  {area.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  {area.description}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>Progress</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: area.color }}>
                  {area.progress}%
                </span>
              </div>
              <div style={{ 
                height: '8px', 
                background: '#f1f5f9', 
                borderRadius: '4px', 
                overflow: 'hidden' 
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${area.progress}%`, 
                  background: area.color,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>
                {area.sessionsCompleted}/{area.totalSessions} sessions
              </span>
              <button
                style={{
                  background: area.color,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Continue →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Sessions */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>
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
                background: session.completed ? '#f0fdf4' : '#f8fafc',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: session.completed ? '#bbf7d0' : '#e2e8f0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: session.completed ? '#22c55e' : '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {session.completed ? '✓' : '○'}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                    {session.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    {session.pillar} • {session.duration} • {session.date}
                  </p>
                </div>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '500',
                padding: '6px 12px',
                borderRadius: '20px',
                background: session.completed ? '#dcfce7' : '#fef3c7',
                color: session.completed ? '#166534' : '#92400e'
              }}>
                {session.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
