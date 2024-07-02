'use client'
import React from "react";
import { useEffect, useState } from "react"
import { axios_config } from "@/lib/axios"
import { userStore, activeFilterStore } from "@/lib/store";
import Filter from "@/components/dashboard/Filter"
import { fetchConfigs } from "@/lib/fetch"
import ConfigSelectorComponent from "./ConfigSelectorComponent";

type Props = {}

const CreateMappings = (props: Props) => {
    const [configs, setConfigs] = useState<configs>();
    const [activeFilter] = activeFilterStore(state => [state.activeFilter]);
    const [selectedConfigs, setSelectedConfigs] = useState<any>({});
    const [company] = userStore(state => [state.company]);

    const activeProject = userStore(state => state.activeProject);

    const getConfigs = async () => {
        try {
            const result = await axios_config.get("/get-configs", {
                params: { projectID: activeProject?.projectID },
            });

            setConfigs(result.data);
        } catch (error: any) {
            return error.response;
        }
    }

    useEffect(() => {
        getConfigs();
    }, [activeProject])

    // Function to handle update of mapping
    const handleUpdateMapping = async () => {

        const data = {
            projectID: activeProject?.projectID,
            companyID: company?.companyID,
            configs: selectedConfigs,
            filter: activeFilter
        }

        if (!data.projectID) return alert('No active project found!');

        try {
            await axios_config.post('/create-mapping', data);
            alert('Mapping created successfully!')
        } catch (error) {
            console.error(error)
            alert('Error in creating mapping!')
        }
    }

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <Filter />

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-10 justify-around w-full">
                <section className="w-full border rounded-md mt-8">
                <h1 className="text-lg font-bold text-center my-4">App Config</h1>
                    <ConfigSelectorComponent
                        configList={configs?.appConfigs}
                        type='app'
                        selectedConfigs={selectedConfigs}
                        setSelectedConfigs={setSelectedConfigs}
                    />
                </section>

                <section className="w-full border rounded-md mt-8">
                    <p className="text-lg font-bold text-center my-4">Player Configs</p>

                    <ConfigSelectorComponent
                        configList={configs?.playerConfigs}
                        type='player'
                        selectedConfigs={selectedConfigs}
                        setSelectedConfigs={setSelectedConfigs}
                    />
                </section>

                {configs?.types.map((type, index) => (
                    type !== 'app' && type !== 'player' && (<section key={index} className="w-full border rounded-md mt-8">
                        <p className="text-lg font-bold text-center my-4">{type} Configs</p>

                        <ConfigSelectorComponent
                            configList={configs?.customConfigs.filter((config) => config.type === type)}
                            type={type}
                            selectedConfigs={selectedConfigs}
                            setSelectedConfigs={setSelectedConfigs}
                        />
                    </section>)
                ))}
            </div>

            <button className="font-medium border my-4 p-2 px-3 rounded-md shadow-sm hover:bg-gray-100 transition-all" onClick={handleUpdateMapping}>Create Mapping</button>
        </div>
    )
}

export default CreateMappings