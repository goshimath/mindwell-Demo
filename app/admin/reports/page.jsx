'use client';

import { useState } from 'react';

const reportCards = [
  {
    id: 1,
    title: 'Weekly Wellness Summary',
    description: 'Overview of student wellbeing metrics, session completions, and engagement levels for the week.',
    lastGenerated: '28 Jan 2025',
    icon: '📊',
    color: '#6366f1',
    size: '2.4 MB'
  },
  {
    id: 2,
    title: 'Student Engagement Report',
    description: 'Detailed analysis of student participation patterns, active hours, and completion rates.',
    lastGenerated: '27 Jan 2025',
    icon: '👥',
    color: '#10b981',
    size: '1.8 MB'
  },
  {
    id: 3,
    title: 'Pillar Performance Report',
    description: 'Performance breakdown across Emotional Health, Nutrition, S&C, and Physiotherapy pillars.',
    lastGenerated: '26 Jan 2025',
    icon: '📈',
    color: '#f59e0b',
    size: '3.1 MB'
  },
  {
    id: 4,
    title: 'Attendance & Participation',
    description: 'Daily attendance tracking and session participation metrics for all enrolled students.',
    lastGenerated: '28 Jan 2025',
    icon: '📋',
    color: '#8b5cf6',
    size: '1.5 MB'
  }
];

const recentReports = [
  { id: 1, name: 'Weekly Wellness Summary', date: '28 Jan 2025', generatedBy: 'System (Auto)', status: 'Ready', size: '2.4 MB' },
  { id: 2, name: 'Student Engagement Report', date: '27 Jan 2025', generatedBy: 'Priya Mehta', status: 'Ready', size: '1.8 MB' },
  { id: 3, name: 'Pillar Performance Report', date: '26 Jan 2025', generatedBy: 'System (Auto)', status: 'Ready', size: '3.1 MB' },
  { id: 4, name: 'Attendance & Participation', date: '28 Jan 2025', generatedBy: 'System (Auto)', status: 'Ready', size: '1.5 MB' },
  { id: 5, name: 'Monthly Progress Digest', date: '25 Jan 2025', generatedBy: 'Rahul Singh', status: 'Processing', size: '—' }
];

export default function ReportsPage() {
  const [reports] = useState(reportCards);
  const [recent] = useState(recentReports);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Reports & Analytics
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Generate and download comprehensive wellness reports
        </p>
      </div>

      {/* Report Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {reports.map((report) => (
          <div
            key={report.id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `${report.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0
              }}>
                {report.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', margin: '0 0 6px 0' }}>
                  {report.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                  {report.description}
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
              <div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 2px 0' }}>Last Generated</p>
                <p style={{ fontSize: '14px', color: '#475569', fontWeight: '500', margin: 0 }}>
                  {report.lastGenerated}
                </p>
              </div>
              <button
                style={{
                  background: report.color,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
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
                <span>📄</span>
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports Table */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
            Recent Reports
          </h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ 
                  padding: '14px 20px', 
                  textAlign: 'left', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Report Name
                </th>
                <th style={{ 
                  padding: '14px 20px', 
                  textAlign: 'left', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Date
                </th>
                <th style={{ 
                  padding: '14px 20px', 
                  textAlign: 'left', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Generated By
                </th>
                <th style={{ 
                  padding: '14px 20px', 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Status
                </th>
                <th style={{ 
                  padding: '14px 20px', 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Size
                </th>
                <th style={{ 
                  padding: '14px 20px', 
                  textAlign: 'center', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recent.map((report) => (
                <tr 
                  key={report.id} 
                  style={{ borderBottom: '1px solid #e2e8f0' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      {report.name}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#475569' }}>
                    {report.date}
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#475569' }}>
                    {report.generatedBy}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: report.status === 'Ready' ? '#dcfce7' : '#fef3c7',
                      color: report.status === 'Ready' ? '#166534' : '#92400e'
                    }}>
                      {report.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    {report.size}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    {report.status === 'Ready' ? (
                      <button
                        style={{
                          background: 'none',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '13px',
                          color: '#6366f1',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        Download
                      </button>
                    ) : (
                      <span style={{ fontSize: '13px', color: '#94a3b8' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
