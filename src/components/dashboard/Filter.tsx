import { filterStore, userStore } from "@/lib/store";
import React from 'react'
import { HiOutlineFilter } from "react-icons/hi";

type Props = {}

const Filter = ({ }: Props) => {
    const [filters, setFilters] = filterStore(state => [state.filter, state.setFilter]);
    const company = userStore(state => state.company);
    const allFilters = company?.filters || [];

    console.log(filters)
    
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div className="relative">
            <button className={`border hover:bg-primary600 hover:text-white rounded-full aspect-square transition-all px-2 py-1 ${isVisible ? 'bg-primary600 text-white' : 'bg-white'}`} onClick={
                () => setIsVisible(!isVisible)
            }
            > <HiOutlineFilter fontSize={'1.5rem'} /> </button>

            {isVisible && <div className="absolute right-10 bottom-10 bg-white border border-gray-300 shadow-lg rounded-lg p-10 flex flex-col items-start justify-center gap-2">
                {allFilters.map((filter: Filter, index: number) => (
                    <div key={index} className="flex items-center">
                        <label className="mr-2">{filter.name}</label>
                        <select
                            className="border rounded-lg px-2 py-1"
                            value={filters[filter.name]}
                            onChange={(e) => {
                                setFilters({ ...filters, [filter.name]: e.target.value });
                            }}
                        >
                            <option value="">All</option>
                            {filter.values.map((value: any, index: number) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Filter