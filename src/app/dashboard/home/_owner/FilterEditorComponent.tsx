'use client'
import { IoTrashBin, IoPencilSharp, IoClose } from "react-icons/io5";
import { userStore } from '@/lib/store'
import { axios_admin } from "@/lib/axios"
import Modal from 'react-modal';
import { useState } from "react";

type Props = {}

const FilterEditorComponent = (props: Props) => {
    const [AddFilterModal, setAddFilterModal] = useState(false);
    const [EditFilterModal, setEditFilterModal] = useState('');
    const activeProject = userStore(state => state.activeProject);

    const handleAddFilters = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const filter = {
                name: String(data.filterName).toUpperCase(),
                values: String(data.filterValues).toUpperCase().split(',').map((value: string) => value.trim()),
                default: String(data.filterDefault).toUpperCase(),
            };

            console.log(filter)

            const result = await axios_admin.post("/filter/add", { filter, projectID: activeProject?.projectID });
            alert(result.data.message);
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const handleUpdateFilters = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const filter = {
                name: String(data.filterName).toUpperCase(),
                values: String(data.filterValues).toUpperCase().split(',').map((value: string) => value.trim()),
                default: String(data.filterDefault).toUpperCase(),
            };

            const result = await axios_admin.post("/filter/update", { filter, projectID: activeProject?.projectID });
            alert(result.data.message);
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const handleDeleteFilters = async (filterName: string) => {
        try {
            const result = await axios_admin.post("/filter/delete", { filterName, projectID: activeProject?.projectID });
            alert(result.data.message);
        } catch (error: any) {
            console.log(error);
            alert(error.response.data.message);
        }
    }
    
    return (
        <div className="text-sm flex flex-col items-center justify-center dark:text-white dark:bg-darkblue300">
            <div className="w-full border bg-white">
                <div className="overflow-y-auto">
                    <table className="min-w-full">
                        <thead className="sticky top-0">
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Values</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(activeProject?.filters).map((key, index) => (
                                <tr key={index} >
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-bold">{key}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {activeProject?.filters[key].values.map((value: string, i: number) => (
                                                value === activeProject?.filters[key].default ? (
                                                    <span key={i} className="px-2 py-1 text-sm text-white bg-gray-500 rounded-md">{value}</span>
                                                ) : (
                                                    <span key={i} className="px-2 py-1 text-sm text-gray-900 bg-gray-100 rounded-md">{value}</span>
                                                )
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <div className="flex">
                                            <button className="p-2 rounded-full  text-white bg-primary600 hover:bg-primary700 transition-all" onClick={() => setEditFilterModal(key)}>
                                                <IoPencilSharp />
                                            </button>

                                            <Modal
                                                isOpen={EditFilterModal === key}
                                                onRequestClose={() => setEditFilterModal('')}
                                                contentLabel="Update Filter Modal"
                                                style={
                                                    {
                                                        overlay: {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                                                        },
                                                        content: {
                                                            width: 'max-content',
                                                            height: 'max-content',
                                                            maxHeight: '80%',
                                                            margin: 'auto',
                                                            padding: '2rem',
                                                            borderRadius: '10px',
                                                            backgroundColor: 'white'
                                                        }
                                                    }
                                                }
                                            >
                                                <div className="flex flex-col items-center justify-center bg-white">
                                                    <h1 className="font-bold text-lg">Update Filter</h1>

                                                    <form className="flex flex-col w-[50vw] max-w-sm bg-white " onSubmit={handleUpdateFilters}>
                                                        <label htmlFor="filterName" className="mt-4">Filter Name</label>
                                                        <input id="filterName" readOnly value={key} name="filterName" type="text" className="w-full p-2 mt-2 border rounded-md bg-gray-100" required onKeyDown={(e) => e.stopPropagation()} />

                                                        <label htmlFor="filterDefault" className="mt-4">Default Value</label>
                                                        <input id="filterDefault" name="filterDefault" type="text"
                                                            defaultValue={activeProject?.filters[key].default}
                                                            className="w-full p-2 mt-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                                                        <label htmlFor="filterValues" className="mt-4">Values (Comma Separated)</label>
                                                        <textarea id="filterValues" name="filterValues" defaultValue={
                                                            activeProject?.filters[key].values.join(", ")
                                                        } className="w-full mt-2 p-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                                                        <button type="submit" className="font-medium w-fit self-center text-sm border mt-6 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition-all">Save Changes</button>
                                                    </form>
                                                </div>
                                            </Modal>

                                            <button className="ml-2 p-2 rounded-full bg-black text-white hover:bg-gray-700 transition-all" onClick={
                                                () => {
                                                    if (window.confirm('Are you sure?')) {
                                                        handleDeleteFilters(key);
                                                    }
                                                }
                                            }>
                                                <IoTrashBin />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button className="font-medium  text-white text-center text-sm border my-4 p-2 rounded-md shadow-sm bg-primary600 hover:bg-primary700 transition-all" onClick={() =>
                setAddFilterModal(true)
            }>
                Create New Filter
            </button>

            <Modal
                isOpen={AddFilterModal}
                onRequestClose={() => setAddFilterModal(false)}
                contentLabel="Add Filter Modal"
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            width: 'max-content',
                            height: 'max-content',
                            maxHeight: '80%',
                            margin: 'auto',
                            padding: '2rem',
                            borderRadius: '10px',
                            backgroundColor: 'white'
                        }
                    }
                }
            >
                <div className="flex  flex-col items-center justify-center bg-white">
                    <div className="flex justify-between w-full ">
                        <h1 className="font-bold text-lg">Create New Filter</h1>
                        <button className="p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-all" onClick={() => setAddFilterModal(false)}>
                            <IoClose />
                        </button>
                    </div>

                    <form className="flex flex-col w-[50vw] max-w-sm bg-white " onSubmit={handleAddFilters}>
                        <label htmlFor="filterName" className="mt-4">Filter Name</label>
                        <input id="filterName" name="filterName" type="text" className="w-full p-2 mt-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                        <label htmlFor="filterDefault" className="mt-4">Default Value</label>
                        <input id="filterDefault" name="filterDefault" type="text" className="w-full p-2 mt-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                        <label htmlFor="filterValues" className="mt-4">Values (Comma Separated)</label>
                        <textarea id="filterValues" name="filterValues" className="w-full mt-2 p-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                        <button type="submit" className="font-medium w-fit self-center text-sm border mt-6 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition-all">Save Config</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default FilterEditorComponent