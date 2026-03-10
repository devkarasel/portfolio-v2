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
  bddriving: 'https://bddriving.vercel.app',
  portfoliov2: 'https://devrasel.vercel.app',
  portfolio: 'https://devkarasel.vercel.app',
  deveventsnextjs16: 'https://rasel-event.vercel.app',
  whatsappButton: 'https://whatsapp-button.vercel.app',
  funGames: 'https://fun-games.vercel.app',
  decimalToBinary: 'http://devkarasel.github.io/decimalToBinary/'
}

const STATIC_DATA: Record<string, Partial<GitHubRepo>> = {
  bddriving: {
    name: 'bddriving', full_name: 'devkarasel/bddriving',
    description: 'A driving website built with NextJS, featuring interactive maps and mongoDB integration.',
    html_url: 'https://github.com/devkarasel/bddriving', homepage: 'https://bddriving.vercel.app',
    language: 'TypeScript', stargazers_count: 0, forks_count: 0,
    topics: ['typescript', 'tailwind', 'mongodb', 'nextjs', 'maps'], updated_at: new Date().toISOString(),
  },
  portfoliov2: {
    name: 'portfolio-v2', full_name: 'devkarasel/portfolio-v2',
    description: 'My personal portfolio website built with Next.js 15 and Tailwind CSS.',
    html_url: 'https://github.com/devkarasel/portfolio-v2', homepage: 'https://devrasel.vercel.app',
    language: 'TypeScript', stargazers_count: 0, forks_count: 0,
    topics: ['nextjs', 'tailwind'], updated_at: new Date().toISOString(),
  },
  portfolio: {
    name: 'portfolio', full_name: 'devkarasel/portfolio',
    description: 'My original portfolio website built with React and hosted on vercel.',
    html_url: 'https://github.com/devkarasel/portfolio', homepage: 'https://devkarasel.vercel.app',
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    topics: ['react', 'vercel'], updated_at: new Date().toISOString(),
  },
  SickFits: {
    name: 'SickFits', full_name: 'devkarasel/SickFits',
    description: 'Full-stack e-commerce platform with cart, authentication, and Stripe payments.',
    html_url: 'https://github.com/devkarasel/SickFits', homepage: 'https://sick-fits.vercel.app',
    language: 'TypeScript', stargazers_count: 0, forks_count: 0,
    topics: ['nextjs', 'graphql', 'prisma', 'stripe'], updated_at: new Date().toISOString(),
  },
  whatsappButton: {
    name: 'whatsapp-button', full_name: 'devkarasel/whatsapp-button',
    description: 'Lightweight, customizable WhatsApp chat button widget for any website.',
    html_url: 'https://github.com/devkarasel/whatsapp-button', homepage: 'https://whatsapp-button.vercel.app',
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    topics: ['javascript', 'typescript', 'tailwind', 'widget', 'whatsapp'], updated_at: new Date().toISOString(),
  },
  deveventsnextjs16: {
    name: 'dev-events-nextjs16', full_name: 'devkarasel/dev-events-nextjs16',
    description: 'Developer events discovery platform built with Next.js 16.',
    html_url: 'https://github.com/devkarasel/dev-events-nextjs16', homepage: 'https://rasel-event.vercel.app',
    language: 'TypeScript', stargazers_count: 0, forks_count: 0,
    topics: ['nextjs', 'typescript', 'tailwind'], updated_at: new Date().toISOString(),
  },
  funGames: {
    name: 'funGames', full_name: 'devkarasel/funGames',
    description: 'Collection of fun browser-based games built with JavaScript and React. Hosted in GitHub Pages.',
    html_url: 'https://github.com/devkarasel/funGames', homepage: 'http://devkarasel.github.io/funGames/',
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    topics: ['games', 'react', 'javascript'], updated_at: new Date().toISOString(),
  },
  decimalToBinary: {
    name: 'decimalToBinary', full_name: 'devkarasel/decimalToBinary',
    description: 'A simple web app that converts decimal numbers to binary, built with JavaScript and hosted on GitHub Pages.',
    html_url: 'https://github.com/devkarasel/decimalToBinary', homepage: 'http://devkarasel.github.io/decimalToBinary/',
    language: 'JavaScript', stargazers_count: 0, forks_count: 0,
    topics: ['javascript', 'css', 'html', 'web-app'], updated_at: new Date().toISOString(),
  }
}

const PINNED = ['bddriving', 'portfoliov2', 'portfolio',  'SickFits', 'deveventsnextjs16', 'whatsappButton',  'funGames', 'decimalToBinary']

async function getProjects(): Promise<GitHubRepo[]> {
  return Promise.all(
    PINNED.map(async (repo, i) => {
      try {
        const res = await fetch(`https://api.github.com/repos/devkarasel/${repo}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
          },
          next: { revalidate: 0 },
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
