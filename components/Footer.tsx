export default function Footer() {
  const year = new Date().getFullYear()
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certs', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ]
  const socials = [
    { label: 'GitHub', href: 'https://github.com/devkarasel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/devkarasel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { label: 'X', href: 'https://x.com/devkarasel', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { label: 'Facebook', href: 'https://facebook.com/devkarasel', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  ]

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl text-text mb-2">Khorshed Alam Rasel</p>
            <p className="text-xs font-mono text-muted mb-4">Full Stack Developer</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-mono text-accent">Available for work</span>
            </div>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent/30 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono text-muted tracking-widest uppercase mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted hover:text-text transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono text-muted tracking-widest uppercase mb-4">Get in touch</p>
            <a href="mailto:devkarasel@gmail.com"
              className="text-sm text-muted hover:text-accent transition-colors block mb-2">
              devkarasel@gmail.com
            </a>
            <p className="text-xs text-subtle font-mono">Bangladesh · Remote</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {['Next.js', 'React', 'TypeScript', 'Node.js'].map((t) => (
                <span key={t} className="tag text-[10px]">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-muted">
            © {year} <span className="text-text">Khorshed Alam Rasel</span>. All rights reserved.
          </p>
          <a href="mailto:devkarasel@gmail.com" className="text-xs font-mono text-accent hover:underline underline-offset-4">
            devkarasel@gmail.com
          </a>
          <p className="text-xs font-mono text-muted">
            Built with <span className="text-text">Next.js 15</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
