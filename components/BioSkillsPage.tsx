'use client'

import { useState } from 'react'
import ChatOverlay from '@/components/ChatOverlay'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function BioSkillsPage() {
  const [chatOpen, setChatOpen] = useState(true)

  return (
    <>
      {chatOpen && <ChatOverlay onDismiss={() => setChatOpen(false)} />}
      <main>
        <Nav />
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
