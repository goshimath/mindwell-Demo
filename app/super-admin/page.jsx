'use client';

import { useState, useEffect } from 'react';
import { DashboardSkeleton } from '@/components/Skeleton';
import Toast from '@/components/Toast';
import {
  superAdminSchools,
  superAdminMetrics,
  superAdminSubscriptions,
  superAdminRenewals,
  superAdminRevenue,
} from '@/lib/data';
import styles from '@/styles/superadmin.module.css';

const ITEMS_PER_PAGE = 10;

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const totalPages = Math.ceil(superAdminSchools.length / ITEMS_PER_PAGE);
  const paginatedSchools = superAdminSchools.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const statusColors = {
    active: '#22C55E',
    trial: '#3B82F6',
    'at-risk': '#EF4444',
    renewal: '#F59E0B',
  };

  const statusLabels = {
    active: 'Active',
    trial: 'Trial',
    'at-risk': 'At Risk',
    renewal: 'Renewal',
  };

  const healthColors = { green: '#22C55E', amber: '#F59E0B', red: '#EF4444' };

  // Revenue chart
  const maxMrr = Math.max(...superAdminRevenue.map((r) => r.mrr));
  const chartHeight = 160;

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Super Admin Dashboard</h1>
          <p>Platform overview — all schools and subscriptions</p>
        </div>
        <button className={styles.exportBtn} onClick={() => setToast('Report exported')}>
          📥 Export
        </button>
      </div>

      {/* KPI cards */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon}>🏫</span>
          <div>
            <span className={styles.kpiValue}>{superAdminMetrics.schoolsActive}</span>
            <span className={styles.kpiLabel}>Schools Active</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon}>💰</span>
          <div>
            <span className={styles.kpiValue}>₹{(superAdminMetrics.mrr / 1000).toFixed(1)}K</span>
            <span className={styles.kpiLabel}>MRR</span>
            <span className={styles.kpiTrend}>↑ {superAdminMetrics.mrrGrowth}%</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon}>📊</span>
          <div>
            <span className={styles.kpiValue}>{superAdminMetrics.retention}%</span>
            <span className={styles.kpiLabel}>Retention</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiIcon}>🔄</span>
          <div>
            <span className={styles.kpiValue}>{superAdminMetrics.renewalsThisMonth}</span>
            <span className={styles.kpiLabel}>Renewals This Month</span>
          </div>
        </div>
      </div>

      {/* School Health table */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>School Health</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>School</th>
                <th>Status</th>
                <th>Students</th>
                <th>Usage</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSchools.map((school) => (
                <tr key={school.id}>
                  <td className={styles.schoolName}>{school.name}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ color: statusColors[school.status], background: `${statusColors[school.status]}12` }}>
                      {statusLabels[school.status]}
                    </span>
                  </td>
                  <td>{school.students.toLocaleString()}</td>
                  <td>
                    <div className={styles.usageCell}>
                      <div className={styles.usageBar}>
                        <div className={styles.usageFill} style={{ width: `${school.usage}%`, background: healthColors[school.health] }} />
                      </div>
                      <span>{school.usage}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.healthDot} style={{ background: healthColors[school.health] }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>← Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next →</button>
          </div>
        )}
      </div>

      {/* Bottom row: Subscription + Renewal Pipeline */}
      <div className={styles.bottomGrid}>
        {/* Subscription Breakdown */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Subscription Breakdown</h2>
          </div>
          <div className={styles.subList}>
            {Object.entries(superAdminSubscriptions).map(([key, count]) => {
              const colors = { active: '#22C55E', trial: '#3B82F6', atRisk: '#EF4444', renewal: '#F59E0B', churned: '#6B7280' };
              const labels = { active: 'Active', trial: 'Trial', atRisk: 'At Risk', renewal: 'Renewal', churned: 'Churned' };
              return (
                <div key={key} className={styles.subRow}>
                  <span className={styles.subDot} style={{ background: colors[key] }} />
                  <span className={styles.subLabel}>{labels[key]}</span>
                  <span className={styles.subCount}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Renewal Pipeline */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Renewal Pipeline</h2>
          </div>
          <div className={styles.renewalList}>
            {superAdminRenewals.map((r) => (
              <div key={r.month} className={styles.renewalRow}>
                <span className={styles.renewalMonth}>{r.month}</span>
                <div className={styles.renewalBars}>
                  {r.confirmed > 0 && <span className={styles.renewalBar} style={{ background: '#22C55E', width: `${r.confirmed * 30}px` }}>{r.confirmed}</span>}
                  {r.atRisk > 0 && <span className={styles.renewalBar} style={{ background: '#EF4444', width: `${r.atRisk * 30}px` }}>{r.atRisk}</span>}
                  {r.pending > 0 && <span className={styles.renewalBar} style={{ background: '#F59E0B', width: `${r.pending * 30}px` }}>{r.pending}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Revenue Trend</h2>
        </div>
        <div className={styles.revenueSection}>
          <div className={styles.chartContainer}>
            <svg viewBox={`0 0 700 ${chartHeight + 40}`} className={styles.chart}>
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
                <line key={pct} x1="40" y1={chartHeight - pct * chartHeight + 20} x2="680" y2={chartHeight - pct * chartHeight + 20}
                  stroke="#e5e7eb" strokeWidth="1" />
              ))}
              {/* Line */}
              <polyline
                fill="none"
                stroke="#2B5EA7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={superAdminRevenue.map((r, i) => {
                  const x = 40 + (i / (superAdminRevenue.length - 1)) * 640;
                  const y = chartHeight - (r.mrr / maxMrr) * chartHeight + 20;
                  return `${x},${y}`;
                }).join(' ')}
              />
              {/* Dots */}
              {superAdminRevenue.map((r, i) => {
                const x = 40 + (i / (superAdminRevenue.length - 1)) * 640;
                const y = chartHeight - (r.mrr / maxMrr) * chartHeight + 20;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="5" fill="#2B5EA7" stroke="white" strokeWidth="2" />
                    <text x={x} y={chartHeight + 35} textAnchor="middle" fontSize="10" fill="#6B7280">{r.month}</text>
                    <text x={x} y={y - 12} textAnchor="middle" fontSize="9" fill="#6B7280">₹{(r.mrr / 1000).toFixed(0)}K</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className={styles.revenueStats}>
            <div className={styles.revStat}>
              <span className={styles.revStatValue}>₹{(superAdminMetrics.arr / 100000).toFixed(1)}L</span>
              <span className={styles.revStatLabel}>ARR</span>
            </div>
            <div className={styles.revStat}>
              <span className={styles.revStatValue}>↑ {superAdminMetrics.mrrGrowth}%</span>
              <span className={styles.revStatLabel}>Growth</span>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
