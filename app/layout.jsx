import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata = {
  title: 'MindWell MVP',
  description: 'School mental wellbeing demo for Indian K-12 schools',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MindWell',
  },
};

export const viewport = {
  themeColor: '#0f766e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
