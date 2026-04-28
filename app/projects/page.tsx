import Nav from '@/components/Nav'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function ProjectsPage() {
  return (
    <main>
      <Nav />
      <div className="pt-20">
        <Projects />
      </div>
      <Contact />
    </main>
  )
}
