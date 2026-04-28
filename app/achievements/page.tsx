import Nav from '@/components/Nav'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'

export default function AchievementsPage() {
  return (
    <main>
      <Nav />
      <div className="pt-20">
        <Achievements />
      </div>
      <Contact />
    </main>
  )
}
