// iSpan demo data — updated with wellbeing program, videos, appointments

export const school = { id: 'ISP-001', name: 'iSpan Partner School' };

export const pillars = [
  { id: 'wellbeing', label: 'Wellbeing Program', color: '#2B5EA7', icon: '🧘' },
  { id: 'nutrition', label: 'Nutrition', color: '#7CB87A', icon: '🍎' },
  { id: 'snc', label: 'Strength & Conditioning', color: '#C4A84D', icon: '💪' },
  { id: 'physiotherapy', label: 'Physiotherapy', color: '#9B8EC4', icon: '🦴' },
];

export const pillarColors = {
  wellbeing: '#2B5EA7',
  nutrition: '#7CB87A',
  snc: '#C4A84D',
  physiotherapy: '#9B8EC4',
};

export const wellbeingAreas = [
  { id: 'be-well', label: 'Be Well', subtitle: 'Physical Health', icon: '🏋️', color: '#2B5EA7' },
  { id: 'be-balanced', label: 'Be Balanced', subtitle: 'Emotional Health', icon: '🧘', color: '#9B8EC4' },
  { id: 'be-connected', label: 'Be Connected', subtitle: 'Self & Others', icon: '🤝', color: '#7CB87A' },
  { id: 'be-successful', label: 'Be Successful', subtitle: 'Home & Work', icon: '🌟', color: '#C4A84D' },
];

export const curriculumVideos = [
  { id: 'v1', title: 'Managing Exam Stress', area: 'be-balanced', duration: '12 min', status: 'completed', dueDate: null, completedDate: '2026-07-25', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80' },
  { id: 'v2', title: 'Healthy Eating Habits', area: 'be-well', duration: '10 min', status: 'completed', dueDate: null, completedDate: '2026-07-26', thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80' },
  { id: 'v3', title: 'Building Resilience', area: 'be-balanced', duration: '15 min', status: 'in-progress', dueDate: '2026-08-01', completedDate: null, thumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=400&q=80' },
  { id: 'v4', title: 'Mindful Breathing', area: 'be-balanced', duration: '8 min', status: 'in-progress', dueDate: '2026-08-02', completedDate: null, thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80' },
  { id: 'v5', title: 'Posture & Stretching', area: 'be-well', duration: '14 min', status: 'not-started', dueDate: '2026-08-05', completedDate: null, thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80' },
  { id: 'v6', title: 'Teamwork & Communication', area: 'be-connected', duration: '11 min', status: 'not-started', dueDate: '2026-08-07', completedDate: null, thumbnail: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=400&q=80' },
  { id: 'v7', title: 'Goal Setting for Students', area: 'be-successful', duration: '13 min', status: 'not-started', dueDate: '2026-08-10', completedDate: null, thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80' },
  { id: 'v8', title: 'Sleep & Recovery', area: 'be-well', duration: '9 min', status: 'locked', dueDate: '2026-08-12', completedDate: null, thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80' },
];

export const experts = [
  { id: 'e1', name: 'Dr. Sneha T S', specialty: 'Child Psychology', available: ['2026-08-01', '2026-08-03', '2026-08-05'], avatar: '👩‍⚕️', color: '#9B8EC4' },
  { id: 'e2', name: 'Dr. Rajesh Kumar', specialty: 'Sports Physiotherapy', available: ['2026-08-02', '2026-08-04', '2026-08-06'], avatar: '👨‍⚕️', color: '#2B5EA7' },
  { id: 'e3', name: 'Ms. Priya Sharma', specialty: 'Nutrition & Diet', available: ['2026-08-01', '2026-08-02', '2026-08-07'], avatar: '👩‍🔬', color: '#7CB87A' },
];

export const appointments = [
  { id: 'apt1', expertId: 'e1', date: '2026-08-01', time: '10:00 AM', status: 'booked', topic: 'Exam stress management' },
  { id: 'apt2', expertId: 'e3', date: '2026-08-05', time: '2:00 PM', status: 'upcoming', topic: 'Healthy eating plan' },
];

export const trackers = [
  { id: 't1', label: 'Water Intake', icon: '💧', unit: 'glasses', target: 8, current: 5, color: '#2B5EA7' },
  { id: 't2', label: 'Fruits & Vegetables', icon: '🥗', unit: 'servings', target: 5, current: 3, color: '#7CB87A' },
  { id: 't3', label: 'Physical Activity', icon: '🏃', unit: 'minutes', target: 60, current: 35, color: '#C4A84D' },
  { id: 't4', label: 'Sleep', icon: '😴', unit: 'hours', target: 9, current: 8, color: '#9B8EC4' },
];

export const challenges = [
  { id: 'ch1', title: 'Healthy Hydration Challenge', startDate: '2026-08-03', status: 'upcoming', icon: '💧' },
  { id: 'ch2', title: '7-Day Mindfulness Streak', startDate: '2026-07-28', status: 'active', icon: '🧘' },
];

export const milestones = [
  { id: 'm1', icon: '🏅', text: 'Completed "Managing Exam Stress"', date: '2026-07-25' },
  { id: 'm2', icon: '🔥', text: 'Maintained a 5-day streak', date: '2026-07-27' },
  { id: 'm3', icon: '⭐', text: 'First Nutrition video done', date: '2026-07-26' },
];

export const students = [
  { id: 's1', name: 'Aarav', grade: '5', className: '5A', pillarProgress: { wellbeing: 80, nutrition: 60, snc: 45, physiotherapy: 70 } },
  { id: 's2', name: 'Anaya', grade: '6', className: '6B', pillarProgress: { wellbeing: 90, nutrition: 75, snc: 60, physiotherapy: 85 } },
  { id: 's3', name: 'Kabir', grade: '7', className: '7A', pillarProgress: { wellbeing: 30, nutrition: 40, snc: 20, physiotherapy: 35 } },
  { id: 's4', name: 'Meera', grade: '8', className: '8C', pillarProgress: { wellbeing: 95, nutrition: 88, snc: 92, physiotherapy: 90 } },
  { id: 's5', name: 'Rohan', grade: '4', className: '4B', pillarProgress: { wellbeing: 65, nutrition: 50, snc: 55, physiotherapy: 60 } },
];

export const sessions = [
  { id: 'ses1', studentId: 's1', pillar: 'wellbeing', title: 'Mindful Breathing', duration: '12 min', completed: true, date: '2026-07-29' },
  { id: 'ses2', studentId: 's1', pillar: 'physiotherapy', title: 'Posture Basics', duration: '15 min', completed: true, date: '2026-07-29' },
  { id: 'ses3', studentId: 's2', pillar: 'nutrition', title: 'Balanced Meals', duration: '10 min', completed: true, date: '2026-07-28' },
  { id: 'ses4', studentId: 's3', pillar: 'snc', title: 'Core Strength', duration: '20 min', completed: false, date: '2026-07-30' },
  { id: 'ses5', studentId: 's4', pillar: 'wellbeing', title: 'Emotional Resilience', duration: '14 min', completed: true, date: '2026-07-28' },
];

export const recentActivity = [
  { id: 'a1', icon: '✅', text: 'Meera completed Wellbeing session', time: '2 hours ago' },
  { id: 'a2', icon: '💪', text: '6A started S&C module', time: '4 hours ago' },
  { id: 'a3', icon: '🍎', text: 'Rohan completed Nutrition session', time: 'Yesterday' },
  { id: 'a4', icon: '🦴', text: 'Anaya completed Physiotherapy session', time: 'Yesterday' },
  { id: 'a5', icon: '🧘', text: '7A started Wellbeing module', time: '2 days ago' },
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
