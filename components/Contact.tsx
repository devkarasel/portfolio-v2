'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/devkarasel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/devkarasel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'X', href: 'https://x.com/devkarasel', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Facebook', href: 'https://facebook.com/devkarasel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="divider mb-16" />

        <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16">
            {/* Left */}
            <div>
              <p className="section-label mb-3">Contact</p>
              <h2 className="font-serif text-4xl md:text-5xl text-text leading-tight mb-6">
                Let&apos;s<br /><span className="italic font-normal text-muted">work together</span>
              </h2>
              <p className="text-muted font-light leading-relaxed mb-8 text-sm">
                Have a project in mind or just want to say hello? I&apos;d love to hear from you.
                I&apos;m currently available for freelance work and full-time opportunities.
              </p>

              <div className="space-y-3 mb-8">
                <a href="mailto:devkarasel@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted hover:text-text transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:border-accent/30 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  devkarasel@gmail.com
                </a>
              </div>

              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent/30 transition-all duration-200">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted tracking-widest uppercase mb-2 block">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="form-field" />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted tracking-widest uppercase mb-2 block">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="form-field" />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted tracking-widest uppercase mb-2 block">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry..." className="form-field" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted tracking-widest uppercase mb-2 block">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..." className="form-field resize-none" />
              </div>
              <button onClick={handleSubmit} disabled={status === 'sending'}
                className="btn-primary w-full justify-center disabled:opacity-50">
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status === 'idle' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
              </button>
              {status === 'success' && <p className="text-xs font-mono text-accent text-center">✓ Message sent! I&apos;ll get back to you soon.</p>}
              {status === 'error' && <p className="text-xs font-mono text-red-400 text-center">✗ Something went wrong. Email me directly.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
