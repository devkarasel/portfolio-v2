'use client'

import { useInView } from 'react-intersection-observer'
import type { GitHubRepo } from '@/lib/github'

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  CSS: '#563D7C',
  HTML: '#E34C26',
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} group bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-accent/30 transition-all duration-300 cursor-pointer`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => {
        const url = repo.homepage || repo.html_url
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-muted group-hover:text-accent transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <div className="flex gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors relative z-10"
            aria-label="GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors relative z-10"
              aria-label="Live"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-sans font-medium text-text mb-2">{repo.name}</h3>
        <p className="text-muted text-sm font-light leading-relaxed">
          {repo.description || 'A software project by devkarasel.'}
        </p>
      </div>

      {/* Tags */}
      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="tag text-[11px]">{t}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 pt-3 border-t border-border text-xs font-mono text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] || '#888' }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          {repo.stargazers_count}
        </span>
      </div>
    </div>
  )
}

export default function Projects({ repos }: { repos: GitHubRepo[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" className="py-28 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="divider mb-16" />

        <div ref={ref} className={`reveal ${inView ? 'visible' : ''} flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12`}>
          <div>
            <p className="section-label mb-3">Projects</p>
            <h2 className="font-serif text-4xl md:text-5xl text-text leading-tight">
              Selected<br /><span className="italic font-normal text-muted">work</span>
            </h2>
          </div>
          <a href="https://github.com/devkarasel" target="_blank" rel="noopener noreferrer"
            className="btn-outline self-start md:self-auto text-sm">
            All Repos ↗
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {repos.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}