'use client'
import Filter from "@/components/dashboard/Filter"
import Sidebar from "@/components/dashboard/Sidebar"
import UserDropdown from "@/components/dashboard/UserDropdown"
import ToggleSwitch from "@/components/global/ToggleTheme"
import { axios_scale } from "@/lib/axios"
import { activeFilterStore, globalStore, userStore } from "@/lib/store"
import React, { useEffect, useState } from 'react'
import { JSONTree } from 'react-json-tree'
import Image from "next/image"
import logo_2 from '@/assets/logo_2.svg'
import logo_dark_2 from '@/assets/logo_dark_2.svg'

type Props = {}
const tabs = ['SDK Demo', 'Site Examples']

const Playground = (props: Props) => {
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);
    const [activeMapping, setActiveMapping] = useState<any>();
    const activeProject = userStore(state => state.activeProject);
    const [selectedTab, setSelectedTab] = React.useState(localStorage.getItem('selectedPlaygroundTab') || 'SDK Response' as string);
    const sidebar = globalStore(state => state.sidebar);
    const setSidebar = globalStore(state => state.setSidebar);

    React.useEffect(() => {
        localStorage.setItem('selectedPlaygroundTab', selectedTab);
    }, [selectedTab]);

    const getMapping = async () => {
        if (!activeProject) return;

        try {
            const mapping = await axios_scale.post('/get-mapping', {
                projectID: activeProject?.projectID,
                filter: activeFilter
            });

            console.log(mapping.data);

            setActiveMapping(mapping.data.mappings);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMapping();
    }, [activeFilter, activeProject])

    return (
        <div className="flex min-h-screen dark:bg-darkblue300">
            <div>
                <Sidebar />
            </div>

            {/* Dashboard Home */}
            <div className="flex flex-col w-full bg-bggray p-8">
                {/* Top Navbar */}
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

                        <h1 className="text-2xl font-bold">Playground</h1>

                        <div className="mx-auto">
                            <select
                                className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 mx-auto mt-1 lg:hidden block w-full p-2 border border-gray-300 rounded-md"
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

                <div className="flex flex-col w-full mt-8 items-center justify-center">
                    <Filter />
                </div>

                {/* JSON viewer */}
                <div className="w-full border rounded-md mt-8">
                    <h1 className="text-lg font-bold text-center my-4">JSON Response</h1>

                    <JSONTree data={activeMapping} />
                </div>
            </div>
        </div>
    )
}

export default Playground