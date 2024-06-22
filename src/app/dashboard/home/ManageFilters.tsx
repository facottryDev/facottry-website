'use client'
import { IoTrashBin, IoPencilSharp } from "react-icons/io5";
import { userStore } from '@/lib/store'
import { axios_admin } from "@/lib/axios"
import Modal from 'react-modal';
import { useState } from "react";

type Props = {}

const ManageFilters = (props: Props) => {
    const activeProject = userStore(state => state.activeProject);
    const [AddFilterModal, setAddFilterModal] = useState(false);
    const [AddConfigTypeModal, setAddConfigTypeModal] = useState(false);
    const [EditFilterModal, setEditFilterModal] = useState('');

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

            // Default value must be present in values
            if (!filter.values.includes(filter.default)) {
                alert("Default value must be present in values");
                return;
            }

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
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const handleAddConfigType = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const configType = formData.get("configtype") as string;

        try {
            await axios_admin.post('/project/config-type/add', {
                projectID: activeProject?.projectID,
                configType
            })
            alert("Config Type Added Successfully");
            window.location.reload();
        } catch (error: any) {
            console.error(error)
            alert(error.response.data.message)
        }
    }


    return (
        <div>
            <div>
                <label htmlFor="companyname" className="block mt-4 text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                    Manage Filters <button className="text-primary font-semibold ml-2" onClick={
                        () => setAddFilterModal(true)
                    }> Add Filter </button>

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
                            <h1 className="font-bold text-lg">Add New Filter</h1>

                            <form className="flex flex-col w-[50vw] max-w-sm bg-white " onSubmit={handleAddFilters}>
                                <label htmlFor="filterName" className="mt-4">Filter Name</label>
                                <input id="filterName" name="filterName" type="text" className="w-full p-2 mt-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                                <label htmlFor="filterDefault" className="mt-4">Default Value</label>
                                <input id="filterDefault" name="filterDefault" type="text" className="w-full p-2 mt-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                                <label htmlFor="filterValues" className="mt-4">Values (Comma Separated)</label>
                                <textarea id="filterValues" name="filterValues" className="w-full mt-2 p-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                                <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Add Filter</button>
                            </form>
                        </div>
                    </Modal>
                </label>

                <div className="border bg-white rounded-lg p-4 items-center mt-2 gap-2 justify-between text-sm ">
                    {Object.keys(activeProject?.filters).length > 0 ? (
                        <div className="flex flex-col mt-2 gap-2 ">
                            {Object.keys(activeProject?.filters)
                                .map((key, index) => (
                                    <div key={index} className="flex justify-between">
                                        <div key={index} className="flex items-center gap-2">
                                            <h3 className="font-semibold">{index + 1}. {key}:
                                            </h3>
                                            <div className="flex gap-2">
                                                {activeProject?.filters[key].values.map((value: string, i: number) => (
                                                    value === activeProject?.filters[key].default ? (
                                                        <span key={i} className="px-2 py-1 text-sm text-white bg-primary rounded-md">{value}</span>
                                                    ) : (
                                                        <span key={i} className="px-2 py-1 text-sm text-gray-900 bg-gray-100 rounded-md">{value}</span>
                                                    )
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                className="flex items-center text-sm font-semibold leading-6 text-primary dark:text-primary400 hover:underline"
                                                onClick={
                                                    () => setEditFilterModal(key)
                                                }
                                            >
                                                <IoPencilSharp className="w-5 h-5 mr-2" />
                                                Edit
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

                                                        <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Save Changes</button>
                                                    </form>
                                                </div>
                                            </Modal>

                                            <button
                                                type="button"
                                                className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                                                onClick={() => {
                                                    if (window.confirm('Are you sure?')) {
                                                        handleDeleteFilters(key);
                                                    }
                                                }}

                                            >
                                                <IoTrashBin className="w-5 h-5 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p>No filters found</p>
                    )}
                </div>
            </div>

            {/* Manage Config Types */}
            <div>
                <div className="flex gap-2 mt-4">
                    <label className="block text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Manage Config Types
                    </label>

                    <button className="flex items-center text-sm font-semibold leading-6 text-primary hover:underline" onClick={() =>
                        setAddConfigTypeModal(true)
                    }>
                        Add New
                    </button>
                </div>

                <div className="border bg-white rounded-lg p-4 items-center mt-2 gap-2 justify-between">
                    {activeProject?.configTypes.map((config, index) => (
                        <div key={index} className="flex justify-between">
                            <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                {index + 1}. {config}
                            </h2>

                            <button
                                type="button"
                                className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                <Modal
                    isOpen={AddConfigTypeModal}
                    onRequestClose={() => setAddConfigTypeModal(false)}
                    contentLabel="Add Config Type Modal"
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
                        <h1 className="font-bold text-lg">Add Config Type</h1>

                        <form className="flex flex-col w-[50vw] max-w-sm bg-white " onSubmit={handleAddConfigType}>
                            <label htmlFor="configtype" className="mt-4">Enter Value</label>
                            <input id="configtype" name="configtype" type="text" className="w-full p-2 mt-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />

                            <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Submit</button>
                        </form>
                    </div>
                </Modal>
            </div></div>
    )
}

export default ManageFilters