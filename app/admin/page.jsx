'use client';

import { useState, useMemo, useEffect } from 'react';
import KPICard from '@/components/KPICard';
import PillarBadge from '@/components/PillarBadge';
import ProgressBar from '@/components/ProgressBar';
import ActivityItem from '@/components/ActivityItem';
import { DashboardSkeleton } from '@/components/Skeleton';
import Toast from '@/components/Toast';
import { students, sessions, pillars, pillarColors, recentActivity, getStatus } from '@/lib/data';
import styles from '@/styles/admin.module.css';

function buildPillarStats() {
  return pillars.map((p) => {
    const pillarSessions = sessions.filter((s) => s.pillar === p.id);
    const completed = pillarSessions.filter((s) => s.completed).length;
    const total = pillarSessions.length || 1;
    const completion = Math.round((completed / total) * 100);
    // Fake trends for demo
    const trends = ['↑ 12%', '↑ 8%', '↑ 15%', '↑ 5%'];
    const trendIdx = pillars.indexOf(p);
    return {
      ...p,
      sessions: total,
      completion,
      trend: trends[trendIdx],
      status: getStatus(completion),
    };
  });
}

function buildClassBreakdown() {
  const classMap = {};
  students.forEach((s) => {
    if (!classMap[s.className]) {
      classMap[s.className] = { name: `Grade ${s.className}`, students: 0, pillars: {} };
    }
    const cls = classMap[s.className];
    cls.students++;
    Object.entries(s.pillarProgress).forEach(([pid, pct]) => {
      if (!cls.pillars[pid]) cls.pillars[pid] = [];
      cls.pillars[pid].push(pct);
    });
  });

  return Object.values(classMap).map((cls) => {
    const pillarAvgs = {};
    Object.entries(cls.pillars).forEach(([pid, pcts]) => {
      pillarAvgs[pid] = Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length);
    });
    const allPcts = Object.values(pillarAvgs);
    const avg = allPcts.length ? Math.round(allPcts.reduce((a, b) => a + b, 0) / allPcts.length) : 0;
    return { ...cls, pillarAvgs, avg };
  });
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const pillarStats = useMemo(() => buildPillarStats(), []);
  const classBreakdown = useMemo(() => buildClassBreakdown(), []);
  const totalStudents = students.length;
  const totalSessions = sessions.filter((s) => s.completed).length;
  const avgWellness = Math.round(
    students.reduce((acc, s) => {
      const vals = Object.values(s.pillarProgress);
      return acc + vals.reduce((a, b) => a + b, 0) / vals.length;
    }, 0) / students.length
  );
  const activeThisWeek = Math.round(totalStudents * 0.72);

  const handleExport = () => setToast('Report exported successfully');

  if (loading) return <DashboardSkeleton />;

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Welcome back, iSpan School</h1>
          <p>Here&apos;s what&apos;s happening across your school today</p>
        </div>
        <button className={styles.exportBtn} onClick={handleExport}>
          📥 Export Report
        </button>
      </div>

      {/* KPI cards */}
      <div className={styles.kpiRow}>
        <KPICard icon="👥" label="Students Enrolled" value={totalStudents.toLocaleString()} trend="↑ 12% this week" />
        <KPICard icon="💚" label="Wellness Score" value={`${avgWellness}%`} trend="↑ 5% this week" variant="variant-green" />
        <KPICard icon="✅" label="Sessions Completed" value={totalSessions.toLocaleString()} trend="↑ 8% this week" variant="variant-blue" />
        <KPICard icon="🔥" label="Active This Week" value={activeThisWeek.toLocaleString()} trend={`${Math.round(activeThisWeek / totalStudents * 100)}% of enrolled`} variant="variant-gold" />
      </div>

      {/* Pillar Performance */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Pillar Performance</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pillar</th>
              <th>Sessions</th>
              <th>Completion</th>
              <th>Trend</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pillarStats.map((p) => (
              <tr key={p.id}>
                <td className={styles.pillarName}>
                  <span className={styles.pillarDot} style={{ background: p.color }} />
                  {p.icon} {p.label}
                </td>
                <td>{p.sessions}</td>
                <td>
                  <div className={styles.progressCell}>
                    <span>{p.completion}%</span>
                    <ProgressBar value={p.completion} color={p.color} />
                  </div>
                </td>
                <td className={styles.trend}>{p.trend}</td>
                <td><PillarBadge value={p.completion} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Class-wise Breakdown */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Class-wise Breakdown</h2>
          <select className={styles.filter}>
            <option>All Grades</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
          </select>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Class</th>
                <th>Students</th>
                {pillars.map((p) => (
                  <th key={p.id}>
                    <span className={styles.thPillar}>
                      <span className={styles.thDot} style={{ background: p.color }} />
                      {p.label}
                    </span>
                  </th>
                ))}
                <th>Avg</th>
              </tr>
            </thead>
            <tbody>
              {classBreakdown.map((cls) => (
                <tr key={cls.name}>
                  <td className={styles.className}>{cls.name}</td>
                  <td>{cls.students}</td>
                  {pillars.map((p) => (
                    <td key={p.id}>
                      <div className={styles.progressCell}>
                        <span>{cls.pillarAvgs[p.id] || 0}%</span>
                        <ProgressBar value={cls.pillarAvgs[p.id] || 0} color={p.color} />
                      </div>
                    </td>
                  ))}
                  <td>
                    <strong className={styles.avgCell}>{cls.avg}%</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Feed */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Recent Activity</h2>
        </div>
        <div className={styles.activityList}>
          {recentActivity.map((item) => (
            <ActivityItem key={item.id} icon={item.icon} text={item.text} time={item.time} />
          ))}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
