import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://devrasel.me'),
  title: {
    default: 'Khorshed Alam Rasel — Full Stack Developer',
    template: '%s | Khorshed Alam Rasel',
  },
  description: 'Full-stack developer from Bangladesh specializing in Next.js, React, Node.js and modern web technologies. Available for freelance and full-time opportunities.',
  keywords: [
    'full stack developer',
    'next.js developer',
    'react developer',
    'node.js developer',
    'web developer bangladesh',
    'freelance developer',
    'devkarasel',
    'khorshed alam rasel',
  ],
  authors: [{ name: 'Khorshed Alam Rasel', url: 'https://devrasel.me' }],
  creator: 'Khorshed Alam Rasel',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/avatar.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devrasel.me',
    siteName: 'Khorshed Alam Rasel',
    title: 'Khorshed Alam Rasel — Full Stack Developer',
    description: 'Full-stack developer from Bangladesh specializing in Next.js, React, and Node.js. Available for freelance and full-time opportunities.',
    images: [
      {
        url: '/avatar.jpg',
        width: 400,
        height: 400,
        alt: 'Khorshed Alam Rasel — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khorshed Alam Rasel — Full Stack Developer',
    description: 'Full-stack developer from Bangladesh specializing in Next.js, React, and Node.js.',
    images: ['/avatar.jpg'],
    creator: '@devkarasel',
  },
  alternates: {
    canonical: 'https://devrasel.me',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Khorshed Alam Rasel',
              url: 'https://devrasel.me',
              image: 'https://devrasel.me/avatar.jpg',
              jobTitle: 'Full Stack Developer',
              description: 'Full-stack developer from Bangladesh specializing in Next.js, React, and Node.js.',
              email: 'devkarasel@gmail.com',
              nationality: 'Bangladeshi',
              sameAs: [
                'https://github.com/devkarasel',
                'https://linkedin.com/in/devkarasel',
                'https://x.com/devkarasel',
              ],
              knowsAbout: [
                'Next.js', 'React', 'TypeScript', 'Node.js',
                'MongoDB', 'GraphQL', 'Tailwind CSS', 'PostgreSQL',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}