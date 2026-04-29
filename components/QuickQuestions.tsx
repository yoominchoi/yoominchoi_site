'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

const QUESTIONS: { id: string; label: string; answer: string }[] = [
  {
    id: 'built',
    label: "Tell us about things you've built.",
    answer: `I've shipped to 100k+ users.

During COVID in Korea, I built Passtory, a platform that saved time and money by streamlining national COVID protocols via time-sensitive QR codes. I got my first customer by talking to my principal and hearing out the school's problems, before we deployed it across the school. I bootstrapped everything from onboarding teachers to handling bugs as the app scaled. The platform eventually earned a Honorary Award from 300+ churches for its no-hardware, cost-free workflow, and was successfully filed as a Korean patent.

I founded uniBuzzy originally as a Georgia Tech club of 30+ students, with the intention of helping students polish their portfolios. Through intensive user research (100+ customer interviews with students/faculty), we learned to address pain points around the Georgia Tech internship/job ecosystem. We partnered with Georgia Tech College of Computing, received a $5k grant by an Oracle Senior Vice President, and were exclusively funded by CREATE-X, the Georgia Tech startup accelerator.

Website: https://unibuzzy.com/
Demo Video: https://drive.google.com/file/d/1I6uH1MGHlWeLPMl8tju2R_Uk2UjgFu_E/view?usp=sharing

At Oracle (internship), I built an AI-powered public safety web app end-to-end. It enables real-time communication, status updates, and AI-generated instructions during crises like active shooter alerts or fire alarms. I demoed it to Oracle's Senior Vice President and published it publicly.

Blog: https://medium.com/@yoominchoi02/utilizing-oracle-23-ai-database-for-full-stack-app-development-with-ai-integration-dd5c199a9151
Demo: https://www.youtube.com/watch?v=Kr4Z4bmoPXA
GitHub: https://github.com/yoominchoi/oracle-emergency-console`,
  },
  {
    id: 'hack',
    label: 'Tell me about a time you hacked a system.',
    answer: `My most successful hack was acquiring 100k+ users by focusing on institution-driven distribution instead of targeting single users.

During COVID in Korea, venues were required to manually collect handwritten logs (name, home address, phone) for contact tracing. This paper system had real vulnerabilities: personal info leaks, fake entries, and unnecessary COVID exposure. By talking to my principal, I built Passtory, an automated QR-based workflow, and officially deployed it across our school. This gave me hundreds of users at once and rapid customer feedback. With this flywheel, I expanded institution to institution, integrating teacher training, fixing live bugs, and engineering systems to reach 100k+ users. I eventually got on national news, which helped find users at a national scale.

Later, Naver (a Korean tech giant) launched a similar QR approach but tied it to paid services. This created cost and maintenance headaches for smaller stores and churches. While Naver squeezed more money out of users, I kept Passtory affordable and lightweight. That's how it spread through church networks, and why the app was eventually recognized with a Honorary Award from 300+ churches.`,
  },
  {
    id: 'stack',
    label: 'What are your tech stacks & skills?',
    answer: `Languages: Python, Java, JavaScript, TypeScript, SQL, HTML, CSS

Frameworks: React, Node.js, Flask, Vue.js, SpringBoot, Streamlit

Infrastructure & Cloud: Docker, Kubernetes, CI/CD, Microservices, AWS (RDS, S3), GCP, Firebase

AI & Data: RAG, Vector Search, LLMs, OpenAI API, Pandas, NumPy, PostgreSQL

Tools: Git, Figma, Agile/Scrum, Jupyter Notebook

I've shipped using most of these in production. Python + React is home base, but I pick up whatever the problem needs.`,
  },
  {
    id: 'now',
    label: 'What are you building right now?',
    answer: `At work I'm building AI systems and infrastructure that handles a lot of traffic. On the side, I've been getting really curious about multi-agent architectures and what you can build when agents actually coordinate with each other. More on that soon 🤫`,
  },
  {
    id: 'hobbies',
    label: 'What are your hobbies?',
    answer: `Outside of work I create content — short-form on TikTok and longer videos on YouTube — about building, startups, and life as an engineer. It’s a fun way to share what I’m learning and connect with people who care about the same things.

TikTok: https://www.tiktok.com/@yoominsdiary
YouTube: https://www.youtube.com/@yoomin-choi

For more, see the Hobbies page on this site.`,
  },
]

const URL_SPLIT = /(https?:\/\/[^\s]+)/g

function AnswerBody({ text }: { text: string }) {
  const labelFor = (url: string) => {
    if (url.includes('unibuzzy.com')) return 'Website'
    if (url.includes('drive.google.com')) return 'Demo Video'
    if (url.includes('medium.com')) return 'Blog'
    if (url.includes('youtube.com')) return 'Demo'
    if (url.includes('github.com')) return 'GitHub'
    if (url.includes('tiktok.com')) return 'TikTok'
    return 'Link'
  }
  return (
    <span className="whitespace-pre-wrap text-sm text-zinc-700 leading-relaxed">
      {text.split(URL_SPLIT).map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
          >
            {labelFor(part)}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

export default function QuickQuestions() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="quick-questions" className="py-20 max-w-6xl mx-auto px-6 border-t border-zinc-200 bg-zinc-50/50">
      <div className="mb-8">
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">Quick answers</p>
        <h2 className="text-2xl font-bold text-zinc-900">Common questions</h2>
        <p className="text-zinc-600 text-sm mt-2 max-w-2xl">
          Tap a question to expand. No chat — just straight answers.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUESTIONS.map((q) => {
          const open = openId === q.id
          return (
            <div
              key={q.id}
              className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:border-zinc-300 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : q.id)}
                className="w-full flex items-center justify-between gap-3 text-left px-4 py-3.5"
              >
                <span className="text-sm font-medium text-zinc-900">{q.label}</span>
                {open ? (
                  <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
              </button>
              {open && (
                <div className="px-4 pb-4 pt-0 border-t border-zinc-100">
                  <div className="pt-3 max-h-[min(70vh,28rem)] overflow-y-auto">
                    <AnswerBody text={q.answer} />
                    {q.id === 'hobbies' && (
                      <p className="mt-4 text-sm">
                        <Link href="/hobbies" className="font-semibold text-blue-700 hover:underline">
                          Open Hobbies page →
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
