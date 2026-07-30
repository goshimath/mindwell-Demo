// iSpan demo data — single source of truth.

export const school = { id: 'ISP-001', name: 'iSpan Partner School' };

export const pillars = [
  { id: 'psychology', label: 'Psychology', color: '#9B8EC4', icon: '🧠' },
  { id: 'nutrition', label: 'Nutrition', color: '#7CB87A', icon: '🍎' },
  { id: 'snc', label: 'Strength & Conditioning', color: '#C4A84D', icon: '🏋️' },
  { id: 'physiotherapy', label: 'Physiotherapy', color: '#2B5EA7', icon: '💪' },
];

export const pillarColors = {
  psychology: '#9B8EC4',
  nutrition: '#7CB87A',
  snc: '#C4A84D',
  physiotherapy: '#2B5EA7',
};

export const students = [
  { id: 's1', name: 'Aarav', grade: '5', className: '5A', pillarProgress: { psychology: 80, nutrition: 60, snc: 45, physiotherapy: 70 } },
  { id: 's2', name: 'Anaya', grade: '6', className: '6B', pillarProgress: { psychology: 90, nutrition: 75, snc: 60, physiotherapy: 85 } },
  { id: 's3', name: 'Kabir', grade: '7', className: '7A', pillarProgress: { psychology: 30, nutrition: 40, snc: 20, physiotherapy: 35 } },
  { id: 's4', name: 'Meera', grade: '8', className: '8C', pillarProgress: { psychology: 95, nutrition: 88, snc: 92, physiotherapy: 90 } },
  { id: 's5', name: 'Rohan', grade: '4', className: '4B', pillarProgress: { psychology: 65, nutrition: 50, snc: 55, physiotherapy: 60 } },
];

export const sessions = [
  { id: 'ses1', studentId: 's1', pillar: 'psychology', title: 'Mindful Breathing', duration: '12 min', completed: true, date: '2026-07-29' },
  { id: 'ses2', studentId: 's1', pillar: 'physiotherapy', title: 'Posture Basics', duration: '15 min', completed: true, date: '2026-07-29' },
  { id: 'ses3', studentId: 's2', pillar: 'nutrition', title: 'Balanced Meals', duration: '10 min', completed: true, date: '2026-07-28' },
  { id: 'ses4', studentId: 's3', pillar: 'snc', title: 'Core Strength', duration: '20 min', completed: false, date: '2026-07-30' },
  { id: 'ses5', studentId: 's4', pillar: 'psychology', title: 'Emotional Resilience', duration: '14 min', completed: true, date: '2026-07-28' },
  { id: 'ses6', studentId: 's5', pillar: 'nutrition', title: 'Indian Diet Guide', duration: '11 min', completed: true, date: '2026-07-29' },
];

export const recentActivity = [
  { id: 'a1', icon: '✅', text: 'Meera completed Psychology session', time: '2 hours ago' },
  { id: 'a2', icon: '🏋️', text: '6A started Strength & Conditioning module', time: '4 hours ago' },
  { id: 'a3', icon: '🍎', text: 'Rohan completed Nutrition session', time: 'Yesterday' },
  { id: 'a4', icon: '💪', text: 'Anaya completed Physiotherapy session', time: 'Yesterday' },
  { id: 'a5', icon: '🧠', text: '7A started Psychology module', time: '2 days ago' },
];

export const milestones = [
  { id: 'm1', icon: '🏅', text: 'Meera earned "Wellness Champion" badge', date: '2026-07-28' },
  { id: 'm2', icon: '🔥', text: 'Anaya maintained a 7-day streak', date: '2026-07-27' },
  { id: 'm3', icon: '⭐', text: 'Aarav completed first Psychology track', date: '2026-07-26' },
];

export const demoAccounts = {
  admin: { email: 'admin@ispan.in', password: 'demo123' },
  student: { email: 'student1@ispan.in', password: 'demo123' },
  parent: { email: 'parent@ispan.in', password: 'demo123' },
};

export const AVATAR_API = 'https://api.dicebear.com/7.x/avataaars/svg?seed=';

export function getStatus(pct) {
  if (pct >= 75) return 'on-track';
  if (pct >= 50) return 'review';
  return 'behind';
}

export function getStatusLabel(status) {
  const labels = { 'on-track': 'On track', review: 'Review', behind: 'Behind' };
  return labels[status] || status;
}

export function getStatusColor(status) {
  const colors = { 'on-track': '#22C55E', review: '#F59E0B', behind: '#EF4444' };
  return colors[status] || '#6B7280';
}
