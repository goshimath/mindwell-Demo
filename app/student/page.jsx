'use client';

import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { CardSkeleton } from '@/components/Skeleton';
import { wellbeingAreas, curriculumVideos, experts, appointments, trackers, challenges, pillarColors } from '@/lib/data';
import styles from '@/styles/student.module.css';

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <CardSkeleton count={4} />;

  const filteredVideos = selectedArea
    ? curriculumVideos.filter((v) => v.area === selectedArea)
    : curriculumVideos;

  const completedCount = curriculumVideos.filter((v) => v.status === 'completed').length;
  const inProgressCount = curriculumVideos.filter((v) => v.status === 'in-progress').length;
  const totalVideos = curriculumVideos.length;
  const overallProgress = Math.round((completedCount / totalVideos) * 100);

  const handleBook = () => {
    if (selectedExpert && selectedDate && selectedTime) {
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
    }
  };

  return (
    <div className={styles.studentWrap}>
      {/* Tabs */}
      <div className={styles.tabBar}>
        {[
          { id: 'overview', label: '🏠 Overview' },
          { id: 'wellbeing', label: '🧘 Wellbeing' },
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
          {/* Hero — colorful greeting with illustrations */}
          <div className={styles.heroWrap}>
            <div className={styles.heroDecor}>
              <span className={styles.deco1}>🧠</span>
              <span className={styles.deco2}>💪</span>
              <span className={styles.deco3}>🍎</span>
              <span className={styles.deco4}>🧘</span>
              <span className={styles.deco5}>⭐</span>
              <span className={styles.deco6}>🌿</span>
            </div>
            <div className={styles.heroInner}>
              <div className={styles.heroLeft}>
                <h1 className={styles.heroGreeting}>Hi Aarav! <span className={styles.wave}>👋</span></h1>
                <p className={styles.heroSub}>Let&apos;s continue your wellbeing journey.</p>
                <div className={styles.heroChips}>
                  <span className={styles.heroChip}>🔥 3-day streak</span>
                  <span className={styles.heroChip}>🏅 12 badges</span>
                </div>
              </div>
              <div className={styles.heroRight}>
                <div className={styles.heroSessionMini}>
                  <span className={styles.miniLabel}>NOW PLAYING</span>
                  <div className={styles.miniRow}>
                    <span>🧠</span>
                    <div>
                      <strong>Emotional Health</strong>
                      <span>Session 3 of 8 · 12 min</span>
                    </div>
                  </div>
                  <div className={styles.miniProgress}>
                    <div className={styles.miniBar}><div className={styles.miniFill} /></div>
                    <span>37%</span>
                  </div>
                  <button className={styles.miniBtn}>▶ Continue</button>
                </div>
              </div>
            </div>
            <div className={styles.heroSummary}>25% complete · 2 of 8 videos done</div>
          </div>

          {/* Browse by area */}
          <div className={styles.sectionHeader}>
            <h2>BROWSE BY AREA</h2>
          </div>
          <div className={styles.areaGrid}>
            {wellbeingAreas.map((area) => (
              <button
                key={area.id}
                className={styles.areaCard}
                onClick={() => { setSelectedArea(area.id); setActiveTab('wellbeing'); }}
              >
                <span className={styles.areaIcon}>{area.icon}</span>
                <strong>{area.label}</strong>
                <span className={styles.areaSub}>{area.subtitle}</span>
              </button>
            ))}
          </div>

          {/* Trackers */}
          <div className={styles.sectionHeader}>
            <h2>MY TRACKERS</h2>
          </div>
          <div className={styles.trackerGrid}>
            {trackers.map((t) => (
              <div key={t.id} className={styles.trackerCard}>
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

          {/* Challenges */}
          <div className={styles.sectionHeader}>
            <h2>MY CHALLENGES</h2>
          </div>
          <div className={styles.challengeGrid}>
            {challenges.map((ch) => (
              <div key={ch.id} className={styles.challengeCard}>
                <span className={styles.challengeIcon}>{ch.icon}</span>
                <strong>{ch.title}</strong>
                <span className={styles.challengeDate}>Starts {ch.startDate}</span>
                <button className={styles.challengeBtn}>
                  {ch.status === 'active' ? 'Continue' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* WELLBEING TAB — curriculum videos */}
      {activeTab === 'wellbeing' && (
        <>
          {/* Area filter */}
          <div className={styles.areaFilter}>
            <button
              className={`${styles.filterChip} ${!selectedArea ? styles.filterActive : ''}`}
              onClick={() => setSelectedArea(null)}
            >
              All Areas
            </button>
            {wellbeingAreas.map((area) => (
              <button
                key={area.id}
                className={`${styles.filterChip} ${selectedArea === area.id ? styles.filterActive : ''}`}
                onClick={() => setSelectedArea(area.id)}
                style={selectedArea === area.id ? { background: area.color, color: 'white', borderColor: area.color } : {}}
              >
                {area.icon} {area.label}
              </button>
            ))}
          </div>

          {/* Video list */}
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
                      <span className={styles.videoStatus} style={{ color: statusColors[video.status] }}>
                        {statusLabels[video.status]}
                      </span>
                      {video.dueDate && (
                        <span className={styles.videoDue}>
                          📅 Due: {video.dueDate}
                        </span>
                      )}
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

      {/* CALENDAR TAB — book expert */}
      {activeTab === 'calendar' && (
        <>
          <div className={styles.sectionHeader}>
            <h2>BOOK AN EXPERT SESSION</h2>
            <p className={styles.sectionSub}>Talk to our experts about mental health, nutrition, or physical wellbeing</p>
          </div>

          {bookingSuccess && (
            <div className={styles.bookingToast}>
              ✅ Appointment booked successfully! We&apos;ll send you a reminder.
            </div>
          )}

          {/* Expert cards */}
          <div className={styles.expertGrid}>
            {experts.map((expert) => (
              <div
                key={expert.id}
                className={`${styles.expertCard} ${selectedExpert === expert.id ? styles.expertSelected : ''}`}
                onClick={() => setSelectedExpert(expert.id)}
              >
                <div className={styles.expertAvatar} style={{ background: `${expert.color}15` }}>
                  <span>{expert.avatar}</span>
                </div>
                <div className={styles.expertInfo}>
                  <strong>{expert.name}</strong>
                  <span className={styles.expertSpec}>{expert.specialty}</span>
                  <div className={styles.expertDates}>
                    {expert.available.slice(0, 3).map((d) => (
                      <span key={d} className={styles.dateChip}>{d}</span>
                    ))}
                  </div>
                </div>
                {selectedExpert === expert.id && <span className={styles.expertCheck}>✓</span>}
              </div>
            ))}
          </div>

          {/* Booking form */}
          {selectedExpert && (
            <div className={styles.bookingForm}>
              <h3>Schedule your session</h3>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Date</label>
                  <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    <option value="">Select date</option>
                    {experts.find((e) => e.id === selectedExpert)?.available.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
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
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
              </div>
              <button
                className={styles.bookBtn}
                onClick={handleBook}
                disabled={!selectedDate || !selectedTime}
              >
                Book Appointment
              </button>
            </div>
          )}

          {/* Existing appointments */}
          <div className={styles.sectionHeader}>
            <h2>YOUR APPOINTMENTS</h2>
          </div>
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
                  <span className={`${styles.aptStatus} ${apt.status === 'booked' ? styles.aptBooked : styles.aptUpcoming}`}>
                    {apt.status}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
