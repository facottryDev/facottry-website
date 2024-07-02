import { activeFilterStore, userStore } from "@/lib/store";
import React from 'react'

type Props = {}

const Filter = ({ }: Props) => {
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);
    const activeProject = userStore(state => state.activeProject);
    const allFilters = activeProject?.filters || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newFilter: any = {};

        const keys = Object.keys(allFilters);
        keys.forEach((key) => {
            newFilter[key] = formData.get(key) as string;
        });

        setActiveFilter(newFilter);
        window.location.reload();
    }

    return (
        <div className="w-full border rounded-md mt-8">
            <h1 className="text-lg font-bold text-center my-4">Select Filter</h1>

            <form onSubmit={handleSubmit} className="flex bg-white flex-col items-center border-gray-100 w-full border-t text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-2 gap-x-8 w-full justify-center pt-4 items-center">
                    {Object.keys(allFilters).map((key, index) => {
                        return (
                            <div key={index} className="flex items-center justify-center">
                                <label className="mr-2 font-medium">{key}</label>
                                <select
                                    name={key}
                                    id={key}
                                    className="border rounded-lg px-2 py-1"
                                    defaultValue={activeFilter[key]}
                                >
                                    <option className="font-semibold" value="">DEFAULT</option>
                                    <option value="ALL">ALL</option>
                                    {allFilters[key].values.map((value: any, index: number) => (
                                        <option key={index} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )
                    })}
                </div>

                <button
                    type="submit"
                    className="font-medium border my-4 p-2 px-3 rounded-md shadow-sm hover:bg-gray-100 transition-all"
                >
                    Apply Filter
                </button>
            </form>
        </div>
    )
}

export default Filter