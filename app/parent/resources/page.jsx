'use client';

import { useState } from 'react';

const resources = [
  {
    id: 1,
    title: "Understanding Your Child's Emotions",
    type: 'Guide',
    icon: '📖',
    color: '#6366f1',
    description: 'A comprehensive guide to recognizing and responding to your child emotional needs at different ages.',
    action: 'Read Guide',
    readTime: '15 min read'
  },
  {
    id: 2,
    title: 'Screen Time Balance',
    type: 'Video',
    icon: '🎬',
    color: '#ef4444',
    description: 'Expert tips on setting healthy screen time boundaries while keeping your child engaged.',
    action: 'Watch Video',
    duration: '8 min'
  },
  {
    id: 3,
    title: 'Nutrition Checklist',
    type: 'Download',
    icon: '📋',
    color: '#10b981',
    description: 'Printable weekly nutrition checklist to track your child balanced diet and healthy eating habits.',
    action: 'Download PDF',
    size: '1.2 MB'
  },
  {
    id: 4,
    title: 'Sleep Hygiene Tips',
    type: 'Article',
    icon: '😴',
    color: '#8b5cf6',
    description: 'Evidence-based strategies to improve your child sleep quality and establish consistent bedtime routines.',
    action: 'Read Article',
    readTime: '10 min read'
  },
  {
    id: 5,
    title: 'Physical Activity Guide',
    type: 'PDF',
    icon: '🏃',
    color: '#f59e0b',
    description: 'Age-appropriate physical activities and exercises to keep your child active and healthy.',
    action: 'Download PDF',
    size: '2.5 MB'
  },
  {
    id: 6,
    title: 'Managing Exam Stress',
    type: 'Audio',
    icon: '🎧',
    color: '#ec4899',
    description: 'Calming audio guide with breathing exercises and stress management techniques for students.',
    action: 'Listen Now',
    duration: '12 min'
  }
];

export default function ResourcesPage() {
  const [allResources] = useState(resources);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Parent Resources
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Helpful guides and tools to support your child wellbeing journey
        </p>
      </div>

      {/* Resource Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
        gap: '24px' 
      }}>
        {allResources.map((resource) => (
          <div
            key={resource.id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s'
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
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `${resource.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0
              }}>
                {resource.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'inline-block',
                  fontSize: '11px', 
                  fontWeight: '600', 
                  color: resource.color,
                  background: `${resource.color}15`,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {resource.type}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', margin: '0 0 8px 0' }}>
                  {resource.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
                  {resource.description}
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: '1px solid #e2e8f0',
              marginTop: 'auto'
            }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                {resource.readTime || resource.duration || resource.size}
              </span>
              <button
                style={{
                  background: resource.color,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                {resource.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
