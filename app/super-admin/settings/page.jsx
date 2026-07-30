'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [platformConfig, setPlatformConfig] = useState({
    name: 'WellnessHub',
    supportEmail: 'support@wellnesshub.in'
  });

  const [services, setServices] = useState({
    razorpay: { connected: true, status: 'Active', lastSync: '2 minutes ago' },
    sendgrid: { connected: true, status: 'Active', lastSync: '5 minutes ago' },
    twilio: { connected: true, status: 'Active', lastSync: '10 minutes ago' }
  });

  const [showDangerModal, setShowDangerModal] = useState(false);
  const [dangerAction, setDangerAction] = useState('');

  const handleDangerAction = (action) => {
    setDangerAction(action);
    setShowDangerModal(true);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Platform Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Configure platform-wide settings and integrations
        </p>
      </div>

      {/* Platform Config */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '24px' }}>⚙️</span>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
            Platform Configuration
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
              Platform Name
            </label>
            <input
              type="text"
              value={platformConfig.name}
              onChange={(e) => setPlatformConfig({ ...platformConfig, name: e.target.value })}
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
              Support Email
            </label>
            <input
              type="email"
              value={platformConfig.supportEmail}
              onChange={(e) => setPlatformConfig({ ...platformConfig, supportEmail: e.target.value })}
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
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Service Integrations */}
      {[
        { key: 'razorpay', name: 'Payment Gateway', service: 'Razorpay', icon: '💳', color: '#3b82f6' },
        { key: 'sendgrid', name: 'Email Service', service: 'SendGrid', icon: '📧', color: '#10b981' },
        { key: 'twilio', name: 'SMS Service', service: 'Twilio', icon: '💬', color: '#f59e0b' }
      ].map((item) => (
        <div
          key={item.key}
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `${item.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  {item.service}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: services[item.key].connected ? '#10b981' : '#ef4444'
                  }} />
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: services[item.key].connected ? '#10b981' : '#ef4444'
                  }}>
                    {services[item.key].status}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                  Last sync: {services[item.key].lastSync}
                </p>
              </div>
              
              <button
                style={{
                  background: services[item.key].connected ? '#f1f5f9' : item.color,
                  color: services[item.key].connected ? '#475569' : '#fff',
                  border: services[item.key].connected ? '1px solid #e2e8f0' : 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {services[item.key].connected ? 'Configure' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Danger Zone */}
      <div style={{
        background: '#fff',
        border: '2px solid #fee2e2',
        borderRadius: '12px',
        padding: '24px',
        marginTop: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#991b1b', margin: 0 }}>
            Danger Zone
          </h2>
        </div>
        
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
          These actions are irreversible. Please proceed with caution.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            padding: '16px', 
            background: '#fef2f2', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#991b1b', margin: '0 0 4px 0' }}>
                Reset Platform
              </p>
              <p style={{ fontSize: '13px', color: '#b91c1c', margin: 0 }}>
                Reset all platform settings to default values
              </p>
            </div>
            <button
              onClick={() => handleDangerAction('reset')}
              style={{
                background: '#fff',
                color: '#dc2626',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#fef2f2';
                e.target.style.borderColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff';
                e.target.style.borderColor = '#fecaca';
              }}
            >
              Reset Platform
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
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#991b1b', margin: '0 0 4px 0' }}>
                Delete All Data
              </p>
              <p style={{ fontSize: '13px', color: '#b91c1c', margin: 0 }}>
                Permanently delete all schools, students, and platform data
              </p>
            </div>
            <button
              onClick={() => handleDangerAction('delete')}
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
              🗑️ Delete All Data
            </button>
          </div>
        </div>
      </div>

      {/* Danger Modal Placeholder */}
      {showDangerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '48px' }}>⚠️</span>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: '16px 0 12px 0' }}>
              Are you sure?
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              This action cannot be undone. All data will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDangerModal(false)}
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDangerModal(false)}
                style={{
                  background: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Confirm {dangerAction === 'reset' ? 'Reset' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
