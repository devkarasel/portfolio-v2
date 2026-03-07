'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-border' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
            <Image src="/avatar.jpg" alt="Rasel" width={32} height={32} className="object-cover" />
          </div>
          <span className="font-serif text-sm text-text">Khorshed Alam Rasel</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary text-xs py-2 px-5">
            Hire Me
          </a>
        </nav>

        {/* Mobile burger */}
        <button className="md:hidden p-2 text-muted" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav-link text-base">{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary self-start">Hire Me</a>
        </div>
      )}
    </header>
  )
}
