// iSpan demo data — single source of truth for all role views.

export const school = { id: 'ISP-001', name: 'iSpan Partner School' };

export const pillars = [
  {
    id: 'psychology',
    title: { en: 'Psychology & Counselling', hi: 'मनोविज्ञान और परामर्श' },
    icon: '🧠',
    description: 'Emotional balance, focus, behaviour, and overall mental wellbeing.',
  },
  {
    id: 'physiotherapy',
    title: { en: 'Physiotherapy & Posture', hi: 'फिजियोथेरेपी और मुद्रा' },
    icon: '💪',
    description: 'Movement, injury prevention, and restoring function at every stage.',
  },
  {
    id: 'nutrition',
    title: { en: 'Nutrition & Growth', hi: 'पोषण और विकास' },
    icon: '🍎',
    description: 'Personalized guidance respecting India\'s diverse food cultures.',
  },
  {
    id: 'strength',
    title: { en: 'Strength & Conditioning', hi: 'शक्ति और सुदृढ़ीकरण' },
    icon: '🏋️',
    description: 'Scientific training for general fitness and sports performance.',
  },
];

export const videos = [
  {
    id: 'mindful-breathing',
    title: { en: 'Mindful Breathing', hi: 'माइंडफुल ब्रीदिंग' },
    pillar: 'psychology',
    duration: '04:12',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: 'Breathing techniques for focus and calm.',
  },
  {
    id: 'posture-basics',
    title: { en: 'Posture Basics', hi: 'पोस्चर बेसिक्स' },
    pillar: 'physiotherapy',
    duration: '03:48',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    description: 'Daily posture correction for growing bodies.',
  },
  {
    id: 'indian-nutrition',
    title: { en: 'Indian Nutrition Guide', hi: 'भारतीय पोषण गाइड' },
    pillar: 'nutrition',
    duration: '05:05',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    description: 'Balanced meals using familiar Indian foods.',
  },
];

export const students = [
  { id: 'student1@ispan.in', name: 'Aarav', grade: '5', className: '5A', progress: { 'mindful-breathing': true, 'posture-basics': false, 'indian-nutrition': false } },
  { id: 'student2@ispan.in', name: 'Anaya', grade: '6', className: '6B', progress: { 'mindful-breathing': true, 'posture-basics': true, 'indian-nutrition': false } },
  { id: 'student3@ispan.in', name: 'Kabir', grade: '7', className: '7A', progress: { 'mindful-breathing': false, 'posture-basics': false, 'indian-nutrition': false } },
  { id: 'student4@ispan.in', name: 'Meera', grade: '8', className: '8C', progress: { 'mindful-breathing': true, 'posture-basics': true, 'indian-nutrition': true } },
  { id: 'student5@ispan.in', name: 'Rohan', grade: '4', className: '4B', progress: { 'mindful-breathing': true, 'posture-basics': false, 'indian-nutrition': true } },
];

export const demoAccounts = {
  admin: { email: 'admin@ispan.in', password: 'demo123' },
  student: { email: 'student1@ispan.in', password: 'demo123' },
  parent: { email: 'parent@ispan.in', password: 'demo123' },
};

export const AVATAR_API = 'https://api.dicebear.com/7.x/avataaars/svg?seed=';

export function percentFromProgress(progress, total = 3) {
  const done = Object.values(progress || {}).filter(Boolean).length;
  return Math.round((done / total) * 100);
}
