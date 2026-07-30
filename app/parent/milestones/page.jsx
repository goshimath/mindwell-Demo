'use client';

import { useState } from 'react';

const milestones = [
  {
    id: 1,
    title: 'First Session Completed',
    icon: '🎉',
    date: '15 Jan 2025',
    description: 'Aarav completed his first wellbeing session, starting the journey to better health.',
    color: '#10b981'
  },
  {
    id: 2,
    title: '3-Day Streak',
    icon: '🔥',
    date: '18 Jan 2025',
    description: 'Maintained activity for 3 consecutive days, showing great consistency.',
    color: '#f59e0b'
  },
  {
    id: 3,
    title: 'Emotional Health Module 1 Done',
    icon: '🧠',
    date: '22 Jan 2025',
    description: 'Completed the first module on understanding emotions and self-awareness.',
    color: '#6366f1'
  },
  {
    id: 4,
    title: 'Nutrition Basics Completed',
    icon: '🥗',
    date: '25 Jan 2025',
    description: 'Finished learning about balanced diets and healthy eating habits.',
    color: '#10b981'
  },
  {
    id: 5,
    title: '5 Badges Earned',
    icon: '🏆',
    date: '28 Jan 2025',
    description: 'Collected 5 achievement badges through consistent participation.',
    color: '#8b5cf6'
  },
  {
    id: 6,
    title: '10 Sessions Milestone',
    icon: '📚',
    date: '30 Jan 2025',
    description: 'Completed 10 total sessions across all wellbeing pillars.',
    color: '#3b82f6'
  },
  {
    id: 7,
    title: 'S&C Champion',
    icon: '💪',
    date: '2 Feb 2025',
    description: 'Achieved champion status in Strength & Conditioning pillar.',
    color: '#f59e0b'
  },
  {
    id: 8,
    title: 'Wellness Score 70%',
    icon: '⭐',
    date: '5 Feb 2025',
    description: 'Reached an overall wellness score of 70%, showing significant progress.',
    color: '#ec4899'
  }
];

export default function MilestonesPage() {
  const [allMilestones] = useState(milestones);

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Aarav Milestones
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Track your child key achievements and progress moments
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '40px' }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '18px',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)'
        }} />

        {/* Milestones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {allMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              style={{
                position: 'relative',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start'
              }}
            >
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '20px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: milestone.color,
                border: '3px solid #fff',
                boxShadow: `0 0 0 3px ${milestone.color}30`,
                zIndex: 1
              }} />

              {/* Milestone Card */}
              <div style={{
                flex: 1,
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${milestone.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0
                  }}>
                    {milestone.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                        {milestone.title}
                      </h3>
                      <span style={{ 
                        fontSize: '13px', 
                        color: '#64748b',
                        background: '#f8fafc',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        flexShrink: 0
                      }}>
                        {milestone.date}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div style={{
        marginTop: '40px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderRadius: '12px',
        padding: '24px',
        color: '#fff',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 8px 0' }}>
          Total Milestones Achieved
        </h3>
        <p style={{ fontSize: '48px', fontWeight: '700', margin: 0 }}>
          {allMilestones.length}
        </p>
        <p style={{ fontSize: '14px', opacity: 0.8, margin: '8px 0 0 0' }}>
          Keep up the great progress! 🎯
        </p>
      </div>
    </div>
  );
}
