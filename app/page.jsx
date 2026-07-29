'use client';

import { useEffect, useMemo, useState } from 'react';

const demoData = {
  school: { id: 'SCH-101', name: 'MindWell Public School' },
  videos: [
    { id: 'stress', title: { en: 'Stress Management', hi: 'तनाव प्रबंधन' }, topic: 'stress', duration: '04:12' },
    { id: 'mindfulness', title: { en: 'Mindfulness Basics', hi: 'माइंडफुलनेस की शुरुआत' }, topic: 'mindfulness', duration: '03:48' },
    { id: 'resilience', title: { en: 'Emotional Resilience', hi: 'भावनात्मक मजबूती' }, topic: 'resilience', duration: '05:05' },
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
    loginTitle: 'School mental wellbeing demo',
    loginSub: 'Use the demo credentials below.',
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
    parentStub: 'Parent view',
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
  },
  hi: {
    appName: 'माइंडवेल',
    loginTitle: 'स्कूल मानसिक स्वास्थ्य डेमो',
    loginSub: 'नीचे दिए गए डेमो लॉगिन का उपयोग करें।',
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
    parentStub: 'अभिभावक दृश्य',
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
  },
};

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

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

  const completedCount = useMemo(() => {
    if (!currentUser) return 0;
    return Object.values(state.videoProgress[currentUser.id] || {}).filter(Boolean).length;
  }, [currentUser, state]);

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

  const progressMap = currentUser ? state.videoProgress[currentUser.id] || {} : {};
  const progressPercent = currentUser ? Math.round((Object.values(progressMap).filter(Boolean).length / demoData.videos.length) * 100) : 0;

  return (
    <main className="shell">
      <style jsx global>{`
        .shell { min-height: 100vh; padding: 20px; }
        .topbar { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:20px; }
        .brand { display:flex; align-items:center; gap:12px; }
        .logo { width:52px; height:52px; border-radius:18px; background:linear-gradient(135deg, #0f766e, #14b8a6); color:white; display:grid; place-items:center; box-shadow: var(--shadow); font-weight:800; }
        .title h1 { margin:0; font-size:1.2rem; }
        .title p { margin:4px 0 0; color:var(--muted); font-size:0.92rem; }
        .grid { display:grid; gap:16px; }
        .login-grid { grid-template-columns: 1.15fr 0.85fr; }
        .card { background:var(--panel); border:1px solid var(--border); backdrop-filter: blur(12px); border-radius:24px; box-shadow: var(--shadow); padding:18px; }
        .hero { padding:24px; background: linear-gradient(135deg, rgba(15,118,110,0.12), rgba(20,184,166,0.08)); }
        .hero h2 { margin:0 0 10px; font-size: clamp(1.5rem, 3vw, 2.4rem); }
        .hero p { margin:0 0 18px; max-width: 58ch; color:var(--muted); line-height:1.6; }
        .pill-row { display:flex; flex-wrap:wrap; gap:10px; }
        .pill { padding:8px 12px; border-radius:999px; background:rgba(255,255,255,0.7); border:1px solid var(--border); font-size:0.9rem; }
        .form { display:grid; gap:12px; }
        .field { display:grid; gap:6px; }
        label { font-size:0.88rem; color:var(--muted); }
        input, select { width:100%; border:1px solid var(--border); border-radius:14px; padding:12px 14px; background:white; }
        .btn-row { display:flex; gap:10px; flex-wrap:wrap; }
        .btn { border:none; border-radius:14px; padding:12px 16px; cursor:pointer; font-weight:700; }
        .btn.primary { background: linear-gradient(135deg, var(--brand), var(--brand-2)); color:white; }
        .btn.ghost { background: white; color: var(--brand); border:1px solid var(--border); }
        .demo-box { margin-top:14px; padding:14px; background:rgba(255,255,255,0.7); border-radius:16px; border:1px dashed rgba(15,118,110,0.2); }
        .dashboard { grid-template-columns: 1.2fr 0.8fr; align-items:start; }
        .stat-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; }
        .stat { background:white; border:1px solid var(--border); border-radius:18px; padding:14px; }
        .stat .k { font-size:0.8rem; color:var(--muted); }
        .stat .v { font-size:1.8rem; font-weight:800; margin-top:6px; }
        .section-title { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:12px; }
        .section-title h3 { margin:0; }
        .section-title span { color:var(--muted); font-size:0.9rem; }
        .video-list { display:grid; gap:12px; }
        .video { background:white; border:1px solid var(--border); border-radius:20px; padding:16px; }
        .video-top { display:flex; justify-content:space-between; gap:10px; align-items:flex-start; }
        .video h4 { margin:0 0 6px; }
        .sub { color:var(--muted); font-size:0.9rem; }
        .bar { height:10px; background:#d9efec; border-radius:999px; overflow:hidden; margin:12px 0; }
        .fill { height:100%; background:linear-gradient(90deg, #0f766e, #22c55e); }
        .tag { display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:999px; background:#ecfdf5; color:#047857; font-size:0.84rem; font-weight:700; }
        .small { font-size:0.88rem; color:var(--muted); }
        .sidebar { display:grid; gap:12px; }
        .mini-list { display:grid; gap:8px; }
        .mini-row { display:flex; justify-content:space-between; gap:10px; padding:10px 12px; background:white; border-radius:14px; border:1px solid var(--border); }
        .lang-toggle { display:flex; gap:8px; background: rgba(255,255,255,0.7); padding:4px; border-radius:999px; border:1px solid var(--border); }
        .lang-toggle button { border:none; background:transparent; border-radius:999px; padding:8px 12px; cursor:pointer; }
        .lang-toggle button.active { background: var(--brand); color:white; }
        .mobile-tabs { display:none; }
        @media (max-width: 920px) {
          .login-grid, .dashboard { grid-template-columns: 1fr; }
          .stat-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .shell { padding: 14px; }
          .topbar { align-items:flex-start; flex-direction:column; }
          .mobile-tabs { display:flex; gap:8px; }
          .tab-btn { flex:1; border:none; background:white; border:1px solid var(--border); padding:10px 12px; border-radius:14px; }
          .tab-btn.active { background: var(--brand); color:white; }
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
        <div className="btn-row">
          <div className="lang-toggle" aria-label="language toggle">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>हि</button>
          </div>
          {session && <button className="btn ghost" onClick={logout}>{t.signOut}</button>}
        </div>
      </div>

      {mode === 'login' ? (
        <section className="grid login-grid">
          <div className="card hero">
            <span className="tag">Hackathon MVP</span>
            <h2>{t.loginTitle}</h2>
            <p>
              Student video learning, simple admin analytics, and a mobile-first PWA demo — built for a 30-minute pitch with mock data and no backend setup.
            </p>
            <div className="pill-row">
              <span className="pill">3 videos</span>
              <span className="pill">5 students</span>
              <span className="pill">1 school</span>
              <span className="pill">English + Hindi</span>
              <span className="pill">PWA</span>
            </div>
          </div>

          <div className="card">
            <div className="section-title">
              <h3>{t.signIn}</h3>
              <span>{t.demoCreds}</span>
            </div>
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
              <button className="btn primary" onClick={login}>{t.signIn}</button>
            </div>
            <div className="demo-box">
              <div><strong>{t.schoolId}:</strong> SCH-101</div>
              <div><strong>Admin:</strong> school@mindwell.app / demo123</div>
              <div><strong>Student:</strong> student1@mindwell.app / demo123</div>
              <div><strong>Parent:</strong> parent@mindwell.app / demo123</div>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid dashboard">
          <div className="card">
            <div className="section-title">
              <h3>{session.role === 'admin' ? t.adminDashboard : session.role === 'parent' ? t.parentStub : t.studentDashboard}</h3>
              <span>{state.school.name}</span>
            </div>

            <div className="mobile-tabs">
              <button className={`tab-btn ${selectedVideo === 'dashboard' ? 'active' : ''}`} onClick={() => setSelectedVideo('dashboard')}>{t.home}</button>
              <button className={`tab-btn ${selectedVideo === 'stats' ? 'active' : ''}`} onClick={() => setSelectedVideo('stats')}>{t.stats}</button>
            </div>

            {session.role === 'student' && (
              <>
                <div className="stat-grid" style={{ marginBottom: 16 }}>
                  <div className="stat"><div className="k">{t.completed}</div><div className="v">{completedCount}/3</div></div>
                  <div className="stat"><div className="k">{t.completion}</div><div className="v">{progressPercent}%</div></div>
                  <div className="stat"><div className="k">{t.watched}</div><div className="v">{Object.values(progressMap).filter(Boolean).length}</div></div>
                </div>
                <div className="section-title">
                  <h3>{t.videos}</h3>
                  <span>{t.progressLabel}</span>
                </div>
                <div className="video-list">
                  {demoData.videos.map((video) => {
                    const done = !!progressMap[video.id];
                    const pct = done ? 100 : 0;
                    return (
                      <div className="video" key={video.id}>
                        <div className="video-top">
                          <div>
                            <h4>{video.title[lang]}</h4>
                            <div className="sub">{video.duration} · {video.topic}</div>
                          </div>
                          <span className="tag">{done ? t.completed : 'New'}</span>
                        </div>
                        <div className="bar"><div className="fill" style={{ width: `${pct}%` }} /></div>
                        <div className="btn-row">
                          <button className="btn ghost" onClick={() => setSelectedVideo(video.id)}>▶ Play</button>
                          <button className="btn primary" onClick={() => markComplete(video.id)}>{t.markComplete}</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {session.role === 'admin' && (
              <>
                <div className="stat-grid" style={{ marginBottom: 16 }}>
                  <div className="stat"><div className="k">{t.enrolled}</div><div className="v">{adminStats.totalStudents}</div></div>
                  <div className="stat"><div className="k">{t.watchedVideos}</div><div className="v">{adminStats.totalWatched}</div></div>
                  <div className="stat"><div className="k">{t.completion}</div><div className="v">{adminStats.completion}%</div></div>
                </div>
                <div className="section-title">
                  <h3>{t.stats}</h3>
                  <span>School-wide overview</span>
                </div>
                <div className="video-list">
                  {demoData.students.map((student) => {
                    const done = Object.values(state.videoProgress[student.id] || {}).filter(Boolean).length;
                    const pct = Math.round((done / demoData.videos.length) * 100);
                    return (
                      <div className="mini-row" key={student.id}>
                        <div>
                          <strong>{student.name}</strong>
                          <div className="small">{student.className} · {student.id}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div><strong>{pct}%</strong></div>
                          <div className="small">{done}/3</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {session.role === 'parent' && (
              <div className="card" style={{ background: 'white', marginTop: 8 }}>
                <h3 style={{ marginTop: 0 }}>{t.parentStub}</h3>
                <p className="small" style={{ lineHeight: 1.7 }}>{t.parentComing}</p>
              </div>
            )}
          </div>

          <aside className="sidebar">
            <div className="card">
              <div className="section-title">
                <h3>Demo context</h3>
                <span>Vercel-ready</span>
              </div>
              <div className="mini-list">
                <div className="mini-row"><span>School</span><strong>{state.school.name}</strong></div>
                <div className="mini-row"><span>Role</span><strong>{session.role}</strong></div>
                <div className="mini-row"><span>Mobile</span><strong>Responsive</strong></div>
                <div className="mini-row"><span>PWA</span><strong>Installable</strong></div>
              </div>
            </div>
            <div className="card">
              <div className="section-title">
                <h3>Quick actions</h3>
                <span>Mock only</span>
              </div>
              <div className="btn-row">
                <button className="btn ghost" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}>Toggle language</button>
                {session.role === 'student' && <button className="btn ghost" onClick={() => setState(buildState())}>Reset progress</button>}
              </div>
            </div>
            <div className="card">
              <div className="section-title">
                <h3>Selected video</h3>
                <span>{selectedVideo}</span>
              </div>
              <div className="small">
                {demoData.videos.find((v) => v.id === selectedVideo)?.title[lang] || '—'}
              </div>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
