'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const demoData = {
  school: { id: 'SCH-101', name: 'MindWell Public School' },
  videos: [
    {
      id: 'stress',
      title: { en: 'Stress Management', hi: 'तनाव प्रबंधन' },
      duration: '04:12',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      description: 'Breathing tools and classroom-ready calm routines.',
    },
    {
      id: 'mindfulness',
      title: { en: 'Mindfulness Basics', hi: 'माइंडफुलनेस की शुरुआत' },
      duration: '03:48',
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80',
      description: 'Short focus practices for daily emotional balance.',
    },
    {
      id: 'resilience',
      title: { en: 'Emotional Resilience', hi: 'भावनात्मक मजबूती' },
      duration: '05:05',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      description: 'Bounce-back habits for confidence and growth.',
    },
  ],
  students: [
    { id: 'student1@mindwell.app', name: 'Aarav', grade: '5', className: '5A', progress: { stress: true, mindfulness: false, resilience: false } },
    { id: 'student2@mindwell.app', name: 'Anaya', grade: '6', className: '6B', progress: { stress: true, mindfulness: true, resilience: false } },
    { id: 'student3@mindwell.app', name: 'Kabir', grade: '7', className: '7A', progress: { stress: false, mindfulness: false, resilience: false } },
    { id: 'student4@mindwell.app', name: 'Meera', grade: '8', className: '8C', progress: { stress: true, mindfulness: true, resilience: true } },
    { id: 'student5@mindwell.app', name: 'Rohan', grade: '4', className: '4B', progress: { stress: true, mindfulness: false, resilience: true } },
  ],
};

const STRINGS = {
  en: {
    appName: 'MindWell',
    tagline: 'A school wellbeing platform that feels warm for families and credible for schools.',
    loginTitle: 'Welcome to MindWell',
    loginSub: 'Support wellbeing across classrooms, homes, and school leadership with a clean, enterprise-ready experience.',
    role: 'Role',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signOut: 'Sign out',
    student: 'Student',
    admin: 'Admin',
    parent: 'Parent',
    studentDashboard: 'My Learning',
    adminDashboard: 'Dashboard',
    parentDashboard: 'Child Progress',
    videos: 'Wellbeing videos',
    progress: 'Progress',
    markComplete: 'Mark Complete',
    completed: 'Completed',
    enrolled: 'Students enrolled',
    completion: 'Completion %',
    watchedVideos: 'Videos watched',
    demoCreds: 'Demo access',
    schoolId: 'School ID',
    startToday: 'Get started',
    trustworthy: 'Built for multi-school rollouts, role-based access, and clean reporting.',
    whatChildLearns: 'What your child is learning',
    resources: 'Parent resources',
    quickNotes: 'Milestones and wellbeing notes',
    switchView: 'View as',
    dashboard: 'Dashboard',
    students: 'Students',
    reports: 'Reports',
    curriculum: 'Curriculum',
    settings: 'Settings',
    myLearning: 'My Learning',
    achievements: 'Achievements',
    pricing: 'Pricing',
    mostPopular: 'Most Popular',
    getStarted: 'Get Started / Shuru Karein',
    enterprise: 'Enterprise-ready for schools at scale',
  },
  hi: {
    appName: 'माइंडवेल',
    tagline: 'परिवारों के लिए गर्मजोशी, स्कूलों के लिए भरोसेमंद wellbeing platform.',
    loginTitle: 'माइंडवेल में आपका स्वागत है',
    loginSub: 'क्लासरूम, घर और स्कूल leadership — तीनों के लिए एक polished experience.',
    role: 'भूमिका',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    student: 'छात्र',
    admin: 'प्रशासक',
    parent: 'अभिभावक',
    studentDashboard: 'मेरी पढ़ाई',
    adminDashboard: 'डैशबोर्ड',
    parentDashboard: 'बच्चे की प्रगति',
    videos: 'वेलबीइंग वीडियो',
    progress: 'प्रगति',
    markComplete: 'पूर्ण करें',
    completed: 'पूर्ण',
    enrolled: 'नामांकित छात्र',
    completion: 'पूर्णता %',
    watchedVideos: 'देखे गए वीडियो',
    demoCreds: 'डेमो एक्सेस',
    schoolId: 'स्कूल ID',
    startToday: 'शुरू करें',
    trustworthy: 'Multi-school rollout, role-based access, और clean reporting के लिए बनाया गया.',
    whatChildLearns: 'आपका बच्चा क्या सीख रहा है',
    resources: 'अभिभावक संसाधन',
    quickNotes: 'माइलस्टोन और wellbeing notes',
    switchView: 'देखें',
    dashboard: 'डैशबोर्ड',
    students: 'छात्र',
    reports: 'रिपोर्ट',
    curriculum: 'पाठ्यक्रम',
    settings: 'सेटिंग्स',
    myLearning: 'मेरी पढ़ाई',
    achievements: 'उपलब्धियाँ',
    pricing: 'प्राइसिंग',
    mostPopular: 'सबसे लोकप्रिय',
    getStarted: 'शुरू करें / Get Started',
    enterprise: 'बड़े स्कूलों के लिए enterprise-ready',
  },
};

