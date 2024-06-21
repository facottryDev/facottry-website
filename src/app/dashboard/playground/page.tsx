'use client'
import Filter from "@/components/dashboard/Filter"
import Sidebar from "@/components/dashboard/Sidebar"
import UserDropdown from "@/components/dashboard/UserDropdown"
import ToggleSwitch from "@/components/global/ToggleTheme"
import { axios_config } from "@/lib/axios"
import { activeFilterStore, userStore } from "@/lib/store"
import React, { useEffect, useState } from 'react'
import { JSONTree } from 'react-json-tree'

type Props = {}

const Playground = (props: Props) => {
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);
    const [activeMapping, setActiveMapping] = useState<any>();

    const activeProject = userStore(state => state.activeProject);


    const getMapping = async () => {
        if (!activeProject) return;

        try {
            const mapping = await axios_config.post('/mapping/scale', {
                projectID: activeProject?.projectID,
                filter: activeFilter
            });

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
                        <h1 className="text-2xl font-bold">Playground</h1>
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
                <div>
                    <JSONTree data={activeMapping} />
                </div>
            </div>
        </div>
    )
}

export default Playground