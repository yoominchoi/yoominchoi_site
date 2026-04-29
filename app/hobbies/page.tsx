import Nav from '@/components/Nav'
import Hobbies from '@/components/Hobbies'
import Contact from '@/components/Contact'

export default function HobbiesPage() {
  return (
    <main>
      <Nav />
      <div className="pt-20">
        <Hobbies />
      </div>
      <Contact />
    </main>
  )
}