const AVATAR_STYLE = 'https://api.dicebear.com/7.x/avataaars/svg?seed=';
const NAV_ITEMS = {
  admin: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'students', label: 'Students' },
    { id: 'reports', label: 'Reports' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'settings', label: 'Settings' },
  ],
  student: [
    { id: 'my-learning', label: 'My Learning' },
    { id: 'progress', label: 'Progress' },
    { id: 'achievements', label: 'Achievements' },
  ],
  parent: [
    { id: 'child-progress', label: 'Child Progress' },
    { id: 'resources', label: 'Resources' },
    { id: 'support', label: 'Support' },
  ],
};

function getInitialState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('mindwell-demo-state');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function buildState() {
  const base = { school: demoData.school, users: demoData.students, videoProgress: {}, activeSection: 'dashboard' };
  demoData.students.forEach((student) => {
    base.videoProgress[student.id] = { ...student.progress };
  });
  return base;
}

function percentFromProgress(progress, total = 3) {
  return Math.round((Object.values(progress || {}).filter(Boolean).length / total) * 100);
}

function StatCard({ tone, icon, label, value, trend }) {
  return (
    <div className={`statCard ${tone}`}>
      <div className="statTop">
        <div className="statIcon">{icon}</div>
        <div className="statTrend">{trend}</div>
      </div>
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
    </div>
  );
}

function VideoCard({ video, done, lang, onPlay, onComplete, selected }) {
  return (
    <article className={`videoCard ${selected ? 'selected' : ''}`}>
      <div className="videoMedia">
        <img src={video.image} alt={video.title[lang]} className="videoThumb" />
        <span className="durationBadge">{video.duration}</span>
      </div>
      <div className="videoBody">
        <div className="videoHead">
          <div>
            <h5>{video.title[lang]}</h5>
            <p>{video.description}</p>
          </div>
          <span className="statusPill">{done ? 'Completed' : 'In progress'}</span>
        </div>
        <div className="progressBar"><div className="progressFill" style={{ width: done ? '100%' : '24%' }} /></div>
        <div className="btnRow">
          <button className="secondaryBtn" onClick={onPlay}>Play</button>
          <button className="primaryBtn compact" onClick={onComplete}>{done ? 'Completed' : 'Mark Complete'}</button>
        </div>
      </div>
    </article>
  );
}

