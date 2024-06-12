import React from 'react'

type Props = {
    allMappings: any;
}

const AllMappings = ({ allMappings }: Props) => {

    const handleEditMapping = (mapping: any) => {
        console.log(mapping);
    }

    return (
        <div>
            {allMappings && (
                <div className="bg-white rounded-md p-5 max-h-[400px] overflow-y-scroll">
                    <div className="flex flex-col">
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    {allMappings.length > 0 && Object.keys(allMappings[allMappings.length - 1].filter).map((key: string, index: number) => (
                                        <th key={index} className="px-4 py-2">{key}</th>
                                    ))}
                                    <th className="px-4 py-2">App Config</th>
                                    <th className="px-4 py-2">Player Config</th>
                                    <th className="px-4 py-2">Edit Mapping</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allMappings.map((mapping: any, index: number) => (
                                    <tr key={index}>
                                        {Object.keys(allMappings[allMappings.length - 1].filter).map((key: string, keyIndex: number) => {
                                            const value = mapping.filter[key];
                                            return (
                                                <td key={keyIndex} className="border px-4 py-2">{value !== undefined ? value : ''}</td>
                                            );
                                        })}
                                        <td className="border px-4 py-2 font-semibold">{mapping.appConfig.name}</td>
                                        <td className="border px-4 py-2 font-semibold">{mapping.playerConfig.name}</td>
                                        <td className="flex justify-around border px-4 py-2">
                                            <button className="flex text-primary600 items-center gap-2" onClick={() => handleEditMapping(mapping)}>
                                                View
                                            </button>

                                            <button className="flex text-red-600 items-center gap-2" onClick={() => handleEditMapping(mapping)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllMappings