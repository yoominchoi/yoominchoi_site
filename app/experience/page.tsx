import Nav from '@/components/Nav'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function ExperiencePage() {
  return (
    <main>
      <Nav />
      <div className="pt-20">
        <Experience />
      </div>
      <Contact />
    </main>
  )
}
