import { activeFilterStore, userStore } from "@/lib/store";
import React from 'react'

type Props = {}

const Filter = ({ }: Props) => {
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);
    const activeProject = userStore(state => state.activeProject);
    const allFilters = activeProject?.filters || [];

    return (
        <div className="bg-white border border-gray-100 w-full  rounded-lg p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-8 2xl:grid-cols-4 gap-4 text-sm">
            {allFilters.map((filter: Filter, index: number) => (
                <div key={index} className="flex items-center">
                    <label className="mr-2">{filter.name}</label>
                    <select
                        className="border rounded-lg px-2 py-1"
                        value={activeFilter[filter.name]}
                        onChange={(e) => {
                            setActiveFilter({ ...activeFilter, [filter.name]: e.target.value });
                        }}
                    >
                        <option value="ALL">ALL</option>
                        {filter.values.map((value: any, index: number) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    )
}

export default Filter