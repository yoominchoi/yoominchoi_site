'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Bio & Skills', href: '/bio-skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Startups', href: '/projects' },
  { label: 'Achievements', href: '/achievements' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/bio-skills" className="font-mono text-sm font-medium tracking-tight">
          <span className="gradient-text font-bold">YC</span>
          <span className="text-zinc-500 ml-2">/ yoomin choi</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:yoominchoi02@gmail.com"
            className="text-sm px-4 py-1.5 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200"
          >
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-zinc-500 hover:text-zinc-900"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-zinc-200 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-500 hover:text-zinc-900"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
