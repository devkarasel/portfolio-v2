'use client'

import { useInView } from 'react-intersection-observer'

const CERTS = [
  {
    title: 'JavaScript Algorithms & Data Structures',
    version: 'v8',
    issuer: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/certification/dev-khorshed-alam-rasel/javascript-algorithms-and-data-structures-v8',
    skills: ['JavaScript', 'Algorithms', 'Data Structures', 'OOP'],
    year: '2024',
  },
  {
    title: 'Responsive Web Design',
    version: 'v1',
    issuer: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/certification/dev-khorshed-alam-rasel/responsive-web-design',
    skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Accessibility'],
    year: '2024',
  },
]

export default function Certificates() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="certificates" className="py-28 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="divider mb-16" />

        <div ref={ref} className={`reveal ${inView ? 'visible' : ''} mb-12`}>
          <p className="section-label mb-3">Certifications</p>
          <h2 className="font-serif text-4xl md:text-5xl text-text leading-tight">
            Verified<br /><span className="italic font-normal text-muted">credentials</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
          {CERTS.map((cert, i) => {
            const { ref: cref, inView: cInView } = useInView({ triggerOnce: true, threshold: 0.1 })
            return (
              <a
                key={cert.title}
                ref={cref}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal ${cInView ? 'visible' : ''} group bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-accent/30 transition-all duration-300`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2">
                        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-accent">{cert.issuer}</p>
                      <p className="text-xs font-mono text-muted">{cert.year}</p>
                    </div>
                  </div>
                  <svg className="text-muted group-hover:text-accent transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>

                <h3 className="font-sans font-medium text-text leading-snug">{cert.title}</h3>

                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <span key={s} className="tag text-[11px]">{s}</span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-accent mt-auto pt-2 border-t border-border">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Verify Certificate
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
