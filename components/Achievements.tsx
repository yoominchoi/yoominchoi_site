'use client'

import { useEffect, useRef } from 'react'
import { Trophy, Rocket, FileText, Newspaper, Users } from 'lucide-react'

const achievements = [
  {
    icon: Users,
    color: 'blue',
    title: 'Invited to Mentor @ USAII Global AI Hackathon 2026',
    subtitle: 'Virtual Mentor',
    description:
      'Invited to mentor student teams during virtual office hours, guiding real-world AI projects across community access, public systems, human safety, and AI policy with an emphasis on ethical, high-impact solutions.',
    link: null,
  },
  {
    icon: Trophy,
    color: 'orange',
    title: 'YC Startup School 2026',
    subtitle: 'Y Combinator · 2026',
    description:
      'Accepted into Y Combinator\'s Startup School 2026 — YC\'s flagship program for early-stage founders worldwide.',
    link: null,
  },
  {
    icon: Rocket,
    color: 'blue',
    title: 'CES 2024 Presenter',
    subtitle: 'Wis Medical · Atlanta, GA',
    description:
      'Selected as sole full-stack engineer for a GT professor\'s biomedical wearable startup. Patient dashboard work showcased at CES 2024 — the world\'s largest tech conference.',
    link: { label: 'View on LinkedIn', href: 'https://www.linkedin.com/posts/wismedical-kr_ces2024-tedaid-digitalhealth-activity-7150685775037157376-83Dv/' },
  },
  {
    icon: Trophy,
    color: 'cyan',
    title: 'Top 5 · GT Pitch Competition',
    subtitle: 'uniBuzzy · Georgia Tech',
    description:
      'Pitched uniBuzzy to a panel of investors and entrepreneurs at Georgia Tech\'s flagship pitch competition. Also placed Top 20 at the Inventure Prize.',
    link: null,
  },
  {
    icon: Rocket,
    color: 'green',
    title: 'CREATE-X Startup Accelerator',
    subtitle: 'Georgia Tech · Summer 2025 · $5k Grant',
    description:
      'Accepted into CREATE-X, Georgia Tech\'s official startup incubator. Pitched to an Oracle Senior Vice President and received a $5k grant.',
    link: null,
  },
  {
    icon: Users,
    color: 'orange',
    title: 'Honorary Award · 300+ Churches',
    subtitle: 'Passtory · Nationwide, South Korea',
    description:
      'Recognized with a nationwide honorary award by 300+ Korean churches for Passtory\'s affordable, hardware-free COVID protocol solution that reached 100k+ users.',
    link: null,
  },
  {
    icon: FileText,
    color: 'cyan',
    title: 'Korean Patent Filed',
    subtitle: 'KR 10-2020-0081745',
    description:
      'Filed a Korean patent for a time-based variable QR code facility entry management system — the core technology behind Passtory.',
    link: { label: 'View Patent', href: 'https://drive.google.com/file/d/1GjYiCZNrtLY-T2Ph2R8hM6KnVvDAABgv/view?usp=sharing' },
  },
  {
    icon: Newspaper,
    color: 'blue',
    title: 'National Press Coverage',
    subtitle: 'Passtory · 10+ South Korean outlets',
    description:
      'Featured in major Korean publications including Money Today, Kookmin Ilbo, and others for Passtory\'s impact during COVID.',
    link: { label: 'Read coverage', href: 'http://www.pckworld.com/article.php?aid=8587616994' },
  },
  {
    icon: Trophy,
    color: 'green',
    title: 'UKIS 2025 · Business Conference',
    subtitle: 'Only student-founded startup invited',
    description:
      'Attended UKIS 2025 as uniBuzzy — exclusively invited as the only student-founded startup among established companies.',
    link: { label: 'Instagram', href: 'https://www.instagram.com/p/DNErawWMQ-J/?img_index=3' },
  },
  {
    icon: Users,
    color: 'orange',
    title: 'GT Startup Exchange · Project Manager',
    subtitle: 'Aug 2023 – Aug 2024 · 10k+ GT students',
    description:
      'Served as Project Manager at Georgia Tech\'s Startup Exchange club, driving events and community growth for 10k+ students.',
    link: { label: 'startup.exchange', href: 'https://www.startup.exchange/' },
  },
]

const colorMap: Record<string, { icon: string; border: string; bg: string; link: string }> = {
  blue:   { icon: 'text-blue-700',    border: 'border-zinc-200 hover:border-blue-200',    bg: 'bg-blue-50',    link: 'text-blue-700' },
  cyan:   { icon: 'text-cyan-700',    border: 'border-zinc-200 hover:border-cyan-200',    bg: 'bg-cyan-50',    link: 'text-cyan-700' },
  green:  { icon: 'text-emerald-700', border: 'border-zinc-200 hover:border-emerald-200', bg: 'bg-emerald-50', link: 'text-emerald-700' },
  orange: { icon: 'text-orange-700',  border: 'border-zinc-200 hover:border-orange-200', bg: 'bg-orange-50',  link: 'text-orange-700' },
}

export default function Achievements() {
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
    <section id="achievements" ref={ref} className="section-fade py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">Recognition</p>
          <h2 className="text-3xl font-bold text-zinc-900">Achievements</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {achievements.map((a) => {
            const c = colorMap[a.color]
            const Icon = a.icon
            return (
              <div
                key={a.title}
                className={`bg-white rounded-2xl p-5 border ${c.border} hover:shadow-sm transition-all duration-300 flex flex-col`}
              >
                <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mb-3 flex-shrink-0`}>
                  <Icon size={18} className={c.icon} />
                </div>
                <h3 className="text-zinc-900 font-semibold text-sm leading-snug mb-1">{a.title}</h3>
                <p className="text-zinc-500 text-[11px] font-mono mb-2">{a.subtitle}</p>
                <p className="text-zinc-700 text-xs leading-relaxed flex-1">{a.description}</p>
                {a.link && (
                  <a
                    href={a.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 text-xs font-mono ${c.link} hover:underline`}
                  >
                    ↗ {a.link.label}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
