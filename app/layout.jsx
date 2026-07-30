import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'iSpan — Inspiring Stronger Minds & Bodies',
  description: 'India\'s first integrated wellness platform for schools. Psychology, physiotherapy, nutrition, and strength conditioning — for students, teachers, and parents.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'iSpan',
  },
};

export const viewport = {
  themeColor: '#0a1628',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
