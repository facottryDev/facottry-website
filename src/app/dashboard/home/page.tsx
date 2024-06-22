'use client'
import Sidebar from "@/components/dashboard/Sidebar"
import React from 'react'
import Image from "next/image"
import ToggleSwitch from "@/components/global/ToggleTheme"
import UserDropdown from "@/components/dashboard/UserDropdown"
import logo_2 from '@/assets/logo_2.svg'
import logo_dark_2 from '@/assets/logo_dark_2.svg'
import { globalStore } from "@/lib/store"
import CreateMappings from "./CreateMapping"
import ModifyMapping from "./ManageMappings"
import ManageConfigs from "./ManageConfigs"
import MacroSettings from "./MacroSettings"

const tabs = ['Macro Settings', 'Manage Configs', 'Create Mappings', 'Manage Mappings']

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = React.useState(localStorage.getItem('selectedDashboardTab') || 'Macro Settings' as string);
  const sidebar = globalStore(state => state.sidebar);
  const setSidebar = globalStore(state => state.setSidebar);

  React.useEffect(() => {
    localStorage.setItem('selectedDashboardTab', selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex min-h-screen dark:bg-darkblue300">
      <Sidebar />

      <div className="w-full bg-bggray p-8 mx-auto">
        <nav className="flex justify-between">
          <div className="flex items-center mr-10 space-x-4">
            {!sidebar && (
              <button onClick={() => {
                setSidebar(true);
              }}>
                <Image
                  src={logo_2}
                  alt="FacOTTry"
                  width={50}
                  height={50}
                  className="dark:hidden"
                />
                <Image
                  src={logo_dark_2}
                  alt="FacOTTry"
                  width={50}
                  height={50}
                  className="hidden dark:block"
                />
              </button>
            )}

            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="mx-auto">
              <select
                className="cursor-pointer text-sm font-medium text-center text-gray-500 dark:text-gray-400 mx-auto mt-1 lg:hidden block w-full p-2 border border-gray-300 rounded-md"
                value={selectedTab}
                onChange={(e) => setSelectedTab(e.target.value)}
              >
                {tabs.map((tab, index) => (
                  <option key={index} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>

              <div className="hidden lg:block text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex space-x-6 ml-4">
                  {tabs.map((tab, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setSelectedTab(tab)}
                        className={`inline-block py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 focus:text-primary transition-all focus:border-primary duration-300 ${selectedTab === tab ? 'text-primary border-primary' : ''}`}
                      >
                        {tab}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ToggleSwitch />
            <UserDropdown />
          </div>
        </nav>

        <hr className="w-full mt-4" />

        {selectedTab === 'Macro Settings' && (
          <MacroSettings />
        )}

        {selectedTab === 'Manage Configs' && (
          <ManageConfigs />
        )}

        {selectedTab === 'Create Mappings' && (
          <CreateMappings />
        )}

        {selectedTab === 'Manage Mappings' && (
          <ModifyMapping />
        )}

      </div>
    </div>
  )
}

export default Dashboard