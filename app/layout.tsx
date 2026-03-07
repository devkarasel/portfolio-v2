import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Khorshed Alam Rasel — Full Stack Developer',
  description: 'Full-stack developer specializing in Next.js, React, Node.js and modern web technologies.',
  keywords: ['full stack developer', 'next.js', 'react', 'node.js', 'devkarasel'],
  icons: {
    icon: '/favicon.ico',
    apple: '/avatar.jpg',
  },
  openGraph: {
    title: 'Khorshed Alam Rasel — Full Stack Developer',
    description: 'Full-stack developer specializing in Next.js, React, and Node.js.',
    images: [{ url: '/avatar.jpg' }],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
