'use client'

import { Mail, Github, Linkedin, ArrowDown, FileText } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    title: '100K+ Users Reached',
    description: 'Built and scaled systems used by 100,000+ users',
  },
  {
    title: 'CREATE-X Founder',
    description: 'Selected into Georgia Tech’s top startup accelarator program',
  },
  {
    title: 'Registered Patent',
    description: 'Invented and deployed a system for facility access management',
  },
  {
    title: 'Featured in National Media',
    description: 'Recognized for building high-impact technology products',
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#fcfcfb]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(113,113,122,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(113,113,122,0.35) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Blue radial glow top-right */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-100/80 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/70 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Software Engineer · Seattle, WA
          </div>

          {/* Name + Resume */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 leading-none">
              Yoomin Choi
            </h1>
            <a
              href="/Yoomin-Choi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300 bg-blue-50 px-6 py-3 text-base font-semibold text-blue-800 shadow-sm transition-all duration-200 hover:border-blue-400 hover:bg-blue-100 hover:text-blue-900"
            >
              <FileText size={18} />
              Resume
            </a>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 leading-snug text-zinc-900">
            <span className="gradient-text">Founder & Full-Stack Engineer</span>
            <br />
            <span className="text-zinc-500">who builds and ships at scale & loves customers.</span>
          </h2>

          <p className="text-zinc-700 text-lg leading-relaxed max-w-2xl mb-4">
            I don&apos;t wait to be told what to build. In high school I bootstrapped{' '}
            <span className="font-semibold text-zinc-900">Passtory</span> to 100k+ users and a Korean patent. At Georgia Tech I founded{' '}
            <span className="font-semibold text-zinc-900">uniBuzzy</span>, got accepted into CREATE-X, and won $10k in grants.
            <br></br>Now I&apos;m a <span className="font-semibold text-zinc-900">customer-obsessed</span> software engineer building AI systems and infrastructure at scale.
          </p>
          <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mb-10">
            I go from zero to shipped — solo if I have to.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-14">
            <a
              href="mailto:yoominchoi02@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
            >
              <Mail size={15} />
              Get in touch
            </a>
            <a
              href="https://linkedin.com/in/yoominchoi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-700 text-sm font-medium hover:text-zinc-900 hover:border-zinc-400 hover:bg-zinc-100 transition-all duration-200"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
            <a
              href="https://github.com/yoominchoi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-700 text-sm font-medium hover:text-zinc-900 hover:border-zinc-400 hover:bg-zinc-100 transition-all duration-200"
            >
              <Github size={15} />
              GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-300"
              >
                <div className="text-sm font-semibold text-zinc-900 mb-1.5 leading-snug">{s.title}</div>
                <div className="text-xs text-zinc-600 leading-relaxed">{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-600 transition-colors animate-bounce"
      >
        <span className="text-xs font-mono">scroll</span>
        <ArrowDown size={14} />
      </Link>
    </section>
  )
}
