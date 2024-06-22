import React from 'react'

type Props = {
    configList: config[] | undefined,
    type: string,
    selectedConfigs: any,
    setSelectedConfigs: any,
}

const ConfigSelectorComponent = (props: Props) => {
    const handleSelect = (config: config) => {
        const type = props.type;
        props.setSelectedConfigs((prev: any) => {
            return {
                ...prev,
                [type]: config
            }
        });
    }

    return (
        <div className="w-full">
            <div className="overflow-y-auto h-96">
                <table className="min-w-full leading-normal">
                    <thead className="sticky top-0 border-t">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.configList?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((config, index) => {
                            const updatedAtDate = new Date(config.updatedAt);
                            const formattedUpdatedAt = `${updatedAtDate.toLocaleDateString()}, ${updatedAtDate.toLocaleTimeString()}`;
                            const currentSelection = props.selectedConfigs[props.type];

                            return (
                                <tr key={index} onClick={() => {
                                    handleSelect(config);
                                }} className={`cursor-pointer hover:bg-gray-100 transition-all ${currentSelection?.configID === config.configID ? 'bg-gray-200' : 'bg-white'}`}>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-bold">{config.name}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{config.desc}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{formattedUpdatedAt}</p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ConfigSelectorComponent