'use client';

import { useState } from 'react';

const studentsData = [
  { id: 1, name: 'Aarav Patel', grade: '10', class: 'A', wellbeingScore: 85, sessionsCompleted: '6/8', status: 'On Track' },
  { id: 2, name: 'Priya Sharma', grade: '9', class: 'B', wellbeingScore: 72, sessionsCompleted: '5/8', status: 'On Track' },
  { id: 3, name: 'Rohan Gupta', grade: '10', class: 'A', wellbeingScore: 45, sessionsCompleted: '3/8', status: 'Review' },
  { id: 4, name: 'Ananya Singh', grade: '11', class: 'A', wellbeingScore: 91, sessionsCompleted: '7/8', status: 'On Track' },
  { id: 5, name: 'Arjun Kumar', grade: '9', class: 'C', wellbeingScore: 38, sessionsCompleted: '2/8', status: 'Behind' },
  { id: 6, name: 'Diya Reddy', grade: '10', class: 'B', wellbeingScore: 67, sessionsCompleted: '4/8', status: 'On Track' },
  { id: 7, name: 'Kavya Nair', grade: '11', class: 'B', wellbeingScore: 52, sessionsCompleted: '3/8', status: 'Review' },
  { id: 8, name: 'Vivaan Joshi', grade: '9', class: 'A', wellbeingScore: 78, sessionsCompleted: '5/8', status: 'On Track' },
  { id: 9, name: 'Ishita Desai', grade: '10', class: 'C', wellbeingScore: 41, sessionsCompleted: '2/8', status: 'Behind' },
  { id: 10, name: 'Aditya Verma', grade: '11', class: 'A', wellbeingScore: 88, sessionsCompleted: '7/8', status: 'On Track' }
];

export default function StudentsPage() {
  const [students] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return { bg: '#dcfce7', text: '#166534' };
      case 'Review': return { bg: '#fef3c7', text: '#92400e' };
      case 'Behind': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
            Student Roster
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Manage and track student wellbeing progress
          </p>
        </div>
        <div style={{ 
          background: '#f8fafc', 
          padding: '8px 16px', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <span style={{ fontSize: '14px', color: '#64748b' }}>
            Total Students: <strong style={{ color: '#1e293b' }}>{students.length}</strong>
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span style={{ fontSize: '20px', color: '#94a3b8' }}>🔍</span>
        <input
          type="text"
          placeholder="Search by name or class..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            color: '#1e293b',
            background: 'transparent'
          }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '13px',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Students Table */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'left', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  background: '#f8fafc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Student Name
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  background: '#f8fafc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Grade
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  background: '#f8fafc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Class
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  background: '#f8fafc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Wellbeing Score
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  background: '#f8fafc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Sessions
                </th>
                <th style={{ 
                  padding: '16px 20px', 
                  textAlign: 'center', 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#64748b',
                  background: '#f8fafc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const statusColors = getStatusColor(student.status);
                return (
                  <tr 
                    key={student.id} 
                    style={{ 
                      borderBottom: '1px solid #e2e8f0',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: `linear-gradient(135deg, ${getScoreColor(student.wellbeingScore)}20, ${getScoreColor(student.wellbeingScore)}40)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: getScoreColor(student.wellbeingScore)
                        }}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: '500', color: '#1e293b' }}>
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#475569' }}>
                      {student.grade}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#475569' }}>
                      {student.class}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <div style={{
                          width: '48px',
                          height: '8px',
                          background: '#e2e8f0',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${student.wellbeingScore}%`,
                            background: getScoreColor(student.wellbeingScore),
                            borderRadius: '4px'
                          }} />
                        </div>
                        <span style={{ 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          color: getScoreColor(student.wellbeingScore) 
                        }}>
                          {student.wellbeingScore}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#475569' }}>
                      {student.sessionsCompleted}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: statusColors.bg,
                        color: statusColors.text
                      }}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredStudents.length === 0 && (
          <div style={{ 
            padding: '60px 20px', 
            textAlign: 'center', 
            color: '#64748b' 
          }}>
            <p style={{ fontSize: '16px', margin: 0 }}>No students found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
