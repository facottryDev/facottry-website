'use client'
import { useState } from "react"
import { axios_config } from "@/lib/axios"
import { userStore } from "@/lib/store";
import { fetchConfigs } from "@/lib/fetch"
import Modal from 'react-modal';
import { IoClose, IoPencilSharp, IoTrashBin } from "react-icons/io5";

type Props = {
    configList: config[] | undefined;
    getConfigs: () => void;
    type: string;
}

const ConfigTableComponent = (props: Props) => {
    const activeProject = userStore(state => state.activeProject);
    const [configModal, setconfigModal] = useState('');

    const handleDelete = async (configID: string) => {
        try {
            await axios_config.delete(`/delete?configID=${configID}`);
            alert("Config deleted successfully");
            props.getConfigs();
            setconfigModal("");
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const configID = formData.get('configID');
        const name = formData.get('ConfigName');
        const desc = formData.get('ConfigDesc');
        const params = formData.get('ConfigParams') as string;

        try {
            JSON.parse(params);
        } catch (error) {
            alert('Invalid JSON format for Params');
            return;
        }

        try {
            await axios_config.post(`/update`, {
                configID,
                name,
                desc,
                params: JSON.parse(params)
            });
            alert("Config updated successfully");
            fetchConfigs(activeProject?.projectID);
            props.getConfigs();
            setconfigModal("");
        } catch (error: any) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const handleClone = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const form = e.currentTarget.form;

        if (form) {
            const formData = new FormData(form);

            const configID = formData.get('configID');
            const name = formData.get('ConfigName');
            const desc = formData.get('ConfigDesc');
            const params = formData.get('ConfigParams') as string;

            try {
                JSON.parse(params);
            } catch (error) {
                alert('Invalid JSON format for Params');
                return;
            }

            try {
                await axios_config.post(`/clone`, {
                    configID,
                    name,
                    desc,
                    params: JSON.parse(params)
                });
                alert("Config cloned successfully");
                fetchConfigs(activeProject?.projectID);
                props.getConfigs();
                setconfigModal("");
            } catch (error: any) {
                console.log(error);
                alert(error.response.data.message);
            }
        }
    }

    const handleCreate = async (e: any) => {
        e.preventDefault();

        try {
            JSON.parse(e.target.ConfigParams.value);
        } catch (error) {
            alert('Invalid JSON format for Params');
            return;
        }

        try {
            const data = {
                projectID: activeProject?.projectID,
                name: e.target.ConfigName.value,
                desc: e.target.ConfigDesc.value,
                type: props.type,
                params: JSON.parse(e.target.ConfigParams.value)
            }

            console.log(data)

            if (!data.projectID) return alert('No active project found!');

            await axios_config.post('/add-config', data);
            props.getConfigs();
            alert('Config created successfully');
            setconfigModal('');
        } catch (error: any) {
            console.log(error.response.data)
            alert(error.response.data.message);
        }
    }

    return (
        <section className="text-sm flex flex-col items-center justify-center dark:text-white dark:bg-darkblue300">
            <div className="w-full border bg-white">
                <div className="overflow-y-auto h-80">
                    <table className="min-w-full leading-normal">
                        <thead className="sticky top-0">
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated At</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.configList?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((config, index) => {
                                const updatedAtDate = new Date(config.updatedAt);
                                const formattedUpdatedAt = `${updatedAtDate.toLocaleDateString()}, ${updatedAtDate.toLocaleTimeString()}`;

                                return (
                                    <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap font-bold">{config.name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{config.desc}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{formattedUpdatedAt}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <div className="flex">
                                                <button className="ml-2 p-2 rounded-full bg-primary400 text-white hover:bg-primary transition-all" onClick={
                                                    () => {
                                                        setconfigModal(config.configID)
                                                    }
                                                }>
                                                    <IoPencilSharp />
                                                </button>

                                                <button className="ml-2 p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-all" onClick={
                                                    () => {
                                                        if (window.confirm('Are you sure?')) {
                                                            handleDelete(config.configID);
                                                        }
                                                    }
                                                }>
                                                    <IoTrashBin />
                                                </button>
                                            </div>

                                            <Modal
                                                isOpen={configModal === config.configID}
                                                onRequestClose={() => setconfigModal("")}
                                                contentLabel="Edit Config Modal"
                                                style={
                                                    {
                                                        overlay: {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                                                        },
                                                        content: {
                                                            width: 'calc(100% - 4rem)', // 100% width minus padding
                                                            height: 'max-content', // Height of the modal
                                                            margin: 'auto',
                                                            padding: '2rem', // Padding around the content
                                                            boxSizing: 'border-box', // Include padding in the width and height calculations
                                                            borderRadius: '10px',
                                                            backgroundColor: 'white',
                                                            display: 'flex',
                                                            flexDirection: 'column'
                                                        }
                                                    }
                                                }
                                            >
                                                <div className="flex flex-col items-center justify-center bg-white">
                                                    <div className="flex justify-between w-full px-4">
                                                        <h1 className="font-bold uppercase text-lg">Edit Config</h1>
                                                        <button className="p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-all" onClick={() => setconfigModal('')}>
                                                            <IoClose />
                                                        </button>
                                                    </div>

                                                    <form className="flex w-full flex-col bg-white" onSubmit={handleEdit}>
                                                        <input type="hidden" name="configID" value={config.configID} />

                                                        {/* Flex container for the form content */}
                                                        <div className="flex p-4 flex-col md:flex-row w-full">

                                                            {/* Left side */}
                                                            <div className="flex flex-col">
                                                                <label htmlFor="ConfigName" className="">Name*</label>
                                                                <input id="ConfigName" name="ConfigName" type="text" className="w-full p-2 border rounded-md" defaultValue={config.name} onKeyDown={(e) => e.stopPropagation()} />

                                                                <label htmlFor="ConfigDesc" className="mt-4">Description</label>
                                                                <input type="text" id="ConfigDesc" name="ConfigDesc" className="w-full p-2 border rounded-md" defaultValue={config.desc} onKeyDown={(e) => e.stopPropagation()} />
                                                            </div>

                                                            {/* Divider */}
                                                            <div className="hidden md:block mx-8 bg-gray-200 w-px h-auto"></div>

                                                            {/* Right side */}
                                                            <div className="flex-1">
                                                                <label htmlFor="ConfigParams" className="mt-2 md:mt-0">Params (JSON)*</label>
                                                                <textarea id="ConfigParams" name="ConfigParams" className="w-full p-2 border rounded-md" rows={20} defaultValue={
                                                                    JSON.stringify(config.params, null, 2)
                                                                } onKeyDown={(e) => e.stopPropagation()} />
                                                            </div>
                                                        </div>

                                                        <button type="submit" className="font-medium text-center text-sm border p-2 rounded-md shadow-sm hover:bg-gray-100 transition-all">Save</button>
                                                        <button type="button" className="font-medium text-center hover:text-gray-500 text-sm mt-4 rounded-md transition-all" onClick={handleClone}>Save As New Config</button>
                                                    </form>
                                                </div>
                                            </Modal>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <button onClick={
                () => setconfigModal('ac')
            } className="font-medium border my-4 p-2 rounded-md shadow-sm hover:bg-gray-100 transition-all">
                Create New Config
            </button>

            <Modal
                isOpen={configModal === 'ac'}
                onRequestClose={() => setconfigModal("")}
                contentLabel="Add Config Modal"
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            width: 'calc(100% - 4rem)', // 100% width minus padding
                            height: 'max-content', // Height of the modal
                            margin: 'auto',
                            padding: '2rem', // Padding around the content
                            boxSizing: 'border-box', // Include padding in the width and height calculations
                            borderRadius: '10px',
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column'
                        }
                    }
                }
            >
                <div className="flex flex-col items-center justify-center bg-white">
                    <div className="flex justify-between w-full px-4">
                        <h1 className="font-bold uppercase text-lg">Add New Config</h1>
                        <button className="p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-all" onClick={() => setconfigModal('')}>
                            <IoClose />
                        </button>
                    </div>

                    <form className="flex w-full flex-col bg-white" onSubmit={handleCreate}>
                        <div className="flex p-4 flex-col md:flex-row w-full">
                            {/* Left side */}
                            <div className="flex flex-col">
                                <label htmlFor="ConfigName" className="">Name*</label>
                                <input id="ConfigName" name="ConfigName" type="text" className="w-full p-2 border rounded-md" onKeyDown={(e) => e.stopPropagation()} />

                                <label htmlFor="ConfigDesc" className="mt-4">Description</label>
                                <input type="text" id="ConfigDesc" maxLength={50} name="ConfigDesc" className="w-full p-2 border rounded-md" onKeyDown={(e) => e.stopPropagation()} />
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block mx-8 bg-gray-200 w-px h-auto"></div>

                            {/* Right side */}
                            <div className="flex-1">
                                <label htmlFor="ConfigParams" className="mt-2 md:mt-0">Params (JSON)*</label>
                                <textarea id="ConfigParams" defaultValue={
                                    `{"key": "value"}`
                                } name="ConfigParams" className="w-full p-2 border rounded-md" rows={20} onKeyDown={(e) => e.stopPropagation()} />
                            </div>
                        </div>

                        <button type="submit" className="font-medium text-center text-sm border p-2 rounded-md shadow-sm hover:bg-gray-100 transition-all">Create</button>
                    </form>
                </div>
            </Modal>
        </section>
    )
}

export default ConfigTableComponent