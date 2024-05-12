'use client'
import Sidebar from "@/components/dashboard/Sidebar"
import ToggleSwitch from "@/components/global/ToggleTheme"
import UserDropdown from "@/components/dashboard/UserDropdown"
import RadioButton from "@/components/dashboard/ThemeRadioButton"
import { use, useEffect, useState } from "react"
import { axios_config, axios_user } from "@/lib/axios"
import { activeProjectStore, filterStore } from "@/lib/store";
import Filter from "@/components/dashboard/Filter"
import Image from "next/image"

const Dashboard = () => {
  const [appConfigs, setAppConfigs] = useState<appConfig[]>();
  const [playerConfigs, setPlayerConfigs] = useState<playerConfig[]>();
  const [filters] = filterStore(state => [state.filter]);
  const [selectedApp, setSelectedApp] = useState<appConfig>();
  const [selectedPlayer, setSelectedPlayer] = useState<playerConfig>();
  const [mapping, setMapping] = useState<mapping>();
  const activeProjectID = activeProjectStore(state => state.projectID);

  //Use Effect to fetch app and player configs
  const fetchConfigs = async () => {
    try {
      const appConfigs = await axios_config.get('/get-app-configs', { params: { projectID: activeProjectID } });
      const playerConfigs = await axios_config.get('/get-player-configs', { params: { projectID: activeProjectID } });
      setAppConfigs(appConfigs.data);
      setPlayerConfigs(playerConfigs.data);
    } catch (error) { console.error(error) }
  }

  useEffect(() => {
    fetchConfigs();
  }, [activeProjectID])

  //Use Effect to fetch active mapping
  const getMapping = async () => {
    try {
      const mapping = await axios_user.get('/get-mapping', {
        params: {
          projectID: activeProjectID,
          nocache: false,
          country: filters.country,
          subscription: filters.subscription,
          os: filters.os,
          osver: filters.osver,
        }
      });

      setMapping(mapping.data);
    } catch (error) {
      console.error(error)
      setMapping(undefined);
    }
  }

  useEffect(() => {
    getMapping();
  }, [filters, activeProjectID])

  // Function to handle update of mapping
  const handleSubmit = async () => {
    if (!selectedApp || !selectedPlayer) {
      alert('Please select a theme for both App and Player');
      return;
    }

    const data = {
      projectID: activeProjectID,
      appConfig: selectedApp,
      playerConfig: selectedPlayer,
      filter: filters
    }

    try {
      await axios_config.post('/create-mapping', data);
      getMapping();
      alert('Mapping created successfully!')
    } catch (error) {
      console.error(error)
      alert('Error in creating mapping!')
    }
  }

  const handleDelete = async () => {
    try {
      await axios_config.post('/delete-mapping', {
        projectID: activeProjectID,
        filter: filters
      });

      alert('Mapping deleted successfully!')
      setMapping(undefined);
    } catch (error) {
      console.error(error)
      alert('Error in deleting mapping!')
    }
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

          {/* Active Configs */}
          <div className="mb-8 p-4 bg-white flex flex-col justify-center items-center border rounded-md">
            <div className="flex gap-10 items-center w-full justify-between px-4 py-2">
              <h1 className="text-lg font-bold">Active Configs</h1>
              {mapping && (
                <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleDelete}>Delete</button>
              )}
            </div>
            {mapping && (
              <div className="flex gap-8 p-2">
                <div className="bg-primary600 rounded-md text-white border p-6 w-full max-w-sm">
                  <p className="text-lg font-bold">App Config</p>
                  <p>Name: {mapping?.appConfig?.name}</p>
                  <p>Description: {mapping?.appConfig?.desc}</p>
                  <Image src={mapping?.appConfig.demo_url} alt="user" width={200} height={200} className="mt-2 rounded-xl" />
                </div>

                <div className="bg-primary600 rounded-md text-white border p-6 w-full max-w-sm">
                  <p className="text-lg font-bold">Player Config</p>
                  <p>Name: {mapping?.playerConfig?.name}</p>
                  <p>Description: {mapping?.playerConfig?.desc}</p>
                  <Image src={mapping?.playerConfig.demo_url} alt="user" width={200} height={200} className="mt-2 rounded-xl" />
                </div>
              </div>
            )}
            {!mapping && <p className="mt-2">No active configs found</p>}
          </div>

          <hr className="w-full mb-8" />

          {/* Theme Selector Panel */}
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold mb-8">Update Configs</h1>
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
          </div>

          <button className="px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard