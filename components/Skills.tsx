'use client'

import { useInView } from 'react-intersection-observer'

const SKILLS = [
  {
    category: 'Frontend',
    items: [
      { name: 'Next.js / React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML / CSS', level: 95 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'GraphQL', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'Prisma / ORM', level: 80 },
    ],
  },
  {
    category: 'Database & Tools',
    items: [
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker / cPanel', level: 65 },
    ],
  },
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-text font-sans">{name}</span>
        <span className="text-xs font-mono text-muted">{level}%</span>
      </div>
      <div className="h-0.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="divider mb-16" />

        <div ref={ref} className={`reveal ${inView ? 'visible' : ''} mb-12`}>
          <p className="section-label mb-3">Skills</p>
          <h2 className="font-serif text-4xl md:text-5xl text-text leading-tight">
            Tech<br /><span className="italic font-normal text-muted">stack</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-mono text-muted tracking-widest uppercase mb-6">{group.category}</p>
              <div className="space-y-5">
                {group.items.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 80} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-xs font-mono text-muted tracking-widest uppercase mb-5">Tools & Platforms</p>
          <div className="flex flex-wrap gap-2">
            {['VS Code', 'Figma', 'Postman', 'Vercel', 'cPanel', 'Stripe', 'Cloudinary', 'GitHub Actions', 'SendGrid'].map((t) => (
              <span key={t} className="tag hover:border-accent/30 hover:text-text transition-colors cursor-default">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
