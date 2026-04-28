'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, ArrowRight, ArrowUpRight } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  "Tell us about things you've built.",
  "Tell me about a time you hacked a system.",
  "What are your tech stacks & skills?",
  "What are you building right now?",
]

const RESPONSES: Record<string, string> = {
  "Tell us about things you've built.": `I've shipped to 100k+ users.

During COVID in Korea, I built Passtory, a platform that saved time and money by streamlining national COVID protocols via time-sensitive QR codes. I got my first customer by talking to my principal and hearing out the school's problems, before we deployed it across the school. I bootstrapped everything from onboarding teachers to handling bugs as the app scaled. The platform eventually earned a Honorary Award from 300+ churches for its no-hardware, cost-free workflow, and was successfully filed as a Korean patent.

I founded uniBuzzy originally as a Georgia Tech club of 30+ students, with the intention of helping students polish their portfolios. Through intensive user research (100+ customer interviews with students/faculty), we learned to address pain points around the Georgia Tech internship/job ecosystem. We partnered with Georgia Tech College of Computing, received a $5k grant by an Oracle Senior Vice President, and were exclusively funded by CREATE-X, the Georgia Tech startup accelerator.

Website: https://unibuzzy.com/
Demo Video: https://drive.google.com/file/d/1I6uH1MGHlWeLPMl8tju2R_Uk2UjgFu_E/view?usp=sharing

At Oracle (internship), I built an AI-powered public safety web app end-to-end. It enables real-time communication, status updates, and AI-generated instructions during crises like active shooter alerts or fire alarms. I demoed it to Oracle's Senior Vice President and published it publicly.

Blog: https://medium.com/@yoominchoi02/utilizing-oracle-23-ai-database-for-full-stack-app-development-with-ai-integration-dd5c199a9151
Demo: https://www.youtube.com/watch?v=Kr4Z4bmoPXA
GitHub: https://github.com/yoominchoi/oracle-emergency-console`,

  "Tell me about a time you hacked a system.": `My most successful hack was acquiring 100k+ users by focusing on institution-driven distribution instead of targeting single users.

During COVID in Korea, venues were required to manually collect handwritten logs (name, home address, phone) for contact tracing. This paper system had real vulnerabilities: personal info leaks, fake entries, and unnecessary COVID exposure. By talking to my principal, I built Passtory, an automated QR-based workflow, and officially deployed it across our school. This gave me hundreds of users at once and rapid customer feedback. With this flywheel, I expanded institution to institution, integrating teacher training, fixing live bugs, and engineering systems to reach 100k+ users. I eventually got on national news, which helped find users at a national scale.

Later, Naver (a Korean tech giant) launched a similar QR approach but tied it to paid services. This created cost and maintenance headaches for smaller stores and churches. While Naver squeezed more money out of users, I kept Passtory affordable and lightweight. That's how it spread through church networks, and why the app was eventually recognized with a Honorary Award from 300+ churches.`,

  "What are your tech stacks & skills?": `Languages: Python, Java, JavaScript, TypeScript, SQL, HTML, CSS

Frameworks: React, Node.js, Flask, Vue.js, SpringBoot, Streamlit

Infrastructure & Cloud: Docker, Kubernetes, CI/CD, Microservices, AWS (RDS, S3), GCP, Firebase

AI & Data: RAG, Vector Search, LLMs, OpenAI API, Pandas, NumPy, PostgreSQL

Tools: Git, Figma, Agile/Scrum, Jupyter Notebook

I've shipped using most of these in production. Python + React is home base, but I pick up whatever the problem needs.`,

  "What are you building right now?": `At work I'm building AI systems and infrastructure that handles a lot of traffic. On the side, I've been getting really curious about multi-agent architectures and what you can build when agents actually coordinate with each other. More on that soon 🤫`,
}

const FALLBACK_RESPONSES = [
  "Great question. I may not have a perfect answer for that one here, but I can still share how I usually think about it: start small, validate quickly, and ship fast.",
  "I like that question. I can give a quick take, and if you want the full context on my work and approach, my portfolio covers it end to end.",
  "Solid question. I don't have a dedicated canned answer for that, but I'm happy to keep chatting about my projects, background, and how I build.",
]

const PORTFOLIO_NUDGE =
  "\n\nYou've asked a lot of great questions. For the full picture, check out my portfolio."

const INTENT_RESPONSES: Array<{ pattern: RegExp; response: string }> = [
  {
    pattern: /\b(how are (you|u)|how's it going|hows it going|sup|what's up|whats up)\b/i,
    response:
      "I’m doing great, thanks for asking :) I’m here and happy to chat about my projects, startup journey, and engineering work.",
  },
  {
    pattern: /\b(hello|hi|hey|yo)\b/i,
    response:
      "Hey! Great to meet you. Ask me anything about what I’ve built, my experience, or what I’m working on now.",
  },
  {
    pattern: /\b(thank you|thanks|thx)\b/i,
    response:
      "Of course — happy to help. If you want a deeper look, I can also point you to specific portfolio sections.",
  },
]

