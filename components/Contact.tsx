'use client'

import { useEffect, useRef } from 'react'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function Contact() {
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
    <section id="contact" ref={ref} className="section-fade py-24 bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-3">Let&apos;s connect</p>
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Get In Touch</h2>
          <p className="text-zinc-700 leading-relaxed mb-8">
            Open to new opportunities and always happy to chat about engineering, startups, or building things that actually ship.
          </p>

          <a
            href="mailto:yoominchoi02@gmail.com"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-colors duration-200 mb-8 text-sm"
          >
            <Mail size={16} />
            yoominchoi02@gmail.com
          </a>

          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/yoominchoi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2 rounded-full border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
            <a
              href="https://github.com/yoominchoi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2 rounded-full border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100"
            >
              <Github size={15} />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Yoomin Choi. All rights reserved.</p>
          <p className="font-mono">Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </section>
  )
}
