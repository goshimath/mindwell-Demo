// Shared demo data — single source of truth for all role views.
// Replace with real API calls when backend is ready.

export const school = { id: 'SCH-101', name: 'MindWell Public School' };

export const videos = [
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
];

export const students = [
  { id: 'student1@mindwell.app', name: 'Aarav', grade: '5', className: '5A', progress: { stress: true, mindfulness: false, resilience: false } },
  { id: 'student2@mindwell.app', name: 'Anaya', grade: '6', className: '6B', progress: { stress: true, mindfulness: true, resilience: false } },
  { id: 'student3@mindwell.app', name: 'Kabir', grade: '7', className: '7A', progress: { stress: false, mindfulness: false, resilience: false } },
  { id: 'student4@mindwell.app', name: 'Meera', grade: '8', className: '8C', progress: { stress: true, mindfulness: true, resilience: true } },
  { id: 'student5@mindwell.app', name: 'Rohan', grade: '4', className: '4B', progress: { stress: true, mindfulness: false, resilience: true } },
];

export const demoAccounts = {
  admin: { email: 'school@mindwell.app', password: 'demo123' },
  student: { email: 'student1@mindwell.app', password: 'demo123' },
  parent: { email: 'parent@mindwell.app', password: 'demo123' },
};

export const AVATAR_API = 'https://api.dicebear.com/7.x/avataaars/svg?seed=';

export function percentFromProgress(progress, total = 3) {
  const done = Object.values(progress || {}).filter(Boolean).length;
  return Math.round((done / total) * 100);
}
