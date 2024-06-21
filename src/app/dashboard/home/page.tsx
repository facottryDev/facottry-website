'use client'
import Sidebar from "@/components/dashboard/Sidebar"
import ConfigManager from "./ConfigManager"
import React from 'react'

const tabs = [
  {
    name: 'createConfig',
    label: 'Create Config',
  },
  {
    name: 'allMappings',
    label: 'All Mappings',
  },
]

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = React.useState(localStorage.getItem('selectedDashboardTab') || 'createConfig' as string);

  React.useEffect(() => {
    localStorage.setItem('selectedDashboardTab', selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex min-h-screen dark:bg-darkblue300">
      <div>
        <Sidebar />
      </div>

      {selectedTab === 'createConfig' && (
        <ConfigManager />
      )}

    </div>
  )
}

export default Dashboard