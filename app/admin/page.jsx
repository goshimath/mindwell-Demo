'use client';

import { useState, useMemo } from 'react';
import StatCard from '@/components/StatCard';
import StudentRow from '@/components/StudentRow';
import ClassFilter from '@/components/ClassFilter';
import { students, videos, percentFromProgress } from '@/lib/data';
import { t } from '@/lib/strings';
import styles from '@/styles/dashboard.module.css';

export default function AdminDashboard({ lang = 'en' }) {
  const [selectedClass, setSelectedClass] = useState('All');

  // Demo progress data
  const progressMap = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      map[s.id] = { ...s.progress };
    });
    return map;
  }, []);

  // Filter students by class
  const filteredStudents = useMemo(() => {
    if (selectedClass === 'All') return students;
    return students.filter((s) => s.className === selectedClass);
  }, [selectedClass]);

  // Compute stats
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const watchedByStudent = students.map(
      (u) => Object.values(progressMap[u.id] || {}).filter(Boolean).length
    );
    const totalWatched = watchedByStudent.reduce((a, b) => a + b, 0);
    const totalPossible = totalStudents * videos.length;
    const completion = totalPossible ? Math.round((totalWatched / totalPossible) * 100) : 0;
    return { totalStudents, totalWatched, completion };
  }, [progressMap]);

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>{t(lang, 'adminDashboard')}</h2>
          <p>{lang === 'hi' ? 'कक्षाओं और छात्रों की प्रगति देखें' : 'Track progress across classes and students'}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className={styles.statGrid}>
        <StatCard
          icon="👥"
          label={t(lang, 'enrolled')}
          value={stats.totalStudents}
          trend={`↑ 12% ${t(lang, 'thisWeek')}`}
        />
        <StatCard
          icon="▶️"
          label={t(lang, 'watchedVideos')}
          value={stats.totalWatched}
          trend={`↑ 8% ${t(lang, 'thisWeek')}`}
          variant="teal"
        />
        <StatCard
          icon="📊"
          label={t(lang, 'completion')}
          value={`${stats.completion}%`}
          trend={`↑ 5% ${t(lang, 'thisWeek')}`}
        />
      </div>

      {/* Student list panel */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h3>{t(lang, 'studentProgress')}</h3>
            <span>{t(lang, 'classOverview')}</span>
          </div>
          <ClassFilter
            selected={selectedClass}
            onSelect={setSelectedClass}
            lang={lang}
          />
        </div>
        <div className={styles.studentList}>
          {filteredStudents.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              progress={progressMap[student.id]}
            />
          ))}
          {filteredStudents.length === 0 && (
            <div className={styles.empty}>
              {lang === 'hi' ? 'इस कक्षा में कोई छात्र नहीं' : 'No students in this class'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
