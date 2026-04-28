'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, Instagram, ChevronDown, ChevronUp } from 'lucide-react'

const projects = [
  {
    name: 'uniBuzzy',
    tagline: 'AI-powered internship & job platform for GT students',
    description:
      'Founded as a Georgia Tech club of 30+ students. After 100+ customer interviews with students and faculty, we partnered with GT College of Computing, won Top 5 at GT Pitch Competition, Top 20 at Inventure Prize, and received $10k in grants. Accepted into CREATE-X — GT\'s official startup accelerator. I solely built and owned the entire backend.',
    stack: ['OpenAI API', 'Python', 'React', 'TypeScript', 'PostgreSQL'],
    links: [
      { label: 'Website', href: 'https://unibuzzy.com/', icon: 'web' },
    ],
    instagram: [
      'https://www.instagram.com/p/DN8Rq1AjUIY/?img_index=1',
      'https://www.instagram.com/p/DNErawWMQ-J/?img_index=1',
      'https://www.instagram.com/p/DKsCti5Js5t/',
      'https://www.instagram.com/p/DKCKViTuLv1/',
      'https://www.instagram.com/p/DHGw7G-Addg/?img_index=1',
      'https://www.instagram.com/p/C04VKGEL5cI/?img_index=1',
    ],
    badges: ['CREATE-X Funded', 'Top 5 GT Pitch', '$10k Grants', 'Partnered w/ GT CoC'],
    color: 'blue',
    featured: true,
  },
  {
    name: 'Passtory',
    tagline: 'COVID QR protocol app · 100k+ users · Korean patent',
    description:
      'Built during COVID in high school — solo. Replaced paper sign-in sheets with time-sensitive QR codes across schools, churches, and stores. Grew institution-to-institution, earned national press coverage in 10+ Korean outlets, recognized with a Honorary Award by 300+ churches, and filed as Korean patent KR 10-2020-0081745.',
    stack: ['Java', 'Vue.js', 'Firebase', 'Figma'],
    links: [
      { label: 'Patent', href: 'https://drive.google.com/file/d/1GjYiCZNrtLY-T2Ph2R8hM6KnVvDAABgv/view?usp=sharing', icon: 'web' },
    ],
    badges: ['100k+ Users', 'Patent Filed', 'National Press', 'Honorary Award'],
    color: 'orange',
    featured: true,
  },
  {
    name: 'Oracle Public Safety Console',
    tagline: 'AI-powered emergency alert web app · demoed to Oracle SVP',
    description:
      'Built end-to-end during Oracle internship: a full-stack AI public safety app enabling real-time communication and AI-generated crisis instructions (active shooter, fire, etc.). Demoed to Oracle\'s Senior VP. Published openly with blog and demo.',
    stack: ['Python', 'Streamlit', 'Oracle 23ai', 'Vector Search', 'LLM', 'RAG'],
    links: [
      { label: 'Blog', href: 'https://medium.com/@yoominchoi02/utilizing-oracle-23-ai-database-for-full-stack-app-development-with-ai-integration-dd5c199a9151', icon: 'web' },
      { label: 'Demo', href: 'https://www.youtube.com/watch?v=Kr4Z4bmoPXA', icon: 'web' },
      { label: 'GitHub', href: 'https://github.com/yoominchoi/oracle-emergency-console', icon: 'github' },
    ],
    badges: ['Demoed to SVP', 'Published Publicly'],
    color: 'cyan',
    featured: false,
  },
  {
    name: 'Wis Medical Dashboard',
    tagline: 'Biomedical wearable dashboard · showcased at CES 2024',
    description:
      'Sole full-stack engineer for a GT professor\'s biomedical wearable startup. Built a real-time patient dashboard integrating GCP & Firebase. Work showcased at CES 2024 — the world\'s largest tech conference.',
    stack: ['Python', 'Flask', 'Vue.js', 'GCP', 'Firebase', 'Pandas', 'NumPy'],
    links: [
      { label: 'Wis Medical', href: 'https://wismedical.io/', icon: 'web' },
      { label: 'CES 2024', href: 'https://www.linkedin.com/posts/wismedical-kr_ces2024-tedaid-digitalhealth-activity-7150685775037157376-83Dv/', icon: 'web' },
    ],
    badges: ['CES 2024', 'Research'],
    color: 'green',
    featured: false,
  },
]

const colorMap: Record<string, { border: string; badge: string; link: string }> = {
  blue:   { border: 'border-zinc-200 hover:border-blue-200',    badge: 'tag',           link: 'text-blue-700' },
  orange: { border: 'border-zinc-200 hover:border-orange-200', badge: 'tag tag-orange', link: 'text-orange-700' },
  cyan:   { border: 'border-zinc-200 hover:border-cyan-200',    badge: 'tag tag-cyan',  link: 'text-cyan-700' },
  green:  { border: 'border-zinc-200 hover:border-emerald-200', badge: 'tag tag-green', link: 'text-emerald-700' },
}

