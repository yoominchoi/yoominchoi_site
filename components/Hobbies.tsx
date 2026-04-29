'use client'

import { Youtube, Music2 } from 'lucide-react'

const youtubeVideos = [
  {
    title: 'YouTube Video 1',
    href: 'https://www.youtube.com/watch?v=rA2_AmJbEq8&t=14s',
    embedId: 'rA2_AmJbEq8',
  },
  {
    title: 'YouTube Video 2',
    href: 'https://www.youtube.com/watch?v=Kr4Z4bmoPXA&t=3s',
    embedId: 'Kr4Z4bmoPXA',
  },
  {
    title: 'YouTube Video 3',
    href: 'https://www.youtube.com/watch?v=XtMkqeRduwQ&t=198s',
    embedId: 'XtMkqeRduwQ',
  },
]

const tiktokPosts = [
  {
    href: 'https://www.tiktok.com/@yoominsdiary/photo/7603859416282156318',
    id: '7603859416282156318',
  },
  {
    href: 'https://www.tiktok.com/@yoominsdiary/video/7606138311274532127',
    id: '7606138311274532127',
  },
  {
    href: 'https://www.tiktok.com/@yoominsdiary/video/7602809564760689950',
    id: '7602809564760689950',
  },
]

export default function Hobbies() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-2">Beyond work</p>
        <h2 className="text-3xl font-bold text-zinc-900">Hobbies</h2>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Music2 size={18} className="text-zinc-700" />
          <h3 className="text-xl font-semibold text-zinc-900">Content Creation</h3>
        </div>
        <p className="text-zinc-700 leading-relaxed mb-4">
          I enjoy creating content around my journey, ideas, and projects. Follow me on TikTok and YouTube.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.tiktok.com/@yoominsdiary"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 text-sm"
          >
            TikTok
          </a>
          <a
            href="https://www.youtube.com/@yoomin-choi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 text-sm"
          >
            YouTube
          </a>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Youtube size={18} className="text-red-600" />
          <h3 className="text-lg font-semibold text-zinc-900">YouTube Previews</h3>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {youtubeVideos.map((video) => (
            <div key={video.href} className="bg-white rounded-2xl border border-zinc-200 p-3">
              <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">TikTok previews</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {tiktokPosts.map((post) => (
            <div key={post.href} className="bg-white rounded-2xl border border-zinc-200 p-3 overflow-hidden">
              <div className="relative w-full overflow-hidden rounded-xl bg-zinc-100" style={{ paddingTop: '177.78%' }}>
                <iframe
                  className="absolute inset-0 h-full w-full border-0"
                  src={`https://www.tiktok.com/embed/v2/${post.id}`}
                  title="TikTok embed"
                  loading="lazy"
                  allow="encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-blue-700 hover:underline"
              >
                Open on TikTok
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
