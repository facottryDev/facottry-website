'use client'
import Sidebar from "@/components/dashboard/Sidebar"
import ToggleSwitch from "@/components/global/ToggleTheme"
import UserDropdown from "@/components/dashboard/UserDropdown"
import RadioButton from "@/components/dashboard/ThemeRadioButton"
import { useEffect, useState } from "react"
import { axios_config } from "@/lib/axios"
import { activeProjectStore, filterStore } from "@/lib/store";
import Filter from "@/components/dashboard/Filter"

const Dashboard = () => {
  const [appConfigs, setAppConfigs] = useState<appConfig[]>();
  const [playerConfigs, setPlayerConfigs] = useState<playerConfig[]>();
  const [filters] = filterStore(state => [state.filter]);
  const [selectedApp, setSelectedApp] = useState<appConfig>();
  const [selectedPlayer, setSelectedPlayer] = useState<playerConfig>();
  const activeProjectID = activeProjectStore(state => state.projectID);


  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const appConfigs = await axios_config.get('/get-app-configs', { params: { projectID: activeProjectID } });
        const playerConfigs = await axios_config.get('/get-player-configs', { params: { projectID: activeProjectID } });
        setAppConfigs(appConfigs.data);
        setPlayerConfigs(playerConfigs.data);
      } catch (error) { console.error(error) }
    }

    fetchConfigs();
  }, [activeProjectID])

  const handleSubmit = () => {
    if (!filters.country || !filters.subscription || !filters.os || !filters.osver) {
      alert('Please select all filters');
      return;
    }

    if (!selectedApp || !selectedPlayer) {
      alert('Please select a theme for both App and Player');
      return;
    }

    console.log(selectedApp, selectedPlayer)

    const appConfig = {
      configID: selectedApp.configID,
      params: selectedApp.params,
      demo_url: selectedApp.demo_url,
    }

    const playerConfig = {
      configID: selectedPlayer.configID,
      params: selectedPlayer.params,
      demo_url: selectedPlayer.demo_url,
    }

    const data = {
      appConfig,
      playerConfig,
      filters
    }

    try {
      console.log(data)
      alert('Submitted Successfully');
    } catch (error) { console.error(error) }
  }

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

        <div className="flex flex-col w-full mt-8 items-center justify-center">
          {/* Filters */}
          <Filter />

          {/* Theme Selector Panel */}
          <div className="flex flex-col md:flex-row gap-6 justify-around">
            <section className="p-6 text-sm flex flex-col rounded-md items-center justify-center dark:text-white dark:bg-darkblue300 gap-4 bg-white">
              <p className="font-bold text-lg">App Configs</p>
              {appConfigs && (
                <RadioButton options={appConfigs} theme={selectedApp} onThemeChange={setSelectedApp} />
              )}
            </section>

            <section className="p-6 text-sm flex flex-col rounded-md items-center justify-center dark:text-white dark:bg-darkblue300 gap-4 bg-white">
              <p className="font-bold text-lg">Player Configs</p>
              {playerConfigs && (
                <RadioButton options={playerConfigs} theme={selectedPlayer} onThemeChange={setSelectedPlayer} />
              )}
            </section>
          </div>

          <button className="px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard