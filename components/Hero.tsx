'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setTimeout(() => el.classList.add('visible'), 100)
  }, [])

  return (
    <section className="min-h-screen flex items-center pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div ref={ref} className="reveal order-2 md:order-1">
            {/* Status */}
            <div className="flex items-center gap-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-mono text-accent tracking-widest">Available for work</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-text leading-[1.1] mb-6">
              Khorshed<br />
              <span className="italic text-muted font-normal">Alam</span> Rasel
            </h1>

            <p className="text-muted text-lg font-sans font-light leading-relaxed mb-4 max-w-md">
              Full-stack developer building fast, modern web applications with
              <span className="text-text"> Next.js</span>,
              <span className="text-text"> React</span>, and
              <span className="text-text"> Node.js</span>.
            </p>

            <p className="text-subtle text-sm font-mono mb-10">
              Based in Bangladesh · Remote friendly
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                View Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-10 pt-10 border-t border-border">
              {[
                { href: 'https://github.com/devkarasel', label: 'GitHub', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                { href: 'https://linkedin.com/in/devkarasel', label: 'LinkedIn', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: 'https://x.com/devkarasel', label: 'X', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href: 'https://facebook.com/devkarasel', label: 'Facebook', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="text-muted hover:text-text transition-colors duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end"
            style={{ animation: 'fadeIn 1s ease 0.3s both' }}>
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(74,222,128,0.15) 0%, transparent 70%)' }} />
              
              {/* Photo */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/profile.jpg"
                  alt="Khorshed Alam Rasel"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-surface border border-border px-4 py-2.5 rounded-xl shadow-xl">
                <p className="text-xs font-mono text-muted">Full Stack</p>
                <p className="text-sm font-sans font-medium text-text">Developer</p>
              </div>

              {/* Decorative dot grid */}
              <div className="absolute -top-4 -right-4 grid grid-cols-4 gap-1.5 opacity-30">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-accent" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-24 pt-10 border-t border-border max-w-sm"
          style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}>
          {[
            { num: '4+', label: 'Projects' },
            { num: '3+', label: 'Years' },
            { num: '2', label: 'Certifications' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl text-text">{s.num}</div>
              <div className="text-xs text-muted font-mono mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
