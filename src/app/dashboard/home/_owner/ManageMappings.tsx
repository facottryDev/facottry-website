'use client'
import { activeFilterStore, userStore } from "@/lib/store";
import { useEffect, useState } from 'react'
import { axios_config } from "@/lib/axios"
import React from 'react'
import { IoPencil, IoTrashBin } from "react-icons/io5";
import Filter from "@/components/dashboard/Filter";

type Props = {}


const ModifyMapping = (props: Props) => {
    const [allMappings, setAllMappings] = useState<any>();
    const activeProject = userStore(state => state.activeProject);
    const [activeFilter] = activeFilterStore(state => [state.activeFilter]);

    const handleEditMapping = async (mapping: any) => {
        alert(mapping.appConfig.name + ' ' + mapping.playerConfig.name);
    }

    const handleDeleteMapping = async (mapping: any) => {
        if (!activeProject) {
            alert('No active project found!');
            return;
        }

        try {
            await axios_config.post('/delete-mapping', {
                projectID: activeProject?.projectID,
                filter: activeFilter
            });

            alert('Mapping deleted successfully!')
        } catch (error) {
            console.error(error)
            alert('Error in deleting mapping!')
        }
    }

    const getAllMappings = async () => {
        if (!activeProject) return;

        try {
            const mapping = await axios_config.post('/mapping/all', {
                projectID: activeProject?.projectID,
                filter: activeFilter
            });

            if (mapping.data.code === "FOUND") {
                setAllMappings(mapping.data.mappings);
            } else {
                setAllMappings(undefined);
            }
        } catch (error: any) {
            alert(error.response.data.message);
            console.log(error);
        }
    }

    useEffect(() => {
        getAllMappings();
    }, [activeProject])

    return (
        <div>
            <Filter />

            {allMappings && (
                <div className="flex flex-col border rounded-md mt-8">
                    <h1 className="text-lg font-bold text-center my-4">Active Mappings</h1>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Filters</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Configs</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {allMappings.map((mapping: any, index: number) => (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {Object.entries(mapping.filter).map(([key, value], keyIndex) => (
                                            <div key={keyIndex}> {key}: {value as React.ReactNode}</div>
                                        ))}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <div>App Config: {mapping.appConfig.name}</div>
                                        <div>Player Config: {mapping.playerConfig.name}</div>
                                        {Object.keys(mapping.customConfig).map((key, keyIndex) => (
                                            <div key={keyIndex}> {key}: {mapping.customConfig[key].name}</div>
                                        ))}
                                    </td>
                                    <td className="border-b border-gray-200 text-sm">
                                        <button className="ml-2 p-2 rounded-full bg-primary400 text-white hover:bg-primary transition-all" onClick={() => handleEditMapping(mapping)}>
                                            <IoPencil />
                                        </button>
                                        <button className="ml-2 p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-all" onClick={() => {
                                            if (window.confirm('Are you sure?')) {
                                                handleDeleteMapping(mapping);
                                            }
                                        }}>
                                            <IoTrashBin />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ModifyMapping