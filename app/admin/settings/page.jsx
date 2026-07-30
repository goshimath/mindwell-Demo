'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [schoolProfile, setSchoolProfile] = useState({
    name: 'Delhi Public School, R.K. Puram',
    address: 'Sector 12, R.K. Puram, New Delhi - 110022',
    contact: '+91 11 2671 3265',
    email: 'admin@dpsrkp.edu.in'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true
  });

  const [academicYear, setAcademicYear] = useState('2024-25');

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          School Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Manage your school profile and preferences
        </p>
      </div>

      {/* School Profile */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '24px' }}>🏫</span>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
            School Profile
          </h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#475569',
              marginBottom: '8px'
            }}>
              School Name
            </label>
            <input
              type="text"
              value={schoolProfile.name}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, name: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '15px',
                color: '#1e293b',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#475569',
              marginBottom: '8px'
            }}>
              Address
            </label>
            <textarea
              value={schoolProfile.address}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, address: e.target.value })}
              rows={2}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '15px',
                color: '#1e293b',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#475569',
                marginBottom: '8px'
              }}>
                Contact Phone
              </label>
              <input
                type="tel"
                value={schoolProfile.contact}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, contact: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  color: '#1e293b',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#475569',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={schoolProfile.email}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  color: '#1e293b',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button
              style={{
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '24px' }}>🔔</span>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
            Notification Settings
          </h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { key: 'email', label: 'Email Notifications', description: 'Receive updates and reports via email', icon: '📧' },
            { key: 'sms', label: 'SMS Notifications', description: 'Get important alerts via SMS', icon: '💬' },
            { key: 'whatsapp', label: 'WhatsApp Notifications', description: 'Connect with parents via WhatsApp', icon: '📱' }
          ].map((item) => (
            <div
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1e293b', margin: 0 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    {item.description}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => handleNotificationToggle(item.key)}
                style={{
                  width: '52px',
                  height: '28px',
                  borderRadius: '14px',
                  border: 'none',
                  padding: '2px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  background: notifications[item.key] ? '#6366f1' : '#cbd5e1'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '12px',
                  background: '#fff',
                  transition: 'transform 0.2s',
                  transform: notifications[item.key] ? 'translateX(24px)' : 'translateX(0)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Year */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '24px' }}>📅</span>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
            Academic Year
          </h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>
            Current Academic Year:
          </label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            style={{
              padding: '10px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '15px',
              color: '#1e293b',
              background: '#fff',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
          </select>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            (Start: Apr 2024 | End: Mar 2025)
          </span>
        </div>
      </div>

      {/* Data & Privacy */}
      <div style={{
        background: '#fff',
        border: '1px solid #fee2e2',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '24px' }}>🔒</span>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#991b1b', margin: 0 }}>
            Data & Privacy
          </h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            padding: '16px', 
            background: '#f8fafc', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#1e293b', margin: 0 }}>
                Export All Data
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                Download a complete copy of your school's data
              </p>
            </div>
            <button
              style={{
                background: '#fff',
                color: '#475569',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#6366f1';
                e.target.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.color = '#475569';
              }}
            >
              📥 Export Data
            </button>
          </div>
          
          <div style={{ 
            padding: '16px', 
            background: '#fef2f2', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#991b1b', margin: 0 }}>
                Delete Account
              </p>
              <p style={{ fontSize: '13px', color: '#b91c1c', margin: '4px 0 0 0' }}>
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              style={{
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              🗑️ Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