const normalizeInput = (text: string) =>
  text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim()

const getIntentResponse = (text: string) => {
  const normalized = normalizeInput(text)
  return INTENT_RESPONSES.find(({ pattern }) => pattern.test(normalized))?.response
}

function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const labelFor = (url: string) => {
    if (url.includes('unibuzzy.com')) return 'Website'
    if (url.includes('drive.google.com')) return 'Demo Video'
    if (url.includes('medium.com')) return 'Blog'
    if (url.includes('youtube.com')) return 'Demo'
    if (url.includes('github.com')) return 'GitHub'
    return 'Link'
  }
  return (
    <span className="whitespace-pre-wrap">
      {text.split(urlRegex).map((part, i) =>
        urlRegex.test(part) ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer"
            style={{
              textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 600,
              color: isUser ? '#1d4ed8' : '#4338ca',
              transition: 'opacity 0.15s',
            }}>
            {labelFor(part)}
          </a>
        ) : part
      )}
    </span>
  )
}

export default function ChatOverlay({ onDismiss }: { onDismiss: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [remaining, setRemaining] = useState([...SUGGESTED])
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [hasConversation, setHasConversation] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleDismiss = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setLeaving(true)
    setTimeout(onDismiss, 500)
  }

  const sendMessage = (text: string) => {
    if (!text.trim() || typing) return
    const nextQuestionCount = questionCount + 1
    setQuestionCount(nextQuestionCount)
    setHasConversation(true)
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }])
    setInput('')
    setRemaining(prev => prev.filter(q => q !== text))
    setTyping(true)

    setTimeout(() => {
      const fallbackIndex = (nextQuestionCount - 1) % FALLBACK_RESPONSES.length
      const baseResponse =
        RESPONSES[text] ??
        getIntentResponse(text) ??
        FALLBACK_RESPONSES[fallbackIndex]
      const responseText =
        nextQuestionCount > 5 ? `${baseResponse}${PORTFOLIO_NUDGE}` : baseResponse
      setTyping(false)
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: responseText }])
    }, 900 + Math.random() * 600)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
      style={{
        opacity: leaving ? 0 : visible ? 1 : 0,
        transform: leaving ? 'scale(0.99)' : 'scale(1)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        background: '#fafafa',
      }}
    >
      {/* Subtle radial vignette — not animated, not neon */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)',
      }} />

      {/* Header */}
      <div style={{
        borderBottom: '1px solid #e4e4e7',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, position: 'relative',
        background: '#ffffff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#2563eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '13px', fontWeight: 700,
            }}>Y</div>
            <div style={{
              position: 'absolute', bottom: 1, right: 1,
              width: '9px', height: '9px', borderRadius: '50%',
              background: '#22c55e', border: '2px solid #ffffff',
            }} />
          </div>
          <div>
            <p style={{ color: '#18181b', fontWeight: 600, fontSize: '15px', lineHeight: 1.2 }}>Yoomin Choi</p>
            <p style={{ color: '#71717a', fontSize: '12px', marginTop: '1px' }}>Software Engineer · Founder</p>
          </div>
        </div>
        <button onClick={handleDismiss} style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          color: '#71717a', fontSize: '13px', fontWeight: 500,
          background: 'none', border: 'none', cursor: 'pointer',
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#27272a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}
        >
          View portfolio <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Hero state */}
      {!hasConversation && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '40px 24px', gap: '36px',
          position: 'relative',
        }}>
          {/* Greeting */}
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{
              fontSize: '64px', lineHeight: 1.1,
              animation: 'heroIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0,
            }}>
              👋
            </div>
            <h1 style={{
              fontSize: '32px', fontWeight: 700, color: '#18181b',
              letterSpacing: '-0.5px', marginTop: '12px', lineHeight: 1.2,
              animation: 'heroIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s forwards', opacity: 0,
            }}>
              Hi, I&apos;m Yoomin
            </h1>
            <p style={{
              fontSize: '16px', color: '#52525b', marginTop: '10px', lineHeight: 1.6,
              animation: 'heroIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards', opacity: 0,
            }}>
              Founder, software engineer, and builder. Ask me anything or check out my full portfolio.
            </p>
          </div>

          {/* GO TO PORTFOLIO — primary CTA */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '480px',
            animation: 'heroIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s forwards', opacity: 0,
          }}>
            <button onClick={handleDismiss} style={{
              width: '100%',
              padding: '16px 32px',
              fontSize: '16px', fontWeight: 600,
              background: '#18181b', color: '#fafafa',
              border: 'none', borderRadius: '12px',
              cursor: 'pointer', letterSpacing: '0.01em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#27272a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#18181b')}
            >
              Go to Portfolio <ArrowRight size={16} />
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <div style={{ flex: 1, height: '1px', background: '#e4e4e7' }} />
              <span style={{ fontSize: '12px', color: '#71717a' }}>or ask me something</span>
              <div style={{ flex: 1, height: '1px', background: '#e4e4e7' }} />
            </div>

            {/* Suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              {remaining.map((q, i) => (
                <button key={q} onClick={() => sendMessage(q)}
                  style={{
                    width: '100%', textAlign: 'left',
                    fontSize: '14px', padding: '11px 16px', borderRadius: '10px',
                    border: '1px solid #e4e4e7',
                    background: '#ffffff',
                    color: '#52525b', cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    animation: 'heroIn 0.5s ease forwards',
                    animationDelay: `${i * 60 + 400}ms`,
                    opacity: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f4f4f5'
                    e.currentTarget.style.borderColor = '#d4d4d8'
                    e.currentTarget.style.color = '#18181b'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#ffffff'
                    e.currentTarget.style.borderColor = '#e4e4e7'
                    e.currentTarget.style.color = '#52525b'
                  }}
                >{q}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conversation state */}
      {hasConversation && (
        <div className="flex-1 overflow-y-auto px-4 py-8 max-w-2xl w-full mx-auto" style={{ scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: 'flex', gap: '10px',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'msgIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0,
              }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                    background: '#2563eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '12px', fontWeight: 700, marginTop: '2px',
                  }}>Y</div>
                )}
                <div style={{
                  maxWidth: '80%', fontSize: '15px', lineHeight: 1.7,
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                  padding: '12px 18px',
                  background: msg.role === 'user' ? '#e0e7ff' : '#ffffff',
                  border: msg.role === 'user' ? '1px solid #c7d2fe' : '1px solid #e4e4e7',
                  color: msg.role === 'user' ? '#312e81' : '#27272a',
                }}>
                  <MessageContent text={msg.content} isUser={msg.role === 'user'} />
                </div>
              </div>
            ))}

            {/* Typing */}
            {typing && (
              <div style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                animation: 'msgIn 0.3s ease forwards', opacity: 0,
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                  background: '#2563eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '12px', fontWeight: 700,
                }}>Y</div>
                <div style={{
                  background: '#ffffff', border: '1px solid #e4e4e7',
                  borderRadius: '4px 18px 18px 18px', padding: '14px 18px',
                  display: 'flex', gap: '5px', alignItems: 'center',
                }}>
                  {[0, 150, 300].map(delay => (
                    <span key={delay} style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: '#a1a1aa', display: 'inline-block',
                      animation: `typingDot 1.2s ease-in-out ${delay}ms infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Post-answer area */}
            {!typing && messages.length > 0 && (
              <div style={{
                paddingLeft: '42px', display: 'flex', flexDirection: 'column', gap: '12px',
                animation: 'msgIn 0.35s ease forwards', opacity: 0, animationDelay: '80ms',
              }}>
                {remaining.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {remaining.map((q, i) => (
                      <button key={q} onClick={() => sendMessage(q)}
                        style={{
                          textAlign: 'left', fontSize: '13px', padding: '9px 14px', borderRadius: '8px',
                          border: '1px solid #e4e4e7',
                          background: '#ffffff',
                          color: '#71717a', cursor: 'pointer',
                          transition: 'all 0.15s',
                          animation: 'heroIn 0.4s ease forwards',
                          animationDelay: `${i * 50}ms`, opacity: 0,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#f4f4f5'
                          e.currentTarget.style.color = '#27272a'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = '#ffffff'
                          e.currentTarget.style.color = '#71717a'
                        }}
                      >{q}</button>
                    ))}
                  </div>
                )}

                <button onClick={handleDismiss} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '13px', color: '#71717a', background: 'none',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'color 0.15s', width: 'fit-content',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#27272a')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}
                >
                  View full portfolio <ArrowUpRight size={12} />
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{
        borderTop: '1px solid #e4e4e7',
        padding: '16px', flexShrink: 0,
        background: '#ffffff',
      }}>
        <div style={{
          maxWidth: '672px', margin: '0 auto',
          display: 'flex', gap: '10px', alignItems: 'center',
          background: '#ffffff',
          border: '1px solid #d4d4d8',
          borderRadius: '12px', padding: '12px 16px',
          transition: 'border-color 0.15s',
        }}>
          <input
            type="text" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
            placeholder="Ask me anything..."
            disabled={typing}
            style={{
              flex: 1, background: 'transparent',
              fontSize: '15px', color: '#18181b',
              border: 'none', outline: 'none',
              opacity: typing ? 0.4 : 1,
            }}
            onFocus={e => { e.currentTarget.parentElement!.style.borderColor = '#a1a1aa' }}
            onBlur={e => { e.currentTarget.parentElement!.style.borderColor = '#d4d4d8' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            style={{
              width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
              background: input.trim() && !typing ? '#18181b' : '#f4f4f5',
              border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', transition: 'all 0.15s ease',
              opacity: (!input.trim() || typing) ? 0.35 : 1,
            }}
          >
            <Send size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        input::placeholder { color: #a1a1aa; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