function PricingCard({ title, price, subtitle, features, popular = false }) {
  return (
    <div className={`pricingCard ${popular ? 'popular' : ''}`}>
      {popular && <div className="popularBadge">Most Popular</div>}
      <h3>{title}</h3>
      <div className="pricingValue">{price}</div>
      <p>{subtitle}</p>
      <ul>
        {features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
      <button className="primaryBtn pricingCta">Get Started / Shuru Karein</button>
    </div>
  );
}

export default function Page() {
  const [lang, setLang] = useState('en');
  const t = STRINGS[lang];
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('student1@mindwell.app');
  const [password, setPassword] = useState('demo123');
  const [session, setSession] = useState(null);
  const [state, setState] = useState(buildState);
  const [selectedVideo, setSelectedVideo] = useState(demoData.videos[0].id);
  const [section, setSection] = useState('dashboard');

  useEffect(() => {
    const existing = getInitialState();
    if (existing) {
      setState(existing);
      setSection(existing.activeSection || 'dashboard');
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mindwell-demo-state', JSON.stringify(state));
  }, [state]);

  const currentUser = useMemo(() => {
    if (!session) return null;
    return state.users.find((u) => u.id === session.email) || null;
  }, [session, state]);

  const progressMap = currentUser ? state.videoProgress[currentUser.id] || {} : {};
  const completedCount = Object.values(progressMap).filter(Boolean).length;
  const progressPercent = currentUser ? Math.round((completedCount / demoData.videos.length) * 100) : 0;

  const adminStats = useMemo(() => {
    const totalStudents = state.users.length;
    const watchedByStudent = state.users.map((u) => Object.values(state.videoProgress[u.id] || {}).filter(Boolean).length);
    const totalWatched = watchedByStudent.reduce((a, b) => a + b, 0);
    const totalPossible = totalStudents * demoData.videos.length;
    const completion = totalPossible ? Math.round((totalWatched / totalPossible) * 100) : 0;
    return { totalStudents, totalWatched, completion };
  }, [state]);

  const login = () => {
    const valid = (email === 'school@mindwell.app' && password === 'demo123' && role === 'admin') ||
      (email === 'student1@mindwell.app' && password === 'demo123' && role === 'student') ||
      (email === 'parent@mindwell.app' && password === 'demo123' && role === 'parent');
    if (!valid) {
      alert('Invalid access credentials');
      return;
    }
    setSession({ role, email });
    setMode('app');
    setSection(role === 'student' ? 'my-learning' : role === 'parent' ? 'child-progress' : 'dashboard');
  };

  const logout = () => {
    setSession(null);
    setMode('login');
  };

  const markComplete = (videoId) => {
    if (!currentUser) return;
    setState((prev) => ({
      ...prev,
      videoProgress: {
        ...prev.videoProgress,
        [currentUser.id]: {
          ...(prev.videoProgress[currentUser.id] || {}),
          [videoId]: true,
        },
      },
    }));
  };

  const switchView = (nextRole) => {
    if (nextRole === 'student') {
      setRole('student');
      setEmail('student1@mindwell.app');
      setPassword('demo123');
      setSession({ role: 'student', email: 'student1@mindwell.app' });
      setMode('app');
      setSection('my-learning');
      return;
    }
    if (nextRole === 'admin') {
      setRole('admin');
      setEmail('school@mindwell.app');
      setPassword('demo123');
      setSession({ role: 'admin', email: 'school@mindwell.app' });
      setMode('app');
      setSection('dashboard');
      return;
    }
    setRole('parent');
    setEmail('parent@mindwell.app');
    setPassword('demo123');
    setSession({ role: 'parent', email: 'parent@mindwell.app' });
    setMode('app');
    setSection('child-progress');
  };

  const navItems = NAV_ITEMS[session?.role || role] || NAV_ITEMS.student;
  const activeVideo = demoData.videos.find((video) => video.id === selectedVideo) || demoData.videos[0];

  return (
    <main className="shell">
      <style jsx global>{`
        :root {
          --navy: #0f1f3d;
          --teal: #00a896;
          --surface: #f4f6f9;
          --text: #1a1a2e;
          --muted: #627186;
          --border: rgba(15, 31, 61, 0.12);
          --shadow: 0 18px 45px rgba(15, 31, 61, 0.12);
        }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: var(--surface); color: var(--text); }
        body { font-family: inherit; }
        img { display: block; max-width: 100%; }
        button, input, select { font: inherit; }
        a { color: inherit; text-decoration: none; }
        .shell { min-height: 100vh; }
        .pageWidth { width: min(1400px, calc(100% - 32px)); margin: 0 auto; }
        .landing {
          background: linear-gradient(135deg, #0f1f3d 0%, #13335d 52%, #0fa3a8 100%);
          color: white;
          padding: 18px 0 32px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .topbar {
          display:flex; align-items:center; justify-content:space-between; gap:16px;
          padding: 0 0 18px;
        }
        .brand { display:flex; align-items:center; gap:12px; }
        .logo {
          width:54px; height:54px; border-radius:16px; display:grid; place-items:center;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08));
          border:1px solid rgba(255,255,255,0.18); font-weight:900; letter-spacing:0.5px;
        }
        .brand h1 { margin:0; font-size:1.1rem; }
        .brand p { margin:3px 0 0; color: rgba(255,255,255,0.75); font-size:0.92rem; }
        .topActions { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .navLink {
          padding:10px 14px; border-radius:999px; border:1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06);
          color: white; font-weight:700;
        }
        .langToggle {
          display:flex; gap:6px; padding:5px; border-radius:999px; background: rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.14);
        }
        .langToggle button {
          border:none; background:transparent; padding:8px 12px; border-radius:999px; cursor:pointer; font-weight:800; color: rgba(255,255,255,0.8);
        }
        .langToggle button.active { background: white; color: var(--navy); }
        .heroGrid {
          display:grid; grid-template-columns: 1.1fr 0.9fr; gap: 20px; align-items:stretch;
        }
        .heroCopy {
          padding: 30px 0 0;
        }
        .eyebrow {
          display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px;
          background: rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.16); font-size:0.88rem; font-weight:800;
        }
        .heroCopy h2 {
          margin:18px 0 14px; font-size: clamp(2.8rem, 4.8vw, 4.2rem); line-height:0.98; letter-spacing:-0.04em;
          max-width: 11ch;
        }
        .heroCopy p {
          margin:0; max-width: 60ch; color: rgba(255,255,255,0.82); line-height:1.7; font-size:1rem;
        }
        .heroActions { display:flex; gap:12px; flex-wrap:wrap; margin-top:22px; }
        .primaryBtn, .secondaryBtn, .pricingCta {
          border:none; border-radius:14px; padding:13px 18px; cursor:pointer; font-weight:900;
        }
        .primaryBtn {
          color: white; background: linear-gradient(135deg, var(--teal), #21c5af); box-shadow: 0 16px 28px rgba(0,168,150,0.26);
        }
        .primaryBtn.compact { padding: 11px 14px; }
        .secondaryBtn { background: white; color: var(--navy); }
        .heroPills { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
        .heroPills span {
          display:inline-flex; align-items:center; gap:8px; padding:10px 12px; border-radius:999px;
          background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.88); font-size:0.92rem;
        }
        .heroMock {
          position:relative; min-height: 460px; border-radius: 28px; overflow:hidden;
          border:1px solid rgba(255,255,255,0.12); box-shadow: var(--shadow);
          background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
        }
        .heroMockInner {
          position:absolute; inset: 18px; border-radius: 22px; background: rgba(244,246,249,0.98); color: var(--text); overflow:hidden;
          display:grid; grid-template-columns: 220px 1fr; box-shadow: inset 0 0 0 1px rgba(15,31,61,0.05);
        }
        .mockSidebar {
          background: linear-gradient(180deg, #101f3f, #11284d); color:white; padding:18px; display:flex; flex-direction:column; gap:14px;
        }
        .mockSidebar .sectionTitle { color: rgba(255,255,255,0.72); font-size:0.82rem; text-transform:uppercase; letter-spacing:0.08em; }
        .mockNav { display:grid; gap:8px; }
        .mockNav span {
          padding:10px 12px; border-radius:12px; background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.08);
          color:white; font-size:0.92rem;
        }
        .mockMain { padding:18px; display:grid; gap:12px; }
        .mockStatGrid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:10px; }
        .mockStat { background:white; border-radius:18px; border:1px solid var(--border); padding:12px; }
        .mockStat strong { display:block; font-size:1.45rem; color: var(--navy); }
        .mockCard {
          background:white; border-radius:18px; border:1px solid var(--border); padding:14px; display:grid; gap:10px;
        }
        .mockLine { height:10px; border-radius:999px; background: linear-gradient(90deg, rgba(15,31,61,0.08), rgba(0,168,150,0.18)); }
        .mockLine.short { width: 64%; }
        .mockLine.med { width: 82%; }
        .mockLine.long { width: 100%; }
        .mockVideo {
          display:grid; grid-template-columns: 120px 1fr; gap:12px; align-items:start;
        }
        .mockThumb {
          height: 74px; border-radius:14px; background: linear-gradient(135deg, rgba(15,31,61,0.9), rgba(0,168,150,0.8));
        }
        .heroCreds {
          margin-top: 18px;
          display:flex; gap:10px; flex-wrap:wrap;
        }
        .heroCreds .chip {
          padding:10px 12px; border-radius:999px; background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.85);
        }
        .appShell { padding: 18px 0 28px; }
        .appLayout { display:grid; grid-template-columns: 260px minmax(0,1fr); gap: 18px; align-items:start; }
        .sidebar {
          position: sticky; top: 16px; background: white; border:1px solid var(--border); border-radius: 22px; box-shadow: var(--shadow);
          padding: 16px;
        }
        .sidebarHead { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:14px; }
        .sidebarHead strong { display:block; }
        .sidebarHead span { color: var(--muted); font-size:0.88rem; }
        .sidebarNav { display:grid; gap:8px; margin-top: 10px; }
        .sidebarNav button {
          width:100%; text-align:left; border:none; background:transparent; border-radius:14px; padding:12px 12px; cursor:pointer; font-weight:800; color: var(--navy);
        }
        .sidebarNav button.active { background: linear-gradient(135deg, rgba(0,168,150,0.12), rgba(15,31,61,0.06)); }
        .sidebarFooter { margin-top:14px; padding-top:14px; border-top:1px solid var(--border); display:grid; gap:10px; }
        .profileChip { display:flex; align-items:center; gap:10px; padding:10px; background: #f8fafc; border-radius:16px; }
        .profileChip img { width:40px; height:40px; border-radius:50%; }
        .workspace {
          display:grid; gap: 16px;
        }
        .workspaceTop {
          display:flex; justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap;
        }
        .workspaceTop h3 { margin:0; font-size: 1.55rem; }
        .workspaceTop p { margin:6px 0 0; color: var(--muted); }
        .sectionBand {
          display:flex; gap:10px; flex-wrap:wrap; align-items:center;
          padding: 12px 14px; border-radius: 18px; background: white; border:1px solid var(--border);
        }
        .sectionBand span {
          padding:8px 10px; border-radius:999px; background:#eef3f8; color:var(--navy); font-size:0.85rem; font-weight:800;
        }
        .statGrid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
        .statCard {
          padding:16px; border-radius:20px; color:white; border:1px solid rgba(255,255,255,0.08); box-shadow: 0 16px 30px rgba(15,31,61,0.12);
        }
        .statCard.dark { background: linear-gradient(180deg, #121f3a, #0f172a); }
        .statCard .statTop { display:flex; justify-content:space-between; align-items:center; gap:10px; }
        .statCard .statIcon {
          width:42px; height:42px; border-radius:14px; display:grid; place-items:center;
          background: rgba(255,255,255,0.08); font-size:1.1rem;
        }
        .statTrend { font-size:0.84rem; color: rgba(255,255,255,0.72); }
        .statLabel { margin-top:12px; font-size:0.88rem; color: rgba(255,255,255,0.78); }
        .statValue { font-size:2rem; font-weight:900; margin-top:6px; }
        .panel {
          background: white; border:1px solid var(--border); border-radius:22px; box-shadow: var(--shadow); padding: 18px;
        }
        .panelHead { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:12px; }
        .panelHead h4 { margin:0; font-size:1.08rem; }
        .panelHead span { color: var(--muted); font-size:0.9rem; }
        .studentHero {
          display:flex; justify-content:space-between; gap:18px; align-items:center;
          background: linear-gradient(135deg, #0f1f3d, #12315a 60%, rgba(0,168,150,0.9));
          color:white; border-radius:22px; padding:18px; overflow:hidden;
        }
        .studentHero strong { display:block; font-size: clamp(1.6rem, 2.8vw, 2.2rem); }
        .studentHero p { margin:10px 0 0; color: rgba(255,255,255,0.82); max-width: 55ch; line-height:1.7; }
        .heroMeta { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
        .heroMeta span { padding:8px 10px; border-radius:999px; background: rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.12); }
        .heroAvatar { width: 92px; height: 92px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.18); }
        .heroThumbnail {
          width: 190px; min-height: 140px; border-radius:18px; overflow:hidden; border:1px solid rgba(255,255,255,0.14);
        }
        .heroThumbnail img { width:100%; height:100%; object-fit:cover; }
        .videoGrid { display:grid; gap:14px; }
        .videoCard {
          background: white; border:1px solid var(--border); border-radius:18px; overflow:hidden; box-shadow: 0 12px 28px rgba(15,31,61,0.08);
        }
        .videoCard.selected { outline: 2px solid rgba(0,168,150,0.32); }
        .videoMedia { position:relative; aspect-ratio: 16 / 9; }
        .videoThumb { width:100%; height:100%; object-fit:cover; }
        .durationBadge {
          position:absolute; top:12px; right:12px; padding:7px 9px; border-radius:999px; color:white; font-size:0.78rem; font-weight:800;
          background: rgba(15,31,61,0.88); backdrop-filter: blur(8px);
        }
        .videoBody { padding:14px; }
        .videoHead { display:flex; justify-content:space-between; gap:10px; align-items:flex-start; }
        .videoHead h5 { margin:0 0 6px; font-size:1.05rem; }
        .videoHead p { margin:0; color:var(--muted); line-height:1.5; font-size:0.92rem; }
        .statusPill {
          display:inline-flex; padding:8px 10px; border-radius:999px; background:#edf7f5; color:#07685b; font-size:0.8rem; font-weight:900;
          white-space:nowrap;
        }
        .progressBar {
          height:10px; border-radius:999px; background:#e6ecf4; overflow:hidden; margin:12px 0 14px;
        }
        .progressFill { height:100%; border-radius:inherit; background: linear-gradient(90deg, #0f1f3d, #00a896); }
        .btnRow { display:flex; gap:10px; flex-wrap:wrap; }
        .secondaryBtn {
          border:1px solid var(--border); background: #f8fafc; color: var(--navy); padding:12px 16px; border-radius:14px; cursor:pointer; font-weight:900;
        }
        .compact { padding:12px 16px; }
        .tableList { display:grid; gap:10px; }
        .studentRow {
          display:flex; justify-content:space-between; gap:12px; align-items:center;
          padding:12px 14px; border-radius:16px; border:1px solid var(--border); background:#fff;
        }
        .studentLeft { display:flex; align-items:center; gap:12px; }
        .studentAvatar { width:44px; height:44px; border-radius:50%; border:1px solid var(--border); }
        .studentRow h5 { margin:0; font-size:1rem; }
        .studentRow p { margin:3px 0 0; color:var(--muted); font-size:0.88rem; }
        .studentStat { text-align:right; font-weight:900; }
        .studentStat span { display:block; color:var(--muted); font-weight:700; font-size:0.82rem; }
        .childGrid { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .resourceCard {
          background:#fff; border:1px solid var(--border); border-radius:18px; padding:14px;
        }
        .resourceCard strong { display:block; margin-bottom:6px; }
        .pricingSection {
          padding: 44px 0 60px;
          background: white;
          border-top: 1px solid var(--border);
        }
        .pricingHead { display:flex; justify-content:space-between; gap:12px; align-items:flex-end; margin-bottom:20px; }
        .pricingHead h2 { margin:0; font-size: clamp(2rem, 3.8vw, 3rem); }
        .pricingHead p { margin:6px 0 0; color:var(--muted); max-width: 56ch; line-height:1.7; }
        .pricingGrid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
        .pricingCard {
          position:relative; background: #fff; border:1px solid var(--border); border-radius: 22px; padding: 20px; box-shadow: var(--shadow);
        }
        .pricingCard.popular { border-color: rgba(0,168,150,0.4); transform: translateY(-6px); }
        .popularBadge {
          position:absolute; top:16px; right:16px; padding:8px 10px; border-radius:999px; background: rgba(0,168,150,0.1); color: var(--teal); font-weight:900; font-size:0.8rem;
        }
        .pricingCard h3 { margin:0; font-size:1.2rem; }
        .pricingValue { font-size:2.1rem; font-weight:900; color: var(--navy); margin: 12px 0 6px; }
        .pricingCard p { margin:0 0 14px; color:var(--muted); line-height:1.7; }
        .pricingCard ul { margin:0 0 18px; padding-left:18px; color:var(--text); line-height:1.9; }
        .pricingCard li { margin-bottom:6px; }
        .pricingCta { width:100%; }
        .demoToggle { margin-top: 14px; }
        .demoToggle details {
          background: rgba(15,31,61,0.05); border:1px solid rgba(15,31,61,0.1); border-radius:16px; padding: 12px 14px;
        }
        .demoToggle summary { cursor:pointer; font-weight:900; color: var(--navy); }
        .demoAccess { margin-top:10px; color: var(--muted); line-height:1.7; }
        .hiddenMeta { display:none; }
        .mobileOnly { display:none; }
        .loginGrid { display:grid; grid-template-columns: 1.05fr 0.95fr; gap: 18px; align-items:stretch; }
        .loginFormWrap {
          background: white; color: var(--text); border-radius: 22px; box-shadow: var(--shadow); border:1px solid rgba(255,255,255,0.18);
          padding: 20px;
        }
        .loginFormWrap h3 { margin:0; font-size:1.35rem; color: var(--navy); }
        .loginFormWrap .sub { color: var(--muted); margin: 8px 0 16px; line-height:1.7; }
        .field { display:grid; gap:6px; margin-bottom: 12px; }
        label { color: var(--muted); font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; }
        input, select {
          width:100%; border:1px solid var(--border); border-radius:14px; padding: 13px 14px; background:#fff; outline:none;
        }
        input:focus, select:focus { border-color: rgba(0,168,150,0.75); box-shadow: 0 0 0 4px rgba(0,168,150,0.12); }
        .dashboardLayout { padding: 18px 0 30px; }
        .loginShell {
          padding: 22px 0 44px;
          background: linear-gradient(180deg, #0f1f3d 0%, #13294b 55%, #eef3f8 55%, #eef3f8 100%);
        }
        .loginIntro { padding-top: 8px; }
        .loginIntro .tag { display:inline-flex; align-items:center; gap:8px; padding: 8px 12px; border-radius:999px; background: rgba(255,255,255,0.09); border:1px solid rgba(255,255,255,0.12); }
        .loginIntro .chipRow { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
        .loginIntro .chipRow span { padding:9px 12px; border-radius:999px; background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.88); }
        .demoBadge { display:inline-flex; }
        .contentWrap { display:grid; gap: 16px; }
        @media (max-width: 1100px) {
          .heroGrid, .loginGrid, .appLayout, .pricingGrid { grid-template-columns: 1fr; }
          .heroMockInner { grid-template-columns: 1fr; }
          .sidebar { position: static; }
        }
        @media (max-width: 720px) {
          .pageWidth { width: calc(100% - 22px); }
          .topbar { align-items:flex-start; flex-direction:column; }
          .statGrid, .mockStatGrid, .childGrid { grid-template-columns: 1fr; }
          .studentHero { flex-direction:column; align-items:flex-start; }
          .heroThumbnail { width:100%; }
          .pricingHead { align-items:flex-start; flex-direction:column; }
          .mobileOnly { display:block; }
          .sidebarNav { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .sidebarNav button { background:#f7f9fc; }
        }
      `}</style>

      <section className="landing">
        <div className="pageWidth">
          <div className="topbar">
            <div className="brand">
              <div className="logo">MW</div>
              <div>
                <h1>{t.appName}</h1>
                <p>{t.tagline}</p>
              </div>
            </div>
            <div className="topActions">
              <Link className="navLink" href="/pricing">{t.pricing}</Link>
              <div className="langToggle" aria-label="language toggle">
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
                <button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>हि</button>
              </div>
            </div>
          </div>

          <div className="heroGrid">
            <div className="heroCopy loginIntro">
              <span className="eyebrow">Enterprise-ready wellbeing for Indian schools</span>
              <h2>{t.loginTitle}</h2>
              <p>{t.loginSub}</p>
              <div className="heroActions">
                <button className="primaryBtn" onClick={() => setMode('login')}>{t.startToday}</button>
                <Link className="secondaryBtn" href="/pricing">See pricing</Link>
              </div>
              <div className="heroPills">
                <span>Student learning</span>
                <span>Parent visibility</span>
                <span>School analytics</span>
                <span>Role-based access</span>
              </div>
              <div className="heroCreds">
                <span className="chip">Trusted for multi-school rollouts</span>
                <span className="chip">Clear reporting and hierarchy</span>
              </div>
            </div>

            <div className="heroMock" aria-label="MindWell product preview">
              <div className="heroMockInner">
                <div className="mockSidebar">
                  <div>
                    <div className="sectionTitle">School navigation</div>
                    <div className="mockNav">
                      <span>Dashboard</span>
                      <span>Students</span>
                      <span>Reports</span>
                      <span>Curriculum</span>
                    </div>
                  </div>
                  <div>
                    <div className="sectionTitle">Current rollout</div>
                    <div className="mockCard" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.08)' }}>
                      <strong>MindWell</strong>
                      <div className="mockLine long" />
                      <div className="mockLine med" />
                    </div>
                  </div>
                </div>
                <div className="mockMain">
                  <div className="mockStatGrid">
                    <div className="mockStat"><strong>1,200</strong><span>Students</span></div>
                    <div className="mockStat"><strong>84%</strong><span>Completion</span></div>
                    <div className="mockStat"><strong>↑12%</strong><span>This week</span></div>
                  </div>
                  <div className="mockCard">
                    <div className="mockVideo">
                      <div className="mockThumb" />
                      <div>
                        <div className="mockLine long" />
                        <div className="mockLine med" style={{ marginTop: 10 }} />
                        <div className="mockLine short" style={{ marginTop: 10 }} />
                      </div>
                    </div>
                  </div>
                  <div className="mockCard">
                    <div className="mockLine long" />
                    <div className="mockLine med" style={{ marginTop: 10 }} />
                    <div className="mockLine short" style={{ marginTop: 10 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mode === 'login' ? (
        <section className="loginShell">
          <div className="pageWidth loginGrid">
            <div className="panel" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
              <div className="contentWrap">
                <div className="panel" style={{ background: 'white' }}>
                  <div className="panelHead">
                    <h4>{t.loginTitle}</h4>
                    <span>{t.enterprise}</span>
                  </div>
                  <div className="loginFormWrap" style={{ boxShadow: 'none', border: 'none', padding: 0 }}>
                    <div className="form">
                      <div className="field">
                        <label>{t.role}</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                          <option value="student">{t.student}</option>
                          <option value="admin">{t.admin}</option>
                          <option value="parent">{t.parent}</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>{t.email}</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="field">
                        <label>{t.password}</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <button className="primaryBtn" onClick={login}>{t.signIn}</button>
                    </div>
                  </div>
                  <div className="demoToggle">
                    <details>
                      <summary>{t.demoCreds}</summary>
                      <div className="demoAccess">
                        <strong>{t.schoolId}:</strong> SCH-101<br />
                        <strong>Admin:</strong> school@mindwell.app / demo123<br />
                        <strong>Student:</strong> student1@mindwell.app / demo123<br />
                        <strong>Parent:</strong> parent@mindwell.app / demo123
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panelHead">
                <h4>Why schools choose MindWell</h4>
                <span>Clear, trustworthy, scalable</span>
              </div>
              <div className="childGrid">
                <div className="resourceCard"><strong>Students</strong>Engaging video learning with progress, badges, and quick wins.</div>
                <div className="resourceCard"><strong>Parents</strong>Privacy-safe milestones and supportive guidance.</div>
                <div className="resourceCard"><strong>Schools</strong>Class-wise reporting and role-based access.</div>
                <div className="resourceCard"><strong>Enterprise</strong>Built to scale across multiple schools and campuses.</div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="appShell">
          <div className="pageWidth appLayout">
            <aside className="sidebar">
              <div className="sidebarHead">
                <div>
                  <strong>{state.school.name}</strong>
                  <span>{t.enterprise}</span>
                </div>
                {currentUser && <img className="studentAvatar" src={`${AVATAR_STYLE}${encodeURIComponent(currentUser.name)}`} alt={currentUser.name} />}
              </div>
              <div>
                <div style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.switchView}</div>
                <div className="heroActions" style={{ marginTop: 10 }}>
                  <button className={`secondaryBtn ${session.role === 'student' ? 'active' : ''}`} onClick={() => switchView('student')}>{t.student}</button>
                  <button className={`secondaryBtn ${session.role === 'admin' ? 'active' : ''}`} onClick={() => switchView('admin')}>{t.admin}</button>
                  <button className={`secondaryBtn ${session.role === 'parent' ? 'active' : ''}`} onClick={() => switchView('parent')}>{t.parent}</button>
                </div>
              </div>
              <nav className="sidebarNav">
                {navItems.map((item) => (
                  <button key={item.id} className={section === item.id ? 'active' : ''} onClick={() => setSection(item.id)}>
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="sidebarFooter">
                <button className="secondaryBtn" onClick={logout}>{t.signOut}</button>
                {currentUser && (
                  <div className="profileChip">
                    <img src={`${AVATAR_STYLE}${encodeURIComponent(currentUser.name)}`} alt={currentUser.name} />
                    <div>
                      <strong>{currentUser.name}</strong>
                      <div style={{ color: 'var(--muted)', fontSize: '0.86rem' }}>{currentUser.className} · {currentUser.grade}th grade</div>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            <div className="workspace">
              <div className="workspaceTop">
                <div>
                  <h3>{session.role === 'admin' ? t.adminDashboard : session.role === 'parent' ? t.parentDashboard : t.studentDashboard}</h3>
                  <p>{state.school.name}</p>
                </div>
                <div className="sectionBand">
                  <span>{t.student}</span>
                  <span>{t.parent}</span>
                  <span>{t.admin}</span>
                </div>
              </div>

              {session.role === 'admin' && (
                <>
                  <div className="statGrid">
                    <StatCard tone="dark" icon="👥" label={t.enrolled} value={adminStats.totalStudents} trend="↑ 12% this week" />
                    <StatCard tone="dark" icon="▶" label={t.watchedVideos} value={adminStats.totalWatched} trend="↑ 8% this week" />
                    <StatCard tone="dark" icon="◔" label={t.completion} value={`${adminStats.completion}%`} trend="↑ 5% this week" />
                  </div>

                  <div className="panel">
                    <div className="panelHead">
                      <h4>Student progress</h4>
                      <span>Class-wise overview</span>
                    </div>
                    <div className="tableList">
                      {demoData.students.map((student) => {
                        const done = Object.values(state.videoProgress[student.id] || {}).filter(Boolean).length;
                        const pct = percentFromProgress(state.videoProgress[student.id]);
                        return (
                          <div className="studentRow" key={student.id}>
                            <div className="studentLeft">
                              <img className="studentAvatar" src={`${AVATAR_STYLE}${encodeURIComponent(student.name)}`} alt={student.name} />
                              <div>
                                <h5>{student.name}</h5>
                                <p>{student.className} · {student.id}</p>
                              </div>
                            </div>
                            <div className="studentStat">{pct}%<span>{done}/3 watched</span></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {session.role === 'student' && currentUser && (
                <>
                  <div className="studentHero">
                    <div>
                      <strong>{lang === 'hi' ? `नमस्ते, ${currentUser.name} 👋` : `Namaste, ${currentUser.name} 👋`}</strong>
                      <p>{lang === 'hi' ? 'आज के wellbeing lessons छोटे, सरल और motivating हैं.' : 'Today’s wellbeing lessons are short, clear, and motivating.'}</p>
                      <div className="heroMeta">
                        <span>3 day streak</span>
                        <span>Mindful learner</span>
                        <span>{currentUser.className}</span>
                      </div>
                    </div>
                    <div className="heroThumbnail">
                      <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80" alt="students" />
                    </div>
                  </div>

                  <div className="statGrid">
                    <StatCard tone="dark" icon="📘" label="Learning paths" value="3" trend="↑ 12% this week" />
                    <StatCard tone="dark" icon="🏅" label={t.achievements || 'Achievements'} value={completedCount} trend="↑ 1 badge earned" />
                    <StatCard tone="dark" icon="🌱" label={t.completion} value={`${progressPercent}%`} trend="↑ 9% this week" />
                  </div>

                  <div className="panel">
                    <div className="panelHead">
                      <h4>{t.videos}</h4>
                      <span>{t.myLearning}</span>
                    </div>
                    <div className="videoGrid">
                      {demoData.videos.map((video) => {
                        const done = !!progressMap[video.id];
                        return (
                          <VideoCard
                            key={video.id}
                            video={video}
                            lang={lang}
                            done={done}
                            selected={selectedVideo === video.id}
                            onPlay={() => setSelectedVideo(video.id)}
                            onComplete={() => markComplete(video.id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {session.role === 'parent' && (
                <>
                  <div className="studentHero">
                    <div>
                      <strong>{lang === 'hi' ? `बच्चे की प्रगति एक नज़र में` : `Child progress at a glance`}</strong>
                      <p>{t.trustworthy}</p>
                      <div className="heroMeta">
                        <span>{t.whatChildLearns}</span>
                        <span>{t.resources}</span>
                        <span>{t.quickNotes}</span>
                      </div>
                    </div>
                    <div className="heroThumbnail">
                      <img src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=900&q=80" alt="parents and children" />
                    </div>
                  </div>
                  <div className="statGrid">
                    <StatCard tone="dark" icon="🛡️" label="Privacy-safe visibility" value="On" trend="Aggregate only" />
                    <StatCard tone="dark" icon="📘" label="Modules visible" value="3" trend="Up to date" />
                    <StatCard tone="dark" icon="💬" label={t.quickNotes} value="2" trend="This month" />
                  </div>
                  <div className="childGrid">
                    <div className="resourceCard"><strong>Stress relief</strong>Breathing and calming techniques for classroom moments.</div>
                    <div className="resourceCard"><strong>Mindfulness</strong>Short routines to build focus and emotional awareness.</div>
                    <div className="resourceCard"><strong>Resilience</strong>How to bounce back after a tough day or setback.</div>
                    <div className="resourceCard"><strong>Parent guides</strong>Downloadable tips for supporting children at home.</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="pricingSection" id="pricing">
        <div className="pageWidth">
          <div className="pricingHead">
            <div>
              <h2>Pricing built for schools</h2>
              <p>Simple tiers for academic rollout, parent expansion, and full school-wide adoption.</p>
            </div>
            <Link className="secondaryBtn" href="/pricing">Open pricing page</Link>
          </div>
          <div className="pricingGrid">
            <PricingCard
              title="Academic"
              price="₹150 / student / year"
              subtitle="Curriculum videos, progress tracking, and school analytics."
              features={['Student learning library', 'Progress dashboard', 'School analytics', 'Responsive web app']}
            />
            <PricingCard
              title="Blanket"
              price="₹220 / student / year"
              subtitle="Everything in Academic, plus parent visibility and advanced support."
              features={['Parent resources', 'Aggregate child progress', 'Advanced analytics', 'Most Popular package']}
              popular
            />
            <PricingCard
              title="School-Wide Flat"
              price="₹40,000–₹80,000 / year"
              subtitle="For larger institutions and district-level rollouts."
              features={['Campus-wide access', 'Admin controls', 'Curriculum customization', 'Rollout support']}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
