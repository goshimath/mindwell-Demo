'use client';

import { useState } from 'react';

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: '₹2,000',
    period: '/month',
    studentLimit: '200 students',
    features: [
      'Up to 200 students',
      'Basic wellness modules',
      'Email support',
      'Monthly reports',
      '5 admin users'
    ],
    color: '#64748b',
    popular: false
  },
  {
    id: 2,
    name: 'Professional',
    price: '₹5,000',
    period: '/month',
    studentLimit: '1,000 students',
    features: [
      'Up to 1,000 students',
      'All wellness modules',
      'Priority support',
      'Weekly reports',
      '25 admin users',
      'Parent portal access',
      'Custom branding'
    ],
    color: '#6366f1',
    popular: true
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '₹10,000',
    period: '/month',
    studentLimit: 'Unlimited',
    features: [
      'Unlimited students',
      'All wellness modules',
      'Dedicated support',
      'Real-time analytics',
      'Unlimited admin users',
      'Parent portal access',
      'Custom branding',
      'API access',
      'Custom integrations'
    ],
    color: '#10b981',
    popular: false
  }
];

const activeSubscriptions = [
  { id: 1, school: 'Delhi Public School, R.K. Puram', plan: 'Professional', students: 450, amount: '₹37,500', nextBilling: '15 Mar 2025', status: 'Active' },
  { id: 2, school: 'Modern School, Barakhamba Road', plan: 'Professional', students: 380, amount: '₹37,500', nextBilling: '1 Apr 2025', status: 'Active' },
  { id: 3, school: 'Lotus Valley School, Noida', plan: 'Enterprise', students: 520, amount: '₹50,000', nextBilling: '30 Jun 2025', status: 'Active' },
  { id: 4, school: 'Springdales School, Dhaula Kuan', plan: 'Basic', students: 180, amount: '₹15,000', nextBilling: '1 May 2025', status: 'Active' },
  { id: 5, school: 'Bharti Vidya Bhavan', plan: 'Basic', students: 165, amount: '₹12,400', nextBilling: '20 Mar 2025', status: 'Active' }
];

export default function SubscriptionsPage() {
  const [allPlans] = useState(plans);
  const [subscriptions] = useState(activeSubscriptions);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Subscription Plans
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Manage subscription tiers and view active subscriptions
        </p>
      </div>

      {/* Plan Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px', 
        marginBottom: '48px' 
      }}>
        {allPlans.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: '#fff',
              border: plan.popular ? `2px solid ${plan.color}` : '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: plan.color,
                color: '#fff',
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 12px',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Most Popular
              </div>
            )}
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1e293b', margin: '0 0 12px 0' }}>
                {plan.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '36px', fontWeight: '700', color: plan.color }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: '16px', color: '#64748b' }}>
                  {plan.period}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '8px 0 0 0' }}>
                {plan.studentLimit}
              </p>
            </div>
            
            <div style={{ 
              borderTop: '1px solid #e2e8f0', 
              paddingTop: '20px',
              marginBottom: '24px'
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#475569'
                  }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              style={{
                width: '100%',
                background: plan.popular ? plan.color : '#fff',
                color: plan.popular ? '#fff' : plan.color,
                border: plan.popular ? 'none' : `2px solid ${plan.color}`,
                borderRadius: '8px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {plan.popular ? 'Get Started' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Active Subscriptions Table */}
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
            Active Subscriptions
          </h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                {['School', 'Plan', 'Students', 'Amount', 'Next Billing', 'Status'].map((header) => (
                  <th key={header} style={{ 
                    padding: '14px 20px', 
                    textAlign: header === 'School' ? 'left' : 'center',
                    fontSize: '12px', 
                    fontWeight: '600', 
                    color: '#64748b',
                    background: '#f8fafc',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr 
                  key={sub.id} 
                  style={{ borderBottom: '1px solid #e2e8f0' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      {sub.school}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: sub.plan === 'Enterprise' ? '#dcfce7' : sub.plan === 'Professional' ? '#e0e7ff' : '#f1f5f9',
                      color: sub.plan === 'Enterprise' ? '#166534' : sub.plan === 'Professional' ? '#3730a3' : '#475569'
                    }}>
                      {sub.plan}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#475569' }}>
                    {sub.students}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                    {sub.amount}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    {sub.nextBilling}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: '#dcfce7',
                      color: '#166534'
                    }}>
                      {sub.status}
                    </span>
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
