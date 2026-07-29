'use client';

import { useEffect, useMemo, useState } from 'react';

const demoData = {
  school: { id: 'SCH-101', name: 'MindWell Public School' },
  videos: [
    {
      id: 'stress',
      title: { en: 'Stress Management', hi: 'तनाव प्रबंधन' },
      topic: 'stress',
      duration: '04:12',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'mindfulness',
      title: { en: 'Mindfulness Basics', hi: 'माइंडफुलनेस की शुरुआत' },
      topic: 'mindfulness',
      duration: '03:48',
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'resilience',
      title: { en: 'Emotional Resilience', hi: 'भावनात्मक मजबूती' },
      topic: 'resilience',
      duration: '05:05',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
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
    tagline: 'A calming school wellbeing platform for students, parents, and schools.',
    loginTitle: 'Welcome to MindWell',
    loginSub: 'A warm demo for school mental wellbeing, built for a fast hackathon pitch.',
    role: 'Role',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signOut: 'Sign out',
    student: 'Student',
    admin: 'Admin',
    parent: 'Parent',
    studentDashboard: 'Student dashboard',
    adminDashboard: 'Admin dashboard',
    parentDashboard: 'Parent dashboard',
    videos: 'Wellbeing videos',
    progress: 'Progress',
    markComplete: 'Mark Complete',
    completed: 'Completed',
    watched: 'Watched',
    enrolled: 'Students enrolled',
    completion: 'Completion %',
    watchedVideos: 'Videos watched',
    parentComing: 'Coming in Blanket tier',
    bilingualHint: 'English + Hindi labels',
    installHint: 'Installable PWA',
    downloadHint: 'Offline-ready demo shell',
    demoCreds: 'Demo credentials',
    schoolId: 'School ID',
    studentId: 'Student ID',
    progressLabel: 'Progress bar',
    home: 'Home',
    stats: 'Analytics',
    classes: 'Classes',
    startToday: 'Start today',
    trustworthy: 'Privacy-safe aggregate view',
    whatChildLearns: 'What your child is learning',
    resources: 'Parent resources',
    quickNotes: 'Milestones and wellness notes',
  },
  hi: {
    appName: 'माइंडवेल',
    tagline: 'छात्रों, अभिभावकों और स्कूलों के लिए एक शांत, भरोसेमंद wellbeing platform.',
    loginTitle: 'माइंडवेल में आपका स्वागत है',
    loginSub: 'स्कूल mental wellbeing का warm demo, hackathon pitch के लिए तैयार.',
    role: 'भूमिका',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    student: 'छात्र',
    admin: 'प्रशासक',
    parent: 'अभिभावक',
    studentDashboard: 'छात्र डैशबोर्ड',
    adminDashboard: 'प्रशासक डैशबोर्ड',
    parentDashboard: 'अभिभावक डैशबोर्ड',
    videos: 'वेलबीइंग वीडियो',
    progress: 'प्रगति',
    markComplete: 'पूर्ण करें',
    completed: 'पूर्ण',
    watched: 'देखा गया',
    enrolled: 'नामांकित छात्र',
    completion: 'पूर्णता %',
    watchedVideos: 'देखे गए वीडियो',
    parentComing: 'ब्लैंकेट टियर में उपलब्ध',
    bilingualHint: 'अंग्रेज़ी + हिंदी लेबल',
    installHint: 'इंस्टॉल करने योग्य PWA',
    downloadHint: 'ऑफ़लाइन-रेडी डेमो शेल',
    demoCreds: 'डेमो क्रेडेंशियल',
    schoolId: 'स्कूल ID',
    studentId: 'छात्र ID',
    progressLabel: 'प्रगति पट्टी',
    home: 'होम',
    stats: 'एनालिटिक्स',
    classes: 'कक्षाएँ',
    startToday: 'आज शुरू करें',
    trustworthy: 'गोपनीयता-सुरक्षित aggregate view',
    whatChildLearns: 'आपका बच्चा क्या सीख रहा है',
    resources: 'अभिभावक संसाधन',
    quickNotes: 'माइलस्टोन और wellness notes',
  },
};

const AVATAR_STYLE = 'https://api.dicebear.com/7.x/avataaars/svg?seed=';

function getInitialState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('mindwell-demo-state');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function buildState() {
  const base = { school: demoData.school, users: demoData.students, videoProgress: {} };
  demoData.students.forEach((student) => {
    base.videoProgress[student.id] = { ...student.progress };
  });
  return base;
}

function percentFromProgress(progress, total = 3) {
  return Math.round((Object.values(progress || {}).filter(Boolean).length / total) * 100);
}

function Donut({ value }) {
  const style = {
    background: `conic-gradient(#14b8a6 ${value * 3.6}deg, #d8f0eb 0deg)`,
  };
  return (
    <div className="donut" style={style}>
      <div className="donutInner">
        <strong>{value}%</strong>
        <span>done</span>
      </div>
    </div>
  );
}

function StatCard({ tone, icon, label, value }) {
  return (
    <div className={`statCard ${tone}`}>
      <div className="statIcon">{icon}</div>
      <div>
        <div className="statLabel">{label}</div>
        <div className="statValue">{value}</div>
      </div>
    </div>
  );
}

function TopicThumb({ topic, image, title }) {
  return (
    <div className="thumbWrap">
      <img src={image} alt={title} className="thumbImage" />
      <div className={`thumbOverlay ${topic}`} />
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

  useEffect(() => {
    const existing = getInitialState();
    if (existing) setState(existing);
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
      alert('Invalid demo credentials');
      return;
    }
    setSession({ role, email });
    setMode('app');
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

  const currentVideo = demoData.videos.find((v) => v.id === selectedVideo) || demoData.videos[0];

  return (
    <main className="shell">
      <style jsx global>{`
        :root {
          --bg: #f7fbf9;
          --panel: rgba(255,255,255,0.86);
          --panelSolid: #ffffff;
          --text: #173635;
          --muted: #5f7776;
          --border: rgba(17, 94, 89, 0.14);
          --brand: #0f766e;
          --brand2: #14b8a6;
          --accent: #f59e0b;
          --accent2: #fb923c;
          --good: #22c55e;
          --shadow: 0 18px 45px rgba(15, 118, 110, 0.12);
        }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: radial-gradient(circle at top, #f0fffb, var(--bg) 45%, #eefaf6 100%); color: var(--text); }
        body { font-family: inherit; }
        img { display: block; max-width: 100%; }
        button, input, select { font: inherit; }
        .shell { min-height: 100vh; padding: 20px; }
        .topbar {
          display:flex; justify-content:space-between; align-items:center; gap:16px;
          margin-bottom:18px;
        }
        .brand { display:flex; align-items:center; gap:12px; }
        .logo {
          width:56px; height:56px; border-radius:18px;
          background: linear-gradient(135deg, #0f766e, #14b8a6 55%, #f59e0b 130%);
          color:white; display:grid; place-items:center; font-weight:900; letter-spacing:0.5px;
          box-shadow: var(--shadow);
        }
        .title h1 { margin:0; font-size:1.25rem; }
        .title p { margin:4px 0 0; color:var(--muted); font-size:0.94rem; }
        .btnRow { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
        .langToggle {
          display:flex; gap:6px; padding:5px; border-radius:999px;
          background: rgba(255,255,255,0.72); border:1px solid var(--border);
          box-shadow: 0 8px 25px rgba(15, 118, 110, 0.06);
        }
        .langToggle button {
          border:none; background:transparent; padding:8px 12px; border-radius:999px; cursor:pointer; font-weight:800; color:var(--muted);
        }
        .langToggle button.active { background: linear-gradient(135deg, var(--brand), var(--brand2)); color:white; }
        .signOut {
          border:none; background:white; color:var(--brand); border:1px solid var(--border); border-radius:16px; padding:12px 16px; font-weight:800; cursor:pointer; box-shadow: 0 10px 25px rgba(15,118,110,0.08);
        }
        .pageGrid { display:grid; gap:16px; }
        .loginGrid { grid-template-columns: 1.15fr 0.85fr; align-items:stretch; }
        .heroCard {
          position: relative; min-height: 640px; overflow:hidden;
          border-radius: 32px; border: 1px solid rgba(255,255,255,0.55); box-shadow: var(--shadow);
          background:
            linear-gradient(135deg, rgba(15,118,110,0.92), rgba(20,184,166,0.78), rgba(245,158,11,0.55)),
            url('https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1600&q=80') center/cover;
        }
        .heroScrim { position:absolute; inset:0; background: linear-gradient(180deg, rgba(8,57,54,0.2), rgba(8,57,54,0.38)); }
        .heroContent {
          position:relative; z-index:1; padding:28px; color:white; display:flex; flex-direction:column; justify-content:space-between; min-height:640px;
        }
        .heroTop { max-width: 680px; }
        .eyebrow {
          display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px;
          background: rgba(255,255,255,0.18); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,0.2);
          font-weight:800; letter-spacing:0.2px;
        }
        .heroTop h2 { margin:16px 0 12px; font-size: clamp(2.3rem, 5vw, 4.7rem); line-height:0.98; letter-spacing:-0.04em; max-width: 12ch; }
        .heroTop p { margin:0; max-width: 58ch; font-size: 1.04rem; line-height:1.75; color: rgba(255,255,255,0.9); }
        .heroPills { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
        .heroPills span {
          display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:999px;
          background: rgba(255,255,255,0.16); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,0.18);
          font-weight:700;
        }
        .heroBottom {
          display:flex; gap:12px; flex-wrap:wrap; align-items:center; justify-content:space-between;
          padding-top: 24px;
        }
        .heroStats { display:flex; gap:12px; flex-wrap:wrap; }
        .heroStat {
          min-width: 130px; padding:14px 16px; border-radius:20px;
          background: rgba(255,255,255,0.16); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,0.16);
        }
        .heroStat strong { display:block; font-size:1.7rem; }
        .heroStat span { font-size:0.92rem; color: rgba(255,255,255,0.88); }
        .loginCard, .panel {
          background: var(--panel); border:1px solid var(--border); backdrop-filter: blur(14px);
          border-radius: 28px; box-shadow: var(--shadow); overflow:hidden;
        }
        .loginCard { padding: 22px; display:flex; flex-direction:column; justify-content:center; }
        .loginCard h3 { margin:0; font-size:1.75rem; }
        .loginCard .sub { color:var(--muted); line-height:1.7; margin:10px 0 18px; }
        .form { display:grid; gap:12px; }
        .field { display:grid; gap:6px; }
        label { color: var(--muted); font-size:0.9rem; font-weight:700; }
        input, select {
          width:100%; border:1px solid var(--border); border-radius:16px; padding:13px 14px;
          background:white; outline:none;
        }
        input:focus, select:focus { border-color: rgba(20,184,166,0.75); box-shadow: 0 0 0 4px rgba(20,184,166,0.12); }
        .primaryBtn {
          margin-top:4px; border:none; padding:14px 18px; border-radius:16px; cursor:pointer; font-weight:900; color:white;
          background: linear-gradient(135deg, var(--brand), var(--brand2)); box-shadow: 0 14px 28px rgba(15,118,110,0.22);
        }
        .demoBox {
          margin-top:14px; padding:14px; border-radius:18px; background: rgba(255,255,255,0.78); border:1px dashed rgba(15,118,110,0.2);
          color: var(--text); line-height:1.45;
        }
        .appGrid { grid-template-columns: 1.2fr 0.8fr; align-items:start; }
        .panel { padding: 18px; }
        .dashHeader {
          display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:16px;
        }
        .dashHeader h3 { margin:0; font-size:1.4rem; }
        .dashHeader p { margin:6px 0 0; color:var(--muted); }
        .sectionTitle { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:12px; }
        .sectionTitle h4 { margin:0; font-size:1.05rem; }
        .sectionTitle span { color:var(--muted); font-size:0.92rem; }
        .avatarRow { display:flex; align-items:center; gap:12px; }
        .avatar {
          width:52px; height:52px; border-radius:50%; border:3px solid rgba(255,255,255,0.9); box-shadow: 0 10px 25px rgba(15,118,110,0.18); background:white;
        }
        .studentHero, .parentHero {
          border-radius: 26px; overflow:hidden; background: linear-gradient(135deg, rgba(15,118,110,0.1), rgba(20,184,166,0.08), rgba(245,158,11,0.08));
          border:1px solid var(--border); padding:18px; margin-bottom:16px;
        }
        .studentHeroTop { display:flex; justify-content:space-between; gap:14px; align-items:flex-start; }
        .greeting { font-size: clamp(1.45rem, 2.4vw, 2.1rem); font-weight:900; margin:0; }
        .greetingSub { color:var(--muted); margin:8px 0 0; line-height:1.6; }
        .chipRow { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
        .chip {
          display:inline-flex; align-items:center; gap:6px; padding:8px 11px; border-radius:999px; background:white; border:1px solid var(--border);
          font-size:0.88rem; font-weight:800;
        }
        .studentHeroArt {
          width: 164px; flex: 0 0 164px; min-height: 140px; border-radius: 22px; overflow:hidden; position:relative; background: white; border: 1px solid var(--border);
        }
        .studentHeroArt img { width:100%; height:100%; object-fit:cover; }
        .studentHeroArt::after {
          content: ''; position:absolute; inset:0; background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(8,57,54,0.22));
        }
        .statGrid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; margin-bottom:14px; }
        .statCard {
          padding:14px; border-radius:20px; color:white; display:flex; align-items:center; gap:12px; min-height:92px;
          box-shadow: 0 18px 30px rgba(15,118,110,0.15);
        }
        .statCard.teal { background: linear-gradient(135deg, #0f766e, #14b8a6); }
        .statCard.amber { background: linear-gradient(135deg, #d97706, #f59e0b); }
        .statCard.green { background: linear-gradient(135deg, #15803d, #22c55e); }
        .statIcon {
          width:42px; height:42px; border-radius:14px; background: rgba(255,255,255,0.18); display:grid; place-items:center; font-size:1.2rem;
        }
        .statLabel { font-size:0.85rem; opacity:0.9; }
        .statValue { font-size:1.75rem; font-weight:900; line-height:1.1; margin-top:4px; }
        .donutWrap { display:flex; justify-content:center; align-items:center; padding:10px 0 18px; }
        .donut {
          width:132px; height:132px; border-radius:50%; display:grid; place-items:center; position:relative;
          box-shadow: inset 0 0 0 1px rgba(15,118,110,0.08);
        }
        .donutInner {
          width:92px; height:92px; border-radius:50%; background:white; display:grid; place-items:center; text-align:center;
          box-shadow: inset 0 0 0 1px rgba(15,118,110,0.08);
        }
        .donutInner strong { font-size:1.4rem; display:block; }
        .donutInner span { font-size:0.78rem; color:var(--muted); font-weight:800; text-transform:uppercase; letter-spacing:0.08em; }
        .videoList { display:grid; gap:14px; }
        .videoCard {
          overflow:hidden; border-radius:22px; background:white; border:1px solid var(--border); box-shadow: 0 10px 26px rgba(15,118,110,0.08);
        }
        .videoMedia { position:relative; height:170px; }
        .thumbWrap { position:relative; width:100%; height:100%; }
        .thumbImage { width:100%; height:100%; object-fit:cover; }
        .thumbOverlay { position:absolute; inset:0; }
        .thumbOverlay.stress { background: linear-gradient(180deg, rgba(10,40,74,0.05), rgba(15,118,110,0.28)); }
        .thumbOverlay.mindfulness { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(20,184,166,0.22)); }
        .thumbOverlay.resilience { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(245,158,11,0.22)); }
        .videoBody { padding: 14px; }
        .videoHead { display:flex; justify-content:space-between; gap:10px; align-items:flex-start; }
        .videoHead h5 { margin:0 0 6px; font-size:1.05rem; }
        .videoHead p { margin:0; color:var(--muted); font-size:0.92rem; }
        .videoTag { display:inline-flex; padding:7px 10px; border-radius:999px; background:#ecfdf5; color:#047857; font-size:0.82rem; font-weight:900; }
        .progressBar {
          height:12px; border-radius:999px; background:#e4f2ef; overflow:hidden; margin:12px 0;
          box-shadow: inset 0 0 0 1px rgba(15,118,110,0.06);
        }
        .progressFill { height:100%; border-radius:inherit; background: linear-gradient(90deg, var(--brand), var(--brand2), #22c55e); }
        .btnGroup { display:flex; gap:10px; flex-wrap:wrap; }
        .ghostBtn {
          border:none; background:#f7fffd; border:1px solid var(--border); color:var(--brand); border-radius:14px; padding:11px 14px; cursor:pointer; font-weight:900;
        }
        .completionBarWrap { display:flex; align-items:center; gap:12px; }
        .studentList { display:grid; gap:10px; }
        .studentRow {
          display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px 14px;
          border:1px solid var(--border); border-radius:18px; background:white;
        }
        .studentRowLeft { display:flex; align-items:center; gap:12px; }
        .studentRow h5 { margin:0; font-size:1rem; }
        .studentRow p { margin:3px 0 0; color:var(--muted); font-size:0.88rem; }
        .miniStat { text-align:right; font-weight:900; }
        .miniStat span { display:block; color:var(--muted); font-weight:700; font-size:0.84rem; }
        .parentGrid { display:grid; gap:12px; }
        .parentNote {
          padding:14px 16px; border-radius:18px; background:#effaf8; border:1px solid rgba(15,118,110,0.12); color:#175754; font-weight:700;
        }
        .resourceGrid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px; }
        .resourceCard {
          background:white; border:1px solid var(--border); border-radius:18px; padding:14px; box-shadow: 0 8px 22px rgba(15,118,110,0.06);
        }
        .resourceCard strong { display:block; margin-bottom:6px; }
        .mobileTabs { display:none; }
        @media (max-width: 980px) {
          .loginGrid, .appGrid { grid-template-columns: 1fr; }
          .heroCard { min-height: 520px; }
          .heroContent { min-height: 520px; }
          .statGrid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .shell { padding: 14px; }
          .topbar { align-items:flex-start; flex-direction:column; }
          .studentHeroTop { flex-direction:column; }
          .studentHeroArt { width:100%; flex:none; }
          .resourceGrid { grid-template-columns:1fr; }
          .mobileTabs { display:flex; gap:8px; }
          .mobileTab {
            flex:1; border:none; background:white; border:1px solid var(--border); padding:10px 12px; border-radius:14px; font-weight:900;
          }
          .mobileTab.active { background: linear-gradient(135deg, var(--brand), var(--brand2)); color:white; }
        }
      `}</style>

      <div className="topbar">
        <div className="brand">
          <div className="logo">MW</div>
          <div className="title">
            <h1>{t.appName}</h1>
            <p>{t.bilingualHint} · {t.installHint} · {t.downloadHint}</p>
          </div>
        </div>
        <div className="btnRow">
          <div className="langToggle" aria-label="language toggle">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>हि</button>
          </div>
          {session && <button className="signOut" onClick={logout}>{t.signOut}</button>}
        </div>
      </div>

      {mode === 'login' ? (
        <section className="pageGrid loginGrid">
          <div className="heroCard">
            <div className="heroScrim" />
            <div className="heroContent">
              <div className="heroTop">
                <div className="eyebrow">Hackathon MVP · Indian K-12 wellbeing</div>
                <h2>{t.loginTitle}</h2>
                <p>{t.tagline} {t.loginSub}</p>
                <div className="heroPills">
                  <span>✨ Student learning</span>
                  <span>🛡️ Parent trust</span>
                  <span>📊 School analytics</span>
                  <span>📱 Mobile-first PWA</span>
                </div>
              </div>
              <div className="heroBottom">
                <div className="heroStats">
                  <div className="heroStat"><strong>3</strong><span>Videos</span></div>
                  <div className="heroStat"><strong>5</strong><span>Students</span></div>
                  <div className="heroStat"><strong>1</strong><span>School</span></div>
                </div>
                <div className="heroStat" style={{ maxWidth: 290 }}>
                  <strong>{t.startToday}</strong>
                  <span>{t.trustworthy}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="loginCard">
            <h3>{t.loginTitle}</h3>
            <div className="sub">{t.loginSub}</div>
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
            <div className="demoBox">
              <strong>{t.demoCreds}</strong><br />
              <strong>{t.schoolId}:</strong> SCH-101<br />
              <strong>Admin:</strong> school@mindwell.app / demo123<br />
              <strong>Student:</strong> student1@mindwell.app / demo123<br />
              <strong>Parent:</strong> parent@mindwell.app / demo123
            </div>
          </div>
        </section>
      ) : (
        <section className="pageGrid appGrid">
          <div className="panel">
            <div className="dashHeader">
              <div>
                <h3>{session.role === 'admin' ? t.adminDashboard : session.role === 'parent' ? t.parentDashboard : t.studentDashboard}</h3>
                <p>{state.school.name}</p>
              </div>
              {session.role === 'student' && currentUser && (
                <div className="avatarRow">
                  <img className="avatar" src={`${AVATAR_STYLE}${encodeURIComponent(currentUser.name)}`} alt={currentUser.name} />
                  <div>
                    <strong>{lang === 'hi' ? `नमस्ते, ${currentUser.name} 👋` : `Namaste, ${currentUser.name} 👋`}</strong>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{currentUser.className} · {currentUser.grade}th grade</div>
                  </div>
                </div>
              )}
            </div>

            {session.role === 'student' && currentUser && (
              <>
                <div className="studentHero">
                  <div className="studentHeroTop">
                    <div>
                      <h4 className="greeting">{lang === 'hi' ? `नमस्ते, ${currentUser.name} 👋` : `Namaste, ${currentUser.name} 👋`}</h4>
                      <p className="greetingSub">{lang === 'hi' ? 'आज के wellbeing lessons छोटे, सरल और fun हैं.' : 'Today’s wellbeing lessons are short, simple, and motivating.'}</p>
                      <div className="chipRow">
                        <span className="chip">⭐ 3 day streak</span>
                        <span className="chip">🏅 Mindful learner</span>
                        <span className="chip">📘 Grade {currentUser.grade}</span>
                      </div>
                    </div>
                    <div className="studentHeroArt">
                      <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80" alt="students" />
                    </div>
                  </div>
                </div>

                <div className="statGrid">
                  <StatCard tone="teal" icon="👥" label={t.enrolled} value={adminStats.totalStudents} />
                  <StatCard tone="amber" icon="▶" label={t.watchedVideos} value={completedCount} />
                  <StatCard tone="green" icon="🌱" label={t.completion} value={`${progressPercent}%`} />
                </div>

                <div className="sectionTitle">
                  <h4>{t.videos}</h4>
                  <span>{t.progressLabel}</span>
                </div>

                <div className="videoList">
                  {demoData.videos.map((video) => {
                    const done = !!progressMap[video.id];
                    const pct = done ? 100 : 22;
                    return (
                      <article className="videoCard" key={video.id}>
                        <div className="videoMedia">
                          <TopicThumb topic={video.topic} image={video.image} title={video.title[lang]} />
                        </div>
                        <div className="videoBody">
                          <div className="videoHead">
                            <div>
                              <h5>{video.title[lang]}</h5>
                              <p>{video.duration} · {done ? t.completed : 'New lesson'}</p>
                            </div>
                            <span className="videoTag">{done ? t.completed : 'Start'}</span>
                          </div>
                          <div className="progressBar"><div className="progressFill" style={{ width: `${pct}%` }} /></div>
                          <div className="btnGroup">
                            <button className="ghostBtn" onClick={() => setSelectedVideo(video.id)}>▶ Play</button>
                            <button className="primaryBtn" onClick={() => markComplete(video.id)}>{t.markComplete}</button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}

            {session.role === 'admin' && (
              <>
                <div className="studentHero">
                  <div className="studentHeroTop">
                    <div>
                      <h4 className="greeting">MindWell school overview</h4>
                      <p className="greetingSub">Warm, readable analytics for principals and coordinators — no clutter, just the numbers that matter.</p>
                    </div>
                    <Donut value={adminStats.completion} />
                  </div>
                </div>

                <div className="statGrid">
                  <StatCard tone="teal" icon="👥" label={t.enrolled} value={adminStats.totalStudents} />
                  <StatCard tone="amber" icon="▶" label={t.watchedVideos} value={adminStats.totalWatched} />
                  <StatCard tone="green" icon="◔" label={t.completion} value={`${adminStats.completion}%`} />
                </div>

                <div className="sectionTitle">
                  <h4>{t.stats}</h4>
                  <span>School-wide overview</span>
                </div>

                <div className="studentList">
                  {demoData.students.map((student) => {
                    const done = Object.values(state.videoProgress[student.id] || {}).filter(Boolean).length;
                    const pct = percentFromProgress(state.videoProgress[student.id]);
                    return (
                      <div className="studentRow" key={student.id}>
                        <div className="studentRowLeft">
                          <img className="avatar" src={`${AVATAR_STYLE}${encodeURIComponent(student.name)}`} alt={student.name} />
                          <div>
                            <h5>{student.name}</h5>
                            <p>{student.className} · {student.id}</p>
                          </div>
                        </div>
                        <div className="miniStat">
                          {pct}%
                          <span>{done}/3 watched</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {session.role === 'parent' && (
              <div className="parentGrid">
                <div className="parentHero">
                  <div className="dashHeader" style={{ marginBottom: 10 }}>
                    <div>
                      <h4 className="greeting">Parent dashboard</h4>
                      <p className="greetingSub">A calm, trust-building view with aggregate progress and supportive resources.</p>
                    </div>
                    <img className="avatar" src={`${AVATAR_STYLE}Parent`} alt="Parent avatar" />
                  </div>
                  <div className="parentNote">{t.trustworthy}</div>
                </div>

                <div className="statGrid">
                  <StatCard tone="teal" icon="🛡️" label="Child wellbeing" value="Good" />
                  <StatCard tone="amber" icon="📘" label="Modules visible" value="3" />
                  <StatCard tone="green" icon="💬" label={t.quickNotes} value="2" />
                </div>

                <div className="sectionTitle">
                  <h4>{t.whatChildLearns}</h4>
                  <span>{t.resources}</span>
                </div>

                <div className="resourceGrid">
                  <div className="resourceCard"><strong>Stress relief</strong>Breathing and calming techniques for classroom moments.</div>
                  <div className="resourceCard"><strong>Mindfulness</strong>Short routines to build focus and emotional awareness.</div>
                  <div className="resourceCard"><strong>Resilience</strong>How to bounce back after a tough day or a setback.</div>
                  <div className="resourceCard"><strong>Parent guides</strong>Downloadable tips for supporting children at home.</div>
                </div>

                <div className="parentNote">{t.parentComing}</div>
              </div>
            )}
          </div>

          <aside className="panel">
            <div className="sectionTitle">
              <h4>Demo context</h4>
              <span>Vercel-ready</span>
            </div>
            <div className="studentHeroArt" style={{ width: '100%', height: 190, flex: 'none', marginBottom: 14 }}>
              <img src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1200&q=80" alt="Indian students" />
            </div>
            <div className="resourceGrid" style={{ gridTemplateColumns: '1fr', marginBottom: 14 }}>
              <div className="resourceCard"><strong>School</strong>{state.school.name}</div>
              <div className="resourceCard"><strong>Role</strong>{session.role}</div>
              <div className="resourceCard"><strong>Mobile</strong>Responsive</div>
              <div className="resourceCard"><strong>PWA</strong>Installable</div>
            </div>
            <div className="sectionTitle">
              <h4>Quick actions</h4>
              <span>Mock only</span>
            </div>
            <div className="btnGroup">
              <button className="ghostBtn" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}>Toggle language</button>
              {session.role === 'student' && <button className="ghostBtn" onClick={() => setState(buildState())}>Reset progress</button>}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="sectionTitle">
                <h4>Selected video</h4>
                <span>{selectedVideo}</span>
              </div>
              <div className="resourceCard">
                <strong>{currentVideo.title[lang]}</strong>
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>{currentVideo.topic} · {currentVideo.duration}</div>
              </div>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
