import { FiEdit3 } from "react-icons/fi"
import demo_image from '@/assets/player_theme demo.jpg'
import Sidebar from "@/components/dashboard/Sidebar"
import ToggleSwitch from "@/components/global/ToggleTheme"
import UserDropdown from "@/components/dashboard/UserDropdown"
import { Accordion } from "@/components/dashboard/Accordion"

const PlayerThemes = [
  {
    name: 'Config 001',
    desc: 'Blue and white theme',
    image: demo_image
  },
  {
    name: 'Config 002',
    desc: 'Black and white theme',
    image: demo_image
  },
]

const HomeThemes = [
  {
    name: 'Config 001',
    desc: 'Blue and white theme',
    image: demo_image
  },
  {
    name: 'Config 002',
    desc: 'Black and white theme',
    image: demo_image
  },
]

const Dashboard = () => {

  return (
    <div className="flex w-screen min-h-screen bg-bggray dark:bg-darkblue300">
      <Sidebar />

      {/* Dashboard Home */}
      <div className="flex flex-col w-full m-8">
        {/* Top Navbar */}
        <nav className="flex justify-between">
          <div className="flex items-center mr-10 space-x-4">
            <h1 className="text-2xl font-bold">Config Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <ToggleSwitch />
            <UserDropdown title="Kartik" />
          </div>
        </nav>

        <hr className="w-full mt-4" />

        <div className="flex flex-col justify-between mt-8 space-x-8">
          {/* Filters */}
          <div>
          </div>

          {/* Theme Selector Panel */}
          <div className="w-full max-w-[60vw] h-fit p-8 space-y-4 bg-white rounded-lg dark:bg-darkblue">
            <Accordion title="Player" themes={PlayerThemes} />
            <Accordion title="Home" themes={HomeThemes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard