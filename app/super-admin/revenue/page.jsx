'use client';

import { useState } from 'react';

const revenueMetrics = [
  { label: 'MRR (Monthly Recurring Revenue)', value: '₹148.4K', icon: '💰', color: '#10b981', trend: '+12.5% from last month' },
  { label: 'ARR (Annual Recurring Revenue)', value: '₹17.8L', icon: '📈', color: '#6366f1', trend: '+15.2% YoY growth' },
  { label: 'Growth Rate', value: '12.5%', icon: '🚀', color: '#f59e0b', trend: '+2.3% vs previous month' }
];

const mrrHistory = [
  { month: 'Aug', value: 95000 },
  { month: 'Sep', value: 105000 },
  { month: 'Oct', value: 118000 },
  { month: 'Nov', value: 125000 },
  { month: 'Dec', value: 132000 },
  { month: 'Jan', value: 140000 },
  { month: 'Feb', value: 148400 }
];

const revenueBySchool = [
  { id: 1, name: 'Delhi Public School, R.K. Puram', plan: 'Professional', revenue: '₹37,500', percentage: 25.3 },
  { id: 2, name: 'Modern School, Barakhamba Road', plan: 'Professional', revenue: '₹37,500', percentage: 25.3 },
  { id: 3, name: 'Lotus Valley School, Noida', plan: 'Enterprise', revenue: '₹50,000', percentage: 33.7 },
  { id: 4, name: 'Springdales School, Dhaula Kuan', plan: 'Basic', revenue: '₹15,000', percentage: 10.1 },
  { id: 5, name: 'Bharti Vidya Bhavan', plan: 'Basic', revenue: '₹12,400', percentage: 8.4 },
  { id: 6, name: 'Amity International School', plan: 'Professional', revenue: '₹0', percentage: 0 },
  { id: 7, name: 'The Shri Ram School, Moulsari', plan: 'Trial', revenue: '₹0', percentage: 0 },
  { id: 8, name: 'Vasant Valley School', plan: 'Trial', revenue: '₹0', percentage: 0 }
];

export default function RevenuePage() {
  const [metrics] = useState(revenueMetrics);
  const [history] = useState(mrrHistory);
  const [revenue] = useState(revenueBySchool);

  // SVG Chart calculations
  const chartWidth = 800;
  const chartHeight = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;
  
  const maxValue = Math.max(...history.map(h => h.value));
  const minValue = 0;
  
  const points = history.map((h, i) => ({
    x: padding.left + (i / (history.length - 1)) * graphWidth,
    y: padding.top + graphHeight - ((h.value - minValue) / (maxValue - minValue)) * graphHeight
  }));
  
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + graphHeight} L ${points[0].x} ${padding.top + graphHeight} Z`;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Revenue Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Track platform revenue and financial metrics
        </p>
      </div>

      {/* Revenue Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `${metric.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                {metric.icon}
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px 0' }}>
                  {metric.label}
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>
                  {metric.value}
                </p>
                <p style={{ fontSize: '13px', color: '#10b981', margin: 0 }}>
                  {metric.trend}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MRR Growth Chart */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
            MRR Growth (7 Months)
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Aug 2024 - Feb 2025
          </span>
        </div>
        
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            style={{ width: '100%', height: 'auto', minWidth: '500px' }}
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={padding.top + graphHeight * (1 - tick)}
                  x2={chartWidth - padding.right}
                  y2={padding.top + graphHeight * (1 - tick)}
                  stroke="#e2e8f0"
                  strokeDasharray="4"
                />
                <text
                  x={padding.left - 10}
                  y={padding.top + graphHeight * (1 - tick) + 4}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="11"
                >
                  {tick === 0 ? '0' : `${((minValue + (maxValue - minValue) * tick) / 1000).toFixed(0)}K`}
                </text>
              </g>
            ))}
            
            {/* Area fill */}
            <path
              d={areaPath}
              fill="url(#gradient)"
              opacity="0.3"
            />
            
            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {points.map((point, i) => (
              <g key={i}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="#fff"
                  stroke="#6366f1"
                  strokeWidth="3"
                />
                <text
                  x={point.x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="12"
                >
                  {history[i].month}
                </text>
              </g>
            ))}
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Revenue by School Table */}
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
            Revenue by School
          </h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                {['#', 'School', 'Plan', 'Monthly Revenue', 'Share'].map((header) => (
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
              {revenue.map((item, index) => (
                <tr 
                  key={item.id} 
                  style={{ borderBottom: '1px solid #e2e8f0' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}>
                        🏫
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: item.plan === 'Enterprise' ? '#dcfce7' : item.plan === 'Professional' ? '#e0e7ff' : item.plan === 'Trial' ? '#fef3c7' : '#f1f5f9',
                      color: item.plan === 'Enterprise' ? '#166534' : item.plan === 'Professional' ? '#3730a3' : item.plan === 'Trial' ? '#92400e' : '#475569'
                    }}>
                      {item.plan}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '16px 20px', 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: item.revenue !== '₹0' ? '#1e293b' : '#94a3b8'
                  }}>
                    {item.revenue}
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
                          width: `${item.percentage}%`,
                          background: item.percentage > 20 ? '#10b981' : item.percentage > 0 ? '#f59e0b' : '#e2e8f0',
                          borderRadius: '3px'
                        }} />
                      </div>
                      <span style={{ fontSize: '13px', color: '#64748b', minWidth: '40px' }}>
                        {item.percentage}%
                      </span>
                    </div>
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
