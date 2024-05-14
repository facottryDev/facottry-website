'use client'
import Sidebar from "@/components/dashboard/Sidebar"
import ToggleSwitch from "@/components/global/ToggleTheme"
import UserDropdown from "@/components/dashboard/UserDropdown"
import RadioButton from "@/components/dashboard/ThemeRadioButton"
import { useEffect, useState } from "react"
import { axios_config } from "@/lib/axios"
import { userStore, filterStore } from "@/lib/store";
import Filter from "@/components/dashboard/Filter"
import Image from "next/image"
import { fetchConfigs, fetchMapping } from "@/lib/fetch"

const Dashboard = () => {
  const [appConfigs, setAppConfigs] = useState<appConfig[]>();
  const [playerConfigs, setPlayerConfigs] = useState<playerConfig[]>();
  const [filters] = filterStore(state => [state.filter]);
  const [selectedApp, setSelectedApp] = useState<appConfig>();
  const [selectedPlayer, setSelectedPlayer] = useState<playerConfig>();
  const [mapping, setMapping] = useState<mapping>();

  const activeProject = userStore(state => state.activeProject);
  const userRole = activeProject?.role;

  // Fetching & updating Configs
  const getConfigs = async () => {
    const configs = await fetchConfigs(activeProject?.projectID);

    if (configs.status >= 300) {
      setAppConfigs(undefined);
      setPlayerConfigs(undefined);
      console.log(configs);
      return;
    } else {
      setAppConfigs(configs.appConfigs);
      setPlayerConfigs(configs.playerConfigs);
    }
  }

  useEffect(() => {
    getConfigs();
  }, [activeProject])

  // Fetching & updating Mapping
  const getMapping = async () => {
    const res = await fetchMapping(activeProject?.projectID, filters, true);

    if (res.status >= 300) {
      setMapping(undefined);
      console.log(res.data);
      return;
    } else {
      const mapping = {
        appConfig: res.data.appConfig,
        playerConfig: res.data.playerConfig
      }

      setMapping(mapping);
    }
  }

  useEffect(() => {
    getMapping();
  }, [filters, activeProject])

  // Function to handle update of mapping
  const handleUpdateMapping = async () => {
    if (!selectedApp || !selectedPlayer) {
      alert('Please select a theme for both App and Player');
      return;
    }

    const data = {
      projectID: activeProject?.projectID,
      appConfig: selectedApp,
      playerConfig: selectedPlayer,
      filter: filters
    }

    if (!data.projectID) return alert('No active project found!');

    try {
      await axios_config.post('/create-mapping', data);
      getMapping();
      alert('Mapping created successfully!')
    } catch (error) {
      console.error(error)
      alert('Error in creating mapping!')
    }
  }

  // Function to handle delete of mapping
  const handleMappingDelete = async () => {
    if (!activeProject) {
      alert('No active project found!');
      return;
    }

    try {
      await axios_config.post('/delete-mapping', {
        projectID: activeProject?.projectID,
        filter: filters
      });

      alert('Mapping deleted successfully!')
      getMapping();
    } catch (error) {
      console.error(error)
      alert('Error in deleting mapping!')
    }
  }

  // Function to handle creation of new App Config
  const handleCreateApp = async (e: any) => {
    e.preventDefault();

    // Check JSON format for Params
    try {
      JSON.parse(e.target.appConfigParams.value);
    } catch (error) {
      alert('Invalid JSON format for Params');
      return;
    }

    try {
      const data = {
        projectID: activeProject?.projectID,
        name: e.target.appConfigName.value,
        desc: e.target.appConfigDesc.value,
        params: JSON.parse(e.target.appConfigParams.value)
      }

      if (!data.projectID) return alert('No active project found!');

      await axios_config.post('/add-app-config', data);
      getConfigs();
      alert('App Config created successfully!')
    } catch (error: any) {
      console.error(error.response)
      alert("Error in creating App Config")
    }
  }

  // Function to handle creation of new Player Config
  const handleCreatePlayer = async (e: any) => {
    e.preventDefault();

    // Check JSON format for Params
    try {
      JSON.parse(e.target.playerConfigParams.value);
    } catch (error) {
      alert('Invalid JSON format for Params');
      return;
    }

    try {
      const data = {
        projectID: activeProject?.projectID,
        name: e.target.playerConfigName.value,
        desc: e.target.playerConfigDesc.value,
        params: JSON.parse(e.target.playerConfigParams.value)
      }

      if (!data.projectID) return alert('No active project found!');

      await axios_config.post('/add-player-config', data);
      getConfigs();
      alert('Player Config created successfully!')
    } catch (error: any) {
      console.error(error.response)
      alert("Error in creating Player Config")
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
            <UserDropdown />
          </div>
        </nav>

        <hr className="w-full mt-4" />

        <div className="flex flex-col w-full mt-8 items-center justify-center">
          {/* Filters */}
          <Filter />

          {/* Active Mapping */}
          {activeProject && (
            <div className="mb-8 p-4 bg-white flex flex-col justify-center items-center border rounded-md">
              <div className="flex gap-10 items-center w-full justify-between px-4 py-2">
                <h1 className="text-lg font-bold">Active Mapping</h1>
                {mapping && userRole && (userRole === 'owner' || userRole === 'editor') && (
                  <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleMappingDelete}>Delete</button>
                )}
              </div>
              {mapping && (
                <div className="flex gap-8 p-2">
                  <div className="flex flex-col items-center justify-center bg-primary600 text-white p-4 rounded-md w-full min-w-[300px] max-w-sm">
                    <p className="text-lg font-bold mb-2">App Config</p>
                    <div className="w-full">
                      <p className="font-semibold">{mapping?.appConfig?.name}</p>
                      <p>{mapping?.appConfig?.desc}</p>
                      <p>{JSON.stringify(mapping?.appConfig?.params, null, 1)}</p>
                    </div>
                    <Image src={mapping?.appConfig?.demo_url} alt="user" width={500} height={500} className="mt-2 rounded-xl" />
                  </div>

                  <div className="flex flex-col items-center justify-center bg-primary600 text-white p-4 rounded-md w-full min-w-[300px] max-w-sm">
                    <p className="text-lg font-bold mb-2">Player Config</p>
                    <div className="w-full">
                      <p className="font-semibold">{mapping?.playerConfig?.name}</p>
                      <p>{mapping?.playerConfig?.desc}</p>
                      <p>{JSON.stringify(mapping?.playerConfig?.params, null, 1)}</p>
                    </div>
                    <Image src={mapping?.playerConfig?.demo_url} alt="user" width={500} height={500} className="mt-2 rounded-xl" />
                  </div>
                </div>
              )}
              {!mapping && <p className="mt-2">No active mapping found</p>}
            </div>
          )}

          {/* Update Configs */}
          {userRole && (userRole === 'owner' || userRole === 'editor') && (
            <div className="flex flex-col items-center">
              <hr className="w-full mb-8" />
              <h1 className="text-lg font-bold mb-8">Update Mapping</h1>
              <div className="flex flex-col md:flex-row gap-6 justify-around">
                <section className="p-6 text-sm flex flex-col rounded-md items-center justify-center dark:text-white dark:bg-darkblue300 gap-4 bg-white">
                  <p className="font-bold text-lg">App Configs</p>
                  {appConfigs && (
                    <RadioButton userRole={userRole} getConfigs={getConfigs} options={appConfigs} theme={selectedApp} onThemeChange={setSelectedApp} />
                  )}
                </section>

                <section className="p-6 text-sm flex flex-col rounded-md items-center justify-center dark:text-white dark:bg-darkblue300 gap-4 bg-white">
                  <p className="font-bold text-lg">Player Configs</p>
                  {playerConfigs && (
                    <RadioButton userRole={userRole} getConfigs={getConfigs} options={playerConfigs} theme={selectedPlayer} onThemeChange={setSelectedPlayer} />
                  )}
                </section>
              </div>

              <button className="px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleUpdateMapping}>Submit</button>
            </div>
          )}

          {/* Add New Config */}
          {userRole && (userRole === 'owner' || userRole === 'editor') && (
            <div className="flex flex-col items-center justify-center">
              <hr className="w-full m-8" />
              <h1 className="font-bold text-lg">Create New Configs</h1>
              <div className="flex gap-10 mt-8">
                <form className="flex flex-col bg-white p-10" onSubmit={handleCreateApp}>
                  <h1 className="font-semibold">Create App Config</h1>
                  <label htmlFor="appConfigName" className="mt-4">Name *</label>
                  <input id="appConfigName" name="appConfigName" required type="text" className="w-full p-2 border rounded-md" />

                  <label htmlFor="appConfigDesc" className="mt-2">Description</label>
                  <input type="text" id="appConfigDesc" name="appConfigDesc" className="w-full p-2 border rounded-md" />

                  <label htmlFor="appConfigParams" className="mt-2">Params (JSON)*</label>
                  <textarea id="appConfigParams" name="appConfigParams" required className="w-full p-2 border rounded-md" rows={4}></textarea>

                  <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Create</button>
                </form>

                <form className="flex flex-col bg-white p-10" onSubmit={handleCreatePlayer}>
                  <h1 className="font-semibold">Create Player Config</h1>
                  <label htmlFor="playerConfigName" className="mt-4">Name *</label>
                  <input id="playerConfigName" name="playerConfigName" required type="text" className="w-full p-2 border rounded-md" />

                  <label htmlFor="playerConfigDesc" className="mt-2">Description</label>
                  <input type="text" id="playerConfigDesc" name="playerConfigDesc" className="w-full p-2 border rounded-md" />

                  <label htmlFor="playerConfigParams" className="mt-2">Params (JSON)*</label>
                  <textarea id="appConfigParams" name="playerConfigParams" required className="w-full p-2 border rounded-md" rows={4}></textarea>

                  <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Create</button>
                </form>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default Dashboard