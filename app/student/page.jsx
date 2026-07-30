'use client';

import { useState, useEffect, useRef } from 'react';
import ProgressBar from '@/components/ProgressBar';
import ActivityGraph from '@/components/ActivityGraph';
import StudentCharacter from '@/components/StudentCharacter';
import { CardSkeleton } from '@/components/Skeleton';
import { wellbeingAreas, curriculumVideos, experts, appointments, trackers, challenges } from '@/lib/data';
import styles from '@/styles/student.module.css';

function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // IntersectionObserver for scroll-triggered animations
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) return <CardSkeleton count={4} />;

  const filteredVideos = selectedArea
    ? curriculumVideos.filter((v) => v.area === selectedArea)
    : curriculumVideos;

  const completedCount = curriculumVideos.filter((v) => v.status === 'completed').length;
  const totalVideos = curriculumVideos.length;
  const overallProgress = Math.round((completedCount / totalVideos) * 100);

  const handleBook = () => {
    if (selectedExpert && selectedDate && selectedTime) {
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
    }
  };

  const isVisible = (section) => visibleSections.has(section);

  return (
    <div className={styles.studentWrap}>
      {/* Tabs */}
      <div className={`${styles.tabBar} ${styles.fadeIn}`}>
        {[
          { id: 'overview', label: '🏠 Overview' },
          { id: 'wellbeing', label: '🧘 Wellbeing' },
          { id: 'progress', label: '📊 My Network' },
          { id: 'calendar', label: '📅 Book Expert' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
          {/* Hero — animated, colorful, feel-good */}
          <div className={`${styles.heroWrap} ${styles.slideUp}`}>
            {/* Floating decorations */}
            <div className={styles.heroDecor}>
              {[...Array(8)].map((_, i) => (
                <span key={i} className={styles.floatingDot} style={{
                  left: `${8 + i * 12}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.6}s`,
                  width: `${6 + (i % 3) * 4}px`,
                  height: `${6 + (i % 3) * 4}px`,
                }} />
              ))}
            </div>

            <div className={styles.heroInner}>
              <div className={styles.heroLeft}>
                <h1 className={styles.heroGreeting}>
                  {getTimeGreeting()}, Aarav! <span className={styles.starBounce}>🌟</span>
                </h1>
                <p className={styles.heroEncourage}>
                  You&apos;re on a <strong>3-day streak</strong>! Keep going — your next session is waiting.
                </p>

                {/* Session card with pillar border */}
                <div className={`${styles.heroSession} ${styles.slideUpDelay}`}>
                  <div className={styles.sessionPillarBorder} style={{ background: '#9B8EC4' }} />
                  <div className={styles.sessionBody}>
                    <span className={styles.sessionLabel}>▶ NOW PLAYING</span>
                    <strong>Emotional Health — Building Resilience</strong>
                    <span className={styles.sessionMeta}>Session 3 of 8 · 12 min</span>
                    <div className={styles.sessionProgress}>
                      <ProgressBar value={37} color="white" />
                      <span>37%</span>
                    </div>
                    <button className={styles.sessionBtn}>▶ Continue Learning</button>
                  </div>
                </div>
              </div>

              {/* Mood card */}
              <div className={`${styles.heroRight} ${styles.fadeInDelay}`}>
                <div className={styles.moodCard}>
                  <span className={styles.moodEmoji}>🧠</span>
                  <strong>Current Mood</strong>
                  <span className={styles.moodLabel}>Calm & Focused</span>
                  <div className={styles.moodDots}>
                    <span className={styles.moodDot} style={{ background: '#9B8EC4' }} />
                    <span className={styles.moodDot} style={{ background: '#7CB87A' }} />
                    <span className={styles.moodDot} style={{ background: '#C4A84D' }} />
                    <span className={styles.moodDot} style={{ background: '#2B5EA7' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Stat chips — colored pills */}
            <div className={`${styles.statChips} ${styles.staggerIn}`}>
              <span className={`${styles.statChip} ${styles.chipGold}`}>
                <span>🔥</span>
                <div>
                  <strong>3</strong>
                  <span>day streak</span>
                </div>
              </span>
              <span className={`${styles.statChip} ${styles.chipBlue}`}>
                <span>🏅</span>
                <div>
                  <strong>12</strong>
                  <span>badges earned</span>
                </div>
              </span>
              <span className={`${styles.statChip} ${styles.chipGreen}`}>
                <span>📚</span>
                <div>
                  <strong>{completedCount}/{totalVideos}</strong>
                  <span>videos done</span>
                </div>
              </span>
              <span className={`${styles.statChip} ${styles.chipPurple}`}>
                <span>⭐</span>
                <div>
                  <strong>{overallProgress}%</strong>
                  <span>wellness score</span>
                </div>
              </span>
            </div>

            {/* Illustrated character */}
            <div className={styles.characterWrap}>
              <StudentCharacter className={styles.characterSvg} />
            </div>
          </div>

          {/* Browse by area — scroll-triggered */}
          <div
            ref={(el) => (sectionRefs.current.areas = el)}
            data-section="areas"
            className={`${styles.sectionAnimate} ${isVisible('areas') ? styles.visible : ''}`}
          >
            <div className={styles.sectionHeader}><h2>BROWSE BY AREA</h2></div>
            <div className={styles.areaGrid}>
              {wellbeingAreas.map((area, i) => (
                <button
                  key={area.id}
                  className={`${styles.areaCard} ${styles.hoverLift}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => { setSelectedArea(area.id); setActiveTab('wellbeing'); }}
                >
                  <span className={styles.areaIcon}>{area.icon}</span>
                  <strong>{area.label}</strong>
                  <span className={styles.areaSub}>{area.subtitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trackers — scroll-triggered */}
          <div
            ref={(el) => (sectionRefs.current.trackers = el)}
            data-section="trackers"
            className={`${styles.sectionAnimate} ${isVisible('trackers') ? styles.visible : ''}`}
          >
            <div className={styles.sectionHeader}><h2>MY TRACKERS</h2></div>
            <div className={styles.trackerGrid}>
              {trackers.map((t, i) => (
                <div key={t.id} className={`${styles.trackerCard} ${styles.hoverLift}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={styles.trackerTop}>
                    <span className={styles.trackerIcon}>{t.icon}</span>
                    <span className={styles.trackerLabel}>{t.label}</span>
                  </div>
                  <span className={styles.trackerPrompt}>Enter your activity for today!</span>
                  <div className={styles.trackerProgress}>
                    <ProgressBar value={(t.current / t.target) * 100} color={t.color} />
                    <span className={styles.trackerCount}>{t.current}/{t.target} {t.unit}</span>
                  </div>
                  <button className={styles.trackerBtn} style={{ background: t.color }}>Track</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* WELLBEING TAB */}
      {activeTab === 'wellbeing' && (
        <>
          <div className={styles.areaFilter}>
            <button className={`${styles.filterChip} ${!selectedArea ? styles.filterActive : ''}`} onClick={() => setSelectedArea(null)}>All Areas</button>
            {wellbeingAreas.map((area) => (
              <button key={area.id} className={`${styles.filterChip} ${selectedArea === area.id ? styles.filterActive : ''}`} onClick={() => setSelectedArea(area.id)} style={selectedArea === area.id ? { background: area.color, color: 'white', borderColor: area.color } : {}}>
                {area.icon} {area.label}
              </button>
            ))}
          </div>
          <div className={styles.videoList}>
            {filteredVideos.map((video) => {
              const area = wellbeingAreas.find((a) => a.id === video.area);
              const statusColors = { completed: '#22C55E', 'in-progress': '#F59E0B', 'not-started': '#6B7280', locked: '#D1D5DB' };
              const statusLabels = { completed: '✅ Completed', 'in-progress': '▶ In Progress', 'not-started': '○ Not Started', locked: '🔒 Locked' };
              return (
                <div key={video.id} className={`${styles.videoCard} ${video.status === 'locked' ? styles.videoLocked : ''}`}>
                  <img src={video.thumbnail} alt={video.title} className={styles.videoThumb} />
                  <div className={styles.videoInfo}>
                    <div className={styles.videoTop}>
                      <span className={styles.videoArea} style={{ color: area?.color }}>{area?.icon} {area?.label}</span>
                      <span className={styles.videoDuration}>{video.duration}</span>
                    </div>
                    <h3 className={styles.videoTitle}>{video.title}</h3>
                    <div className={styles.videoMeta}>
                      <span className={styles.videoStatus} style={{ color: statusColors[video.status] }}>{statusLabels[video.status]}</span>
                      {video.dueDate && <span className={styles.videoDue}>📅 Due: {video.dueDate}</span>}
                    </div>
                  </div>
                  <div className={styles.videoAction}>
                    {video.status === 'completed' && <span className={styles.videoDone}>✓</span>}
                    {video.status === 'in-progress' && <button className={styles.videoPlayBtn}>▶ Play</button>}
                    {video.status === 'not-started' && <button className={styles.videoStartBtn}>Start</button>}
                    {video.status === 'locked' && <span className={styles.videoLockedIcon}>🔒</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* PROGRESS TAB — Activity Graph */}
      {activeTab === 'progress' && <ActivityGraph />}

      {/* CALENDAR TAB */}
      {activeTab === 'calendar' && (
        <>
          <div className={styles.sectionHeader}>
            <h2>BOOK AN EXPERT SESSION</h2>
            <p className={styles.sectionSub}>Talk to our experts about mental health, nutrition, or physical wellbeing</p>
          </div>
          {bookingSuccess && <div className={styles.bookingToast}>✅ Appointment booked successfully!</div>}
          <div className={styles.expertGrid}>
            {experts.map((expert) => (
              <div key={expert.id} className={`${styles.expertCard} ${selectedExpert === expert.id ? styles.expertSelected : ''}`} onClick={() => setSelectedExpert(expert.id)}>
                <div className={styles.expertAvatar} style={{ background: `${expert.color}15` }}><span>{expert.avatar}</span></div>
                <div className={styles.expertInfo}>
                  <strong>{expert.name}</strong>
                  <span className={styles.expertSpec}>{expert.specialty}</span>
                  <div className={styles.expertDates}>{expert.available.slice(0, 3).map((d) => (<span key={d} className={styles.dateChip}>{d}</span>))}</div>
                </div>
                {selectedExpert === expert.id && <span className={styles.expertCheck}>✓</span>}
              </div>
            ))}
          </div>
          {selectedExpert && (
            <div className={styles.bookingForm}>
              <h3>Schedule your session</h3>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Date</label>
                  <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    <option value="">Select date</option>
                    {experts.find((e) => e.id === selectedExpert)?.available.map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label>Time</label>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value="">Select time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                  </select>
                </div>
              </div>
              <button className={styles.bookBtn} onClick={handleBook} disabled={!selectedDate || !selectedTime}>Book Appointment</button>
            </div>
          )}
          <div className={styles.sectionHeader}><h2>YOUR APPOINTMENTS</h2></div>
          <div className={styles.appointmentList}>
            {appointments.map((apt) => {
              const expert = experts.find((e) => e.id === apt.expertId);
              return (
                <div key={apt.id} className={styles.appointmentCard}>
                  <span className={styles.aptIcon}>{expert?.avatar}</span>
                  <div className={styles.aptInfo}>
                    <strong>{expert?.name}</strong>
                    <span>{apt.topic}</span>
                    <span className={styles.aptDate}>📅 {apt.date} at {apt.time}</span>
                  </div>
                  <span className={`${styles.aptStatus} ${apt.status === 'booked' ? styles.aptBooked : styles.aptUpcoming}`}>{apt.status}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
