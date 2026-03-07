'use client'

import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="divider mb-16" />

          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* Left */}
            <div>
              <p className="section-label mb-3">About</p>
              <h2 className="font-serif text-4xl md:text-5xl text-text leading-tight">
                Who I<br /><span className="italic font-normal text-muted">am</span>
              </h2>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <p className="text-muted font-sans font-light text-lg leading-relaxed">
                I&apos;m <span className="text-text font-normal">Khorshed Alam Rasel</span>, a passionate full-stack developer
                from Bangladesh. I love building digital products that are fast, accessible, and beautifully designed.
              </p>
              <p className="text-muted font-sans font-light leading-relaxed">
                My journey in web development started with curiosity and grew into a deep passion for creating
                meaningful digital experiences. I specialize in the JavaScript ecosystem — building everything
                from performant React frontends to robust Node.js APIs.
              </p>
              <p className="text-muted font-sans font-light leading-relaxed">
                When I&apos;m not coding, I&apos;m continuously learning new technologies and contributing to
                open-source projects on GitHub.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'GraphQL', 'Prisma', 'MongoDB', 'Tailwind CSS'].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <a href="https://github.com/devkarasel" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                  GitHub Profile
                </a>
                <a href="mailto:devkarasel@gmail.com" className="nav-link flex items-center gap-1.5 text-sm py-2.5">
                  devkarasel@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
