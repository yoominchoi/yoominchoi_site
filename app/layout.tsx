import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yoomin Choi — Software Engineer',
  description:
    'Full-stack software engineer at Oracle. Builder of products used by 100k+ users. Georgia Tech CS (AI), GPA 3.7.',
  openGraph: {
    title: 'Yoomin Choi — Software Engineer',
    description: 'Full-stack software engineer at Oracle. Builder of products used by 100k+ users.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
