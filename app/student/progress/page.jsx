'use client';

import { useState } from 'react';

const metrics = [
  { id: 1, label: 'Overall Progress', value: '25%', icon: '📊', color: '#6366f1', trend: '+5% this week' },
  { id: 2, label: 'Sessions Completed', value: '2/8', icon: '✅', color: '#10b981', trend: '3 remaining' },
  { id: 3, label: 'Current Streak', value: '3 days', icon: '🔥', color: '#f59e0b', trend: 'Best: 7 days' },
  { id: 4, label: 'Badges Earned', value: '4', icon: '🏆', color: '#8b5cf6', trend: '2 more to unlock' }
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

const recentActivity = [
  { id: 1, action: 'Completed', item: 'Emotional Health Session 5', time: '2 hours ago', icon: '🧠' },
  { id: 2, action: 'Earned', item: 'Streak Champion Badge', time: 'Yesterday', icon: '🏆' },
  { id: 3, action: 'Started', item: 'Nutrition Basics Module', time: '2 days ago', icon: '🥗' },
  { id: 4, action: 'Completed', item: 'Core Strengthening Workout', time: '3 days ago', icon: '💪' },
  { id: 5, action: 'Achieved', item: '3-Day Streak Milestone', time: '3 days ago', icon: '🔥' }
];

export default function ProgressPage() {
  const [activity] = useState(recentActivity);
  const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Progress Overview
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Your wellness journey at a glance
        </p>
      </div>

      {/* Metric Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {metrics.map((metric) => (
          <div
            key={metric.id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              top: '16px', 
              right: '16px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `${metric.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              {metric.icon}
            </div>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px 0' }}>
              {metric.label}
            </p>
            <p style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>
              {metric.value}
            </p>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              {metric.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '24px' }}>
          Weekly Activity
        </h2>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          height: '200px',
          padding: '0 20px',
          gap: '12px'
        }}>
          {weeklyActivity.map((day, index) => (
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
                  maxWidth: '60px',
                  height: day.minutes > 0 ? `${(day.minutes / maxMinutes) * 120}px` : '4px',
                  background: day.sessions > 0 
                    ? 'linear-gradient(180deg, #6366f1 0%, #818cf8 100%)' 
                    : '#e2e8f0',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.3s ease',
                  minHeight: '4px'
                }}
              />
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1e293b',
                marginTop: '12px'
              }}>
                {day.day}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '24px', 
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#6366f1' }} />
            <span style={{ fontSize: '13px', color: '#64748b' }}>Sessions Completed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#e2e8f0' }} />
            <span style={{ fontSize: '13px', color: '#64748b' }}>No Activity</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>
          Recent Activity
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activity.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  {item.action}
                </p>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                  {item.item}
                </p>
              </div>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
