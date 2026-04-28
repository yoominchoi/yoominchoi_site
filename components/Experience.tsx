'use client'

import { useEffect, useRef } from 'react'

const jobs = [
  {
    role: 'Software Engineer',
    company: 'Oracle',
    team: 'Cloud Infrastructure (OCI)',
    location: 'Seattle, WA',
    period: 'Sep 2025 – Present',
    type: 'full-time',
    color: 'blue',
    stack: ['Java', 'Python', 'React', 'SQL', 'Docker', 'Kubernetes', 'CI/CD'],
    bullets: [
      'Built first internal tool for Oracle engineers to automate and propagate sensitive data requests 300% faster for government work.',
      'Designed and developed Catapult\'s logging & tracking system to handle 10k+ queries/min for end users\' live status and fidelity.',
      'Developed an on-call AI system via Python and Cline to detect recurring Oracle SEV 1–4 incident patterns & prescribed runbook-based solutions to address up to 70% of false positive SEV alarms.',
    ],
  },
  {
    role: 'Software Engineer (Intern)',
    company: 'Oracle',
    team: 'Database Product Management',
    location: 'Redwood City, CA',
    period: 'May 2024 – Aug 2024',
    type: 'internship',
    color: 'cyan',
    stack: ['Python', 'Streamlit', 'Vector Search', 'SQL', 'LLM', 'RAG'],
    links: [
      { label: 'Blog', href: 'https://medium.com/@yoominchoi02/utilizing-oracle-23-ai-database-for-full-stack-app-development-with-ai-integration-dd5c199a9151' },
      { label: 'Demo', href: 'https://www.youtube.com/watch?v=Kr4Z4bmoPXA' },
      { label: 'GitHub', href: 'https://github.com/yoominchoi/oracle-emergency-console' },
    ],
    bullets: [
      'Established public safety full-stack AI web app from design to development, promoting to public via demo and blog post.',
      'Improved Llama AI model performance from 10% to 95% on summarization tasks via machine learning agent harness.',
      'Extended AI functionality by adding support for RAG-powered large language model (LLM) and vector search.',
    ],
  },
  {
    role: 'Research Assistant',
    company: 'Wis Medical',
    team: 'advised by Prof. W. Hong Yeo · GT WISH Center Lab',
    location: 'Atlanta, GA',
    period: 'Nov 2023 – Mar 2024',
    type: 'research',
    color: 'green',
    stack: ['Python', 'Flask', 'Pandas', 'NumPy', 'Vue.js', 'GCP', 'Firebase'],
    links: [
      { label: 'Wis Medical', href: 'https://wismedical.io/' },
      { label: 'CES 2024', href: 'https://www.linkedin.com/posts/wismedical-kr_ces2024-tedaid-digitalhealth-activity-7150685775037157376-83Dv/' },
    ],
    bullets: [
      'Selected as sole full-stack engineer for GT professor\'s biomedical wearable startup; dashboard work showcased at CES 2024.',
      'Deployed a patient dashboard for hospital use, integrating Google Cloud Platform & Firebase using Python Flask & Vue.js.',
      'Achieved a 30% increase in data retrieval efficiency with Pandas & NumPy via real-time data visualization.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'TeamPL Corporation',
    team: '',
    location: 'South Korea',
    period: 'Jan 2023 – Aug 2023',
    type: 'full-time',
    color: 'orange',
    stack: ['Java', 'SpringBoot', 'JavaScript', 'AWS', 'MySQL', 'S3', 'RDS'],
    bullets: [
      'Improved storage efficiency by reducing data transfer size by 92% for 280,000+ households using Java and SpringBoot.',
      'Reduced upload times by 50%, integrating real-time image editing feature of a web application with Javascript libraries.',
      'Refined search function speed by 60% with advanced filters by optimizing MySQL queries with AWS RDS and S3.',
    ],
  },
]

const colorMap: Record<string, { dot: string; border: string; tag: string; link: string }> = {
  blue:   { dot: 'bg-blue-500 ring-blue-100',    border: 'border-zinc-200 hover:border-blue-200',    tag: 'tag',           link: 'text-blue-700' },
  cyan:   { dot: 'bg-cyan-500 ring-cyan-100',    border: 'border-zinc-200 hover:border-cyan-200',    tag: 'tag tag-cyan',  link: 'text-cyan-700' },
  green:  { dot: 'bg-emerald-500 ring-emerald-100', border: 'border-zinc-200 hover:border-emerald-200', tag: 'tag tag-green', link: 'text-emerald-700' },
  orange: { dot: 'bg-orange-500 ring-orange-100', border: 'border-zinc-200 hover:border-orange-200', tag: 'tag tag-orange', link: 'text-orange-700' },
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add('visible'),
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} className="section-fade py-24 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">Where I&apos;ve worked</p>
        <h2 className="text-3xl font-bold text-zinc-900">Experience</h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-200 ml-[7px] hidden md:block" />

        <div className="flex flex-col gap-8">
          {jobs.map((job) => {
            const c = colorMap[job.color]
            return (
              <div key={`${job.company}-${job.period}`} className="md:pl-8 relative group">
                <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${c.dot} hidden md:block ring-4 group-hover:scale-125 transition-transform`} />

                <div className={`bg-white rounded-2xl p-6 border ${c.border} hover:shadow-sm transition-all duration-300`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-zinc-900 font-semibold text-lg leading-tight">{job.role}</h3>
                      <p className="text-zinc-700 text-sm mt-0.5">
                        {job.company}
                        {job.team && <span className="text-zinc-500"> · {job.team}</span>}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-mono text-zinc-500">{job.period}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{job.location}</div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="text-zinc-700 text-sm leading-relaxed flex gap-2">
                        <span className="text-zinc-400 mt-1 flex-shrink-0">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.stack.map((t) => (
                      <span key={t} className={c.tag}>{t}</span>
                    ))}
                  </div>

                  {job.links && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-zinc-200">
                      {job.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-mono ${c.link} hover:underline`}
                        >
                          ↗ {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
