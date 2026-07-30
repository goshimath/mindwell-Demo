'use client';

import { useState } from 'react';

const schoolsData = [
  { id: 1, name: 'Delhi Public School, R.K. Puram', status: 'Active', students: 450, usage: 78, mrr: '₹37,500', renewalDate: '15 Apr 2025' },
  { id: 2, name: 'Modern School, Barakhamba Road', status: 'Active', students: 380, usage: 85, mrr: '₹37,500', renewalDate: '1 Apr 2025' },
  { id: 3, name: 'The Shri Ram School, Moulsari', status: 'Trial', students: 120, usage: 45, mrr: '₹0', renewalDate: '28 Feb 2025' },
  { id: 4, name: 'Lotus Valley School, Noida', status: 'Active', students: 520, usage: 72, mrr: '₹50,000', renewalDate: '30 Jun 2025' },
  { id: 5, name: 'Amity International School', status: 'At Risk', students: 280, usage: 32, mrr: '₹37,500', renewalDate: '15 Mar 2025' },
  { id: 6, name: 'Springdales School, Dhaula Kuan', status: 'Active', students: 410, usage: 68, mrr: '₹37,500', renewalDate: '1 May 2025' },
  { id: 7, name: 'Vasant Valley School', status: 'Trial', students: 85, usage: 28, mrr: '₹0', renewalDate: '10 Mar 2025' },
  { id: 8, name: 'Bharti Vidya Bhavan', status: 'Active', students: 340, usage: 62, mrr: '₹37,500', renewalDate: '20 May 2025' }
];

export default function SchoolsPage() {
  const [schools] = useState(schoolsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredSchools = schools.filter(school =>
    (school.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || school.status === statusFilter)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return { bg: '#dcfce7', text: '#166534' };
      case 'Trial': return { bg: '#e0e7ff', text: '#3730a3' };
      case 'At Risk': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const getUsageColor = (usage) => {
    if (usage >= 70) return '#10b981';
    if (usage >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
            Schools Management
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Manage all registered schools on the platform
          </p>
        </div>
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
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          <span>➕</span>
          Add School
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '200px' }}>
          <span style={{ fontSize: '20px', color: '#94a3b8' }}>🔍</span>
          <input
            type="text"
            placeholder="Search schools..."
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
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Active', 'Trial', 'At Risk'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                background: statusFilter === status ? '#6366f1' : '#f1f5f9',
                color: statusFilter === status ? '#fff' : '#64748b',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Schools Table */}
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
                {['School Name', 'Status', 'Students', 'Usage', 'MRR', 'Renewal Date'].map((header) => (
                  <th key={header} style={{ 
                    padding: '16px 20px', 
                    textAlign: header === 'School Name' ? 'left' : 'center',
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
              {filteredSchools.map((school) => {
                const statusColors = getStatusColor(school.status);
                return (
                  <tr 
                    key={school.id} 
                    style={{ borderBottom: '1px solid #e2e8f0' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px'
                        }}>
                          🏫
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                          {school.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: statusColors.bg,
                        color: statusColors.text
                      }}>
                        {school.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#475569', fontWeight: '500' }}>
                      {school.students.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <div style={{
                          width: '60px',
                          height: '6px',
                          background: '#e2e8f0',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${school.usage}%`,
                            background: getUsageColor(school.usage),
                            borderRadius: '3px'
                          }} />
                        </div>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>
                          {school.usage}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                      {school.mrr}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                      {school.renewalDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredSchools.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
            <p style={{ fontSize: '16px', margin: 0 }}>No schools found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
