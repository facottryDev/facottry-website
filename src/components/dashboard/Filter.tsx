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
        <form onSubmit={handleSubmit} className="bg-white border flex flex-col items-center gap-5 border-gray-100 w-full rounded-lg p-6 mb-4 text-sm">
            <div onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-2 gap-x-8">
                {Object.keys(allFilters).map((key, index) => {
                    return (
                        <div key={index} className="flex items-center">
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
                className="bg-primary text-white font-medium px-3 py-2 rounded-lg"
            >
                Apply
            </button>
        </form>
    )
}

export default Filter