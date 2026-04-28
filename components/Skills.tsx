'use client'

import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    color: 'blue',
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    category: 'Frameworks',
    color: 'cyan',
    skills: ['React', 'Node.js', 'Flask', 'Vue.js', 'SpringBoot', 'Streamlit'],
  },
  {
    category: 'Infrastructure & Cloud',
    color: 'green',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Microservices', 'AWS S3', 'AWS RDS', 'GCP', 'Firebase'],
  },
  {
    category: 'Data & AI',
    color: 'orange',
    skills: ['PostgreSQL', 'MySQL', 'RAG', 'Vector Search', 'LLM', 'Pandas', 'NumPy', 'OpenAI API'],
  },
  {
    category: 'Tools',
    color: 'blue',
    skills: ['Git', 'Figma', 'Agile / Scrum', 'Jupyter Notebook'],
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; heading: string; card: string }> = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   heading: 'text-blue-700',   card: 'border-zinc-200 hover:border-blue-200' },
  cyan:   { bg: 'bg-cyan-50',   text: 'text-cyan-700',   border: 'border-cyan-200',   heading: 'text-cyan-700',   card: 'border-zinc-200 hover:border-cyan-200' },
  green:  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', heading: 'text-emerald-700', card: 'border-zinc-200 hover:border-emerald-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', heading: 'text-orange-700', card: 'border-zinc-200 hover:border-orange-200' },
}

export default function Skills() {
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
    <section id="skills" ref={ref} className="section-fade py-24 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">Tech stack</p>
        <h2 className="text-3xl font-bold text-zinc-900">Skills</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group) => {
          const c = colorMap[group.color]
          return (
            <div
              key={group.category}
              className={`bg-white rounded-2xl p-5 border ${c.card} hover:shadow-sm transition-all duration-300`}
            >
              <h3 className={`text-xs font-mono font-semibold tracking-widest uppercase mb-4 ${c.heading}`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-sm px-3 py-1 rounded-full ${c.bg} ${c.text} border ${c.border} font-medium transition-all duration-200 hover:scale-105 cursor-default`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}

        {/* Education card */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all duration-300">
          <h3 className="text-xs font-mono font-semibold tracking-widest uppercase mb-4 text-zinc-500">
            Education
          </h3>
          <p className="text-zinc-900 font-semibold text-sm">Georgia Institute of Technology</p>
          <p className="text-zinc-700 text-sm mt-1">B.S. Computer Science — AI track</p>
          <p className="text-zinc-500 text-xs mt-1">Aug 2021 – Jul 2025</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="tag">GPA 3.7</span>
            <span className="tag tag-cyan">AI Specialization</span>
          </div>
          <p className="text-zinc-500 text-xs mt-3">
            AI · ML · Data Structures · OOP · UI/UX
          </p>
        </div>
      </div>
    </section>
  )
}