function InstagramEmbed({ url }: { url: string }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ margin: 0, minWidth: 0, width: '100%' }}
    />
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('visible')
          if (typeof window !== 'undefined' && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process()
          }
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={ref} className="section-fade py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">What I&apos;ve built</p>
          <h2 className="text-3xl font-bold text-zinc-900">Projects & Startups</h2>
        </div>

        <div className="flex flex-col gap-6 mb-6">
          {/* uniBuzzy — full width with horizontal Instagram scroll */}
          {(() => {
            const p = featured[0]
            const c = colorMap[p.color]
            return (
              <div className={`bg-white rounded-2xl border ${c.border} hover:shadow-sm transition-all duration-300 overflow-hidden`}>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-zinc-900 font-bold text-2xl">{p.name}</h3>
                        <span className="text-xs text-zinc-500 font-mono">@unibuzzy</span>
                      </div>
                      <p className="text-zinc-600 text-sm font-mono">{p.tagline}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label={l.label}>
                          <ExternalLink size={16} />
                        </a>
                      ))}
                      <a href="https://www.instagram.com/unibuzzy/" target="_blank" rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-pink-500 transition-colors" aria-label="Instagram">
                        <Instagram size={16} />
                      </a>
                    </div>
                  </div>

                  <p className="text-zinc-700 text-sm leading-relaxed mb-4">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.badges.map((b) => (
                      <span key={b} className={`${c.badge} text-[10px]`}>{b}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pb-4 border-b border-zinc-200">
                    {p.stack.map((t) => (
                      <span key={t} className="font-mono text-[10px] text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200">{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                        className={`text-xs font-mono ${c.link} hover:underline`}>
                        ↗ {l.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Instagram embeds — horizontal scroll */}
                {p.instagram && (
                  <div className="border-t border-zinc-200 px-6 py-5 bg-zinc-50/70">
                    <div className="flex items-center gap-2 mb-4">
                      <Instagram size={14} className="text-pink-400" />
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">From @unibuzzy</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '16px',
                        paddingBottom: '8px',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {p.instagram.map((url) => (
                        <div
                          key={url}
                          style={{
                            flexShrink: 0,
                            width: '320px',
                            scrollSnapAlign: 'start',
                          }}
                        >
                          <InstagramEmbed url={url} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}

          {/* Passtory — expandable */}
          {(() => {
            const p = featured[1]
            const c = colorMap[p.color]
            const isOpen = expanded === p.name
            return (
              <div className={`bg-white rounded-2xl border ${c.border} hover:shadow-sm transition-all duration-300 overflow-hidden`}>
                <button
                  className="w-full text-left p-6"
                  onClick={() => setExpanded(isOpen ? null : p.name)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-zinc-900 font-bold text-xl mb-0.5">{p.name}</h3>
                      <p className="text-zinc-500 text-xs font-mono mb-2">{p.tagline}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.badges.map((b) => (
                          <span key={b} className={`${c.badge} text-[10px]`}>{b}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label={l.label}>
                          <ExternalLink size={15} />
                        </a>
                      ))}
                      {isOpen ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 border-t border-zinc-200">
                    <p className="text-zinc-700 text-sm leading-relaxed mt-4 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-200">
                      {p.stack.map((t) => (
                        <span key={t} className="font-mono text-[10px] text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-4">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                          className={`text-xs font-mono ${c.link} hover:underline`}>
                          ↗ {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}
        </div>

        {/* Rest — 2 column, expandable */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((p) => {
            const c = colorMap[p.color]
            const isOpen = expanded === p.name
            return (
              <div key={p.name} className={`bg-white rounded-2xl border ${c.border} hover:shadow-sm transition-all duration-300 overflow-hidden`}>
                <button
                  className="w-full text-left p-5"
                  onClick={() => setExpanded(isOpen ? null : p.name)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-zinc-900 font-semibold text-base mb-0.5">{p.name}</h3>
                      <p className="text-zinc-500 text-[11px] font-mono mb-2">{p.tagline}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.badges.map((b) => (
                          <span key={b} className={`${c.badge} text-[10px]`}>{b}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-zinc-500 hover:text-zinc-900 transition-colors" aria-label={l.label}>
                          {l.icon === 'github' ? <Github size={14} /> : <ExternalLink size={14} />}
                        </a>
                      ))}
                      {isOpen ? <ChevronUp size={15} className="text-zinc-500" /> : <ChevronDown size={15} className="text-zinc-500" />}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-zinc-200">
                    <p className="text-zinc-700 text-sm leading-relaxed mt-4 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1 pt-3 border-t border-zinc-200">
                      {p.stack.map((t) => (
                        <span key={t} className="font-mono text-[10px] text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-3">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                          className={`text-xs font-mono ${c.link} hover:underline`}>
                          ↗ {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
