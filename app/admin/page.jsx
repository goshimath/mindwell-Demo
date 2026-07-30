'use client';

import { useState, useMemo, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import ClassTable from '@/components/ClassTable';
import QuickActions from '@/components/QuickActions';
import { DashboardSkeleton } from '@/components/Skeleton';
import Toast from '@/components/Toast';
import { students, videos } from '@/lib/data';
import { t } from '@/lib/strings';
import styles from '@/styles/dashboard.module.css';

// Generate class-wise data from student data
function buildClassData(progressMap) {
  const classMap = {};
  students.forEach((s) => {
    if (!classMap[s.className]) {
      classMap[s.className] = { name: `Grade ${s.className}`, students: 0, completed: 0, inProgress: 0, totalTime: 0 };
    }
    const cls = classMap[s.className];
    cls.students++;
    const prog = progressMap[s.id] || {};
    const done = Object.values(prog).filter(Boolean).length;
    cls.completed += done;
    cls.inProgress += Object.keys(prog).length - done;
  });

  return Object.values(classMap).map((cls) => {
    const totalPossible = cls.students * videos.length;
    const completedPct = totalPossible ? Math.round((cls.completed / totalPossible) * 100) : 0;
    const inProgressPct = totalPossible ? Math.round((cls.inProgress / totalPossible) * 100) : 0;
    // Fake avg time for demo
    const avgMin = Math.round(12 + Math.random() * 20);
    return {
      name: cls.name,
      students: cls.students,
      completed: completedPct,
      inProgress: inProgressPct,
      avgTime: `${avgMin} min`,
    };
  });
}

export default function AdminDashboard({ lang = 'en' }) {
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [toast, setToast] = useState(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Demo progress data
  const progressMap = useMemo(() => {
    const map = {};
    students.forEach((s) => { map[s.id] = { ...s.progress }; });
    return map;
  }, []);

  const classData = useMemo(() => buildClassData(progressMap), [progressMap]);

  // Filter by grade
  const filteredClasses = useMemo(() => {
    if (selectedGrade === 'All') return classData;
    return classData.filter((c) => c.name.includes(selectedGrade));
  }, [classData, selectedGrade]);

  // KPI stats
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const watchedByStudent = students.map(
      (u) => Object.values(progressMap[u.id] || {}).filter(Boolean).length
    );
    const totalWatched = watchedByStudent.reduce((a, b) => a + b, 0);
    const totalPossible = totalStudents * videos.length;
    const completion = totalPossible ? Math.round((totalWatched / totalPossible) * 100) : 0;
    // Fake "this week active" for demo
    const thisWeekActive = Math.round(totalStudents * 0.72);
    return { totalStudents, totalWatched, completion, thisWeekActive };
  }, [progressMap]);

  const handleExport = () => {
    setToast(lang === 'hi' ? 'रिपोर्ट डाउनलोड हो गई' : 'Report downloaded');
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>{lang === 'hi' ? `वापसी, ${schoolName}` : `Welcome back, Greenfield Academy`}</h2>
          <p>{lang === 'hi' ? 'आज आपके स्कूल की wellbeing स्थिति' : 'Here\'s what\'s happening across your school today'}</p>
        </div>
        <button className={styles.exportBtn} onClick={handleExport}>
          {lang === 'hi' ? 'रिपोर्ट एक्सपोर्ट' : 'Export Report'}
        </button>
      </div>

      {/* 4 KPI cards */}
      <div className={styles.statGrid}>
        <StatCard
          icon="👥"
          label={t(lang, 'enrolled')}
          value={stats.totalStudents.toLocaleString()}
          trend={`↑ 12% ${t(lang, 'thisWeek')}`}
        />
        <StatCard
          icon="✅"
          label={lang === 'hi' ? 'पूर्णता दर' : 'Completion Rate'}
          value={`${stats.completion}%`}
          trend={`↑ 5% ${t(lang, 'thisWeek')}`}
          variant="teal"
        />
        <StatCard
          icon="▶️"
          label={t(lang, 'watchedVideos')}
          value={stats.totalWatched.toLocaleString()}
          trend={`↑ 8% ${t(lang, 'thisWeek')}`}
        />
        <StatCard
          icon="🔥"
          label={lang === 'hi' ? 'इस हफ्ते सक्रिय' : 'This Week Active'}
          value={stats.thisWeekActive.toLocaleString()}
          trend={`${Math.round(stats.thisWeekActive / stats.totalStudents * 100)}% of enrolled`}
        />
      </div>

      {/* Class-wise progress table */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h3>{lang === 'hi' ? 'कक्षा-वार प्रगति' : 'Class-wise Progress'}</h3>
          </div>
          <div className={styles.filters}>
            <select
              className={styles.gradeSelect}
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="All">{lang === 'hi' ? 'सभी ग्रेड' : 'All Grades'}</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
            </select>
          </div>
        </div>
        <ClassTable classes={filteredClasses} lang={lang} />
      </div>

      {/* Quick actions */}
      <div>
        <h3 className={styles.sectionTitle}>{lang === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}</h3>
        <QuickActions lang={lang} />
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}

const schoolName = 'Greenfield Academy';
