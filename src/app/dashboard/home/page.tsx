import { FiEdit3 } from "react-icons/fi"
import demo_image from '@/assets/player_theme demo.jpg'
import Sidebar from "@/components/dashboard/Sidebar"
import ToggleSwitch from "@/components/global/ToggleTheme"
import UserDropdown from "@/components/dashboard/UserDropdown"
import { Accordion } from "@/components/dashboard/Accordion"
import Filters from "@/components/dashboard/Filters"

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
  {
    name: 'Config 003',
    desc: 'Black and red theme',
    image: demo_image
  },
  {
    name: 'Config 004',
    desc: 'Black and gray theme',
    image: demo_image
  }
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
  {
    name: 'Config 003',
    desc: 'Black and red theme',
    image: demo_image
  },
  {
    name: 'Config 004',
    desc: 'Black and gray theme',
    image: demo_image
  }
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
          <Filters />

          {/* Theme Selector Panel */}
          <div className="flex flex-col md:flex-row gap-4">
            <Accordion title="Player" themes={PlayerThemes} />
            <Accordion title="App" themes={HomeThemes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard