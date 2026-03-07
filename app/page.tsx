import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { GitHubRepo } from '@/lib/github'

const LIVE_URLS: Record<string, string> = {
  SickFits: 'https://sick-fits.vercel.app',
}

const STATIC_DATA: Record<string, Partial<GitHubRepo>> = {
  SickFits: {
    name: 'SickFits', full_name: 'devkarasel/SickFits',
    description: 'Full-stack e-commerce platform with cart, authentication, and Stripe payments.',
    html_url: 'https://github.com/devkarasel/SickFits', homepage: 'https://sick-fits.vercel.app',
    language: 'TypeScript', stargazers_count: 0, forks_count: 0,
    topics: ['nextjs', 'graphql', 'prisma', 'stripe'], updated_at: new Date().toISOString(),
  },
  'whatsapp-button': {
    name: 'whatsapp-button', full_name: 'devkarasel/whatsapp-button',
    description: 'Lightweight, customizable WhatsApp chat button widget for any website.',
    html_url: 'https://github.com/devkarasel/whatsapp-button', homepage: null,
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    topics: ['javascript', 'widget', 'whatsapp'], updated_at: new Date().toISOString(),
  },
  'dev-events-nextjs16': {
    name: 'dev-events-nextjs16', full_name: 'devkarasel/dev-events-nextjs16',
    description: 'Developer events discovery platform built with Next.js 16.',
    html_url: 'https://github.com/devkarasel/dev-events-nextjs16', homepage: null,
    language: 'TypeScript', stargazers_count: 0, forks_count: 0,
    topics: ['nextjs', 'typescript', 'tailwind'], updated_at: new Date().toISOString(),
  },
  funGames: {
    name: 'funGames', full_name: 'devkarasel/funGames',
    description: 'Collection of fun browser-based games built with JavaScript and React.',
    html_url: 'https://github.com/devkarasel/funGames', homepage: null,
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    topics: ['games', 'react', 'javascript'], updated_at: new Date().toISOString(),
  },
}

const PINNED = ['SickFits', 'whatsapp-button', 'dev-events-nextjs16', 'funGames']

async function getProjects(): Promise<GitHubRepo[]> {
  return Promise.all(
    PINNED.map(async (repo, i) => {
      try {
        const res = await fetch(`https://api.github.com/repos/devkarasel/${repo}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
          },
          next: { revalidate: 3600 },
        })
        if (!res.ok) throw new Error(`${res.status}`)
        const data: GitHubRepo = await res.json()
        return { ...data, homepage: data.homepage || LIVE_URLS[repo] || null }
      } catch {
        return { id: i, ...STATIC_DATA[repo] } as GitHubRepo
      }
    })
  )
}

export default async function Home() {
  const projects = await getProjects()
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <About />
      <Projects repos={projects} />
      <Skills />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  )
}
