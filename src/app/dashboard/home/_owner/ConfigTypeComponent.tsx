'use client'
import { axios_admin } from "@/lib/axios"
import Modal from 'react-modal';
import { useState } from "react";
import { userStore } from "@/lib/store";
import { IoClose, IoTrashBin } from "react-icons/io5";

type Props = {}

const ConfigTypeComponent = (props: Props) => {
    const activeProject = userStore(state => state.activeProject);
    const [AddConfigTypeModal, setAddConfigTypeModal] = useState(false);

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

    const handleDeleteConfigType = async (type: string) => {
        try {
            console.log(type)

            await axios_admin.delete('/project/config-type/delete', {
                params: {
                    projectID: activeProject?.projectID,
                    type
                }
            })
            alert("Config Type Deleted Successfully");
            window.location.reload();
        } catch (error: any) {
            console.error(error)
            alert(error.response.data.message)
        }
    }

    return (
        <section className="text-sm flex flex-col items-center justify-center dark:text-white dark:bg-darkblue300">
            <div className="w-full border bg-white">
                <div className="overflow-y-auto h-72">
                    <table className="min-w-full">
                        <thead className="sticky top-0">
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeProject?.configTypes.map((type, index) => (
                                <tr key={index} >
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-bold">{type}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <div className="flex">
                                            {type !== 'app' && type !== 'player' && (
                                                <button className="ml-2 p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-all" onClick={
                                                    () => {
                                                        if (window.confirm('Are you sure?')) {
                                                            handleDeleteConfigType(type);
                                                        }
                                                    }
                                                }>
                                                    <IoTrashBin />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add New Config Type */}
            <button className="font-medium text-center text-sm border my-4 p-2 rounded-md shadow-sm hover:bg-gray-100 transition-all" onClick={() =>
                setAddConfigTypeModal(true)
            }>
                Create New Config Type
            </button>

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
                <div>
                    <div className="flex justify-between w-full ">
                        <h1 className="font-bold uppercase text-lg">Create New Type</h1>
                        <button className="p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-all" onClick={() => setAddConfigTypeModal(false)}>
                            <IoClose />
                        </button>
                    </div>

                    <form className="flex flex-col mt-4 items-center" onSubmit={handleAddConfigType}>
                        <div>
                            <label htmlFor="configtype" className="mt-4">Value</label>
                            <input id="configtype" name="configtype" type="text" className="w-full p-2 mt-2 border rounded-md" required onKeyDown={(e) => e.stopPropagation()} />
                        </div>

                        <button type="submit" className="font-medium text-center text-sm border mt-4 px-5 py-2 w-fit rounded-md shadow-sm hover:bg-gray-100 transition-all">Submit</button>
                    </form>
                </div>
            </Modal>
        </section>
    )
}

export default ConfigTypeComponent