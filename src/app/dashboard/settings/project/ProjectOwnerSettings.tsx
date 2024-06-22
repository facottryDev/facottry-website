'use client'
import { IoExitSharp, IoTrashBin, IoPencilSharp } from "react-icons/io5";
import { userStore } from '@/lib/store'
import { axios_admin } from "@/lib/axios"
import Modal from 'react-modal';
import { useState } from "react";
import ToggleSwitch from "@/components/global/ToggleTheme";
import UserDropdown from "@/components/dashboard/UserDropdown";

export default function ProjectOwnerSettings() {
    const company = userStore(state => state.company);
    const activeProject = userStore(state => state.activeProject);
    const [role, setRole] = useState("viewer");
    const [AcceptRequestModal, setAcceptRequestModal] = useState(false);
    const [AddFilterModal, setAddFilterModal] = useState(false);
    const [AddConfigTypeModal, setAddConfigTypeModal] = useState(false);
    const [InviteUserModal, setInviteUserModal] = useState(false);
    const [inviteData, setInviteData] = useState({ email: "", role: "" });
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

    const leaveProject = async () => {
        try {
            const result = await axios_admin.post("/project/leave", { projectID: activeProject?.projectID });
            alert(result.data.message);
            window.location.reload();
        } catch (error: any) {
            alert(error.response.data.message);
            console.log(error.response)
        }
    }

    const deactivateProject = async () => {
        try {
            await axios_admin.post("/project/deactivate", { projectID: activeProject?.projectID });
            userStore.setState({ company: null });
            userStore.setState({ projects: [] });
            userStore.setState({ activeProject: null });
            window.location.reload();
        } catch (error: any) {
            console.log(error.response);
            alert(error.response.data.message);
        }
    }

    const handleAcceptRequest = (request: string, role: string) => async () => {
        try {
            await axios_admin.post("/project/accept-request", {
                email: request, role, projectID: activeProject?.projectID
            })
            alert("Request Accepted Successfully");
            window.location.reload();
        } catch (error: any) {
            console.error(error)
            alert(error.response.data.message)
        }
    }

    const handleRejectRequest = (request: string) => async () => {
        try {
            await axios_admin.post("/project/reject-request", {
                email: request, projectID: activeProject?.projectID
            })
            alert("Request Rejected Successfully");
            window.location.reload();
        } catch (error: any) {
            console.error(error)
            alert(error.response.data.message)
        }
    }

    const updateProjectDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string || activeProject?.name;
        const type = formData.get("type") as string || activeProject?.type;

        try {
            await axios_admin.post("/update-project", {
                companyID: company?.companyID,
                projectID: activeProject?.projectID,
                name,
                type
            })

            alert("Updated Successfully");
            window.location.reload();
        } catch (error: any) {
            console.error(error)
            alert(error.response.data.message)
        }
    }

    const deleteUser = (email: string) => async () => {
        try {
            await axios_admin.post("/project/delete-user", {
                email, projectID: activeProject?.projectID
            })
            alert("User Removed Successfully");
            window.location.reload();
        } catch (error: any) {
            console.error(error)
            alert(error.response.data.message)
        }
    }

    const changeAccess = (email: string, e: React.ChangeEvent<HTMLSelectElement>) => async () => {
        try {
            await axios_admin.post("/project/change-access", {
                email, role: e.target.value, projectID: activeProject?.projectID
            })
            alert("Access Changed Successfully");
            window.location.reload();
        } catch (error: any) {
            console.error(error)
            alert(error.response.data.message)
        }
    }

    const inviteUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Not Implemented Yet`);
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
        <div className="bg-bggray rounded-lg p-8 dark:bg-darkblue">
            <nav className="flex justify-between">
                <div className="flex items-center mr-10 space-x-4">
                    <h1 className="text-2xl font-bold">Manage Project</h1>
                </div>

                <div className="flex items-center gap-6">
                    <ToggleSwitch />
                    <UserDropdown />
                </div>
            </nav>

            <hr className="my-4 border-gray-900/10 dark:border-gray-500" />

            <div className="pb-6 dark:border-gray-500">

                <div className="flex flex-col">
                    <label htmlFor="companyname" className="block text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Project Details
                    </label>

                    <form className="p-5 bg-white border rounded-lg mt-2" onSubmit={updateProjectDetails}>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="projectID" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    ProjectID
                                </label>
                                <input
                                    type="text"
                                    name="projectID"
                                    id="projectID"
                                    disabled
                                    value={activeProject?.projectID}
                                    className="block mt-2 w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:placeholder:text-slate-200"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={activeProject?.name}
                                    autoComplete="name"
                                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:placeholder:text-slate-200"
                                />
                            </div>

                            <div className="mb-4 sm:col-span-3">
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change Project Type</label>
                                <select name="type" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">SELECT</option>
                                    <option value="PROD">PROD</option>
                                    <option value="UAT">UAT</option>
                                    <option value="DEV">DEV</option>
                                    <option value="TEST">TEST</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-4">
                            <button
                                type="submit"
                                className="px-3 py-2 text-sm font-semibold text-white transition-all rounded-md shadow-sm bg-primary hover:bg-primary400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                <hr className="my-4 border-gray-900/10 dark:border-gray-500" />

                {/* Manage Filters */}
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
                </div>


                {/* Manage Project Users */}
                <div>
                    <div className="mt-4 flex gap-2 items-center">
                        <label className="text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">Manage Users</label>

                        <button
                            type="button"
                            className="flex items-center text-sm font-semibold leading-6 text-primary hover:underline"
                            onClick={() => setInviteUserModal(true)}
                        >
                            Invite User
                        </button>

                        {/* Invite User Dialog Box */}
                        <Modal
                            isOpen={InviteUserModal}
                            onRequestClose={() => setInviteUserModal(false)}
                            contentLabel="Employee Role Selector"
                            style={
                                {
                                    overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                                    },
                                    content: {
                                        width: '50%',
                                        height: '32%',
                                        margin: 'auto',
                                        padding: '2rem',
                                        borderRadius: '10px',
                                        backgroundColor: 'white'
                                    }
                                }
                            }
                        >
                            <form className="flex flex-col items-center gap-4" onSubmit={inviteUser}>
                                <div className="w-full">
                                    <label className="font-medium" htmlFor="newuseremail"> Email </label>
                                    <input type="email" placeholder="demo@gmail.com" autoComplete='email' id="newuseremail" name="newuseremail" className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" onChange={
                                        (e) => setInviteData({ ...inviteData, email: e.target.value })
                                    } />
                                </div>

                                <div className="w-full">
                                    <label className="font-medium" htmlFor="newuserrole">Select Role</label>
                                    <select
                                        id="newuserrole"
                                        name="newuserrole"
                                        className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        onChange={
                                            (e) => setInviteData({ ...inviteData, role: e.target.value })
                                        }>
                                        <option value="owner">Owner</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                </div>

                                <button className="px-3 py-2 text-sm font-semibold text-white transition-all rounded-md shadow-sm bg-primary hover:bg-primary400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary600" type="submit">
                                    Invite
                                </button>
                            </form>
                        </Modal>
                    </div>

                    {/* Modify User Box */}
                    <div className="border bg-white rounded-lg p-4 items-center mt-2 gap-2 justify-between max-h-[400px] overflow-y-scroll">
                        {activeProject?.owners.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {item}
                                </h2>

                                <div className="flex gap-6 text-sm items-center font-semibold">
                                    <select
                                        id={item}
                                        name={item}
                                        className="p-2 border bg-bggray w-full rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        defaultValue={"owner"}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            if (window.confirm('Are you sure?')) {
                                                changeAccess(item, e)();
                                            }
                                        }}
                                    >
                                        <option value="owner">Owner</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>

                                    <button
                                        type="button"
                                        className="flex items-center text-red-600 dark:text-red-400 hover:underline"
                                        onClick={() => {
                                            if (window.confirm('Are you sure?')) {
                                                deleteUser(item)();
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        {activeProject && activeProject?.editors.length > 0 && <hr className="my-4 border-gray-900/10 dark:border-gray-500" />}

                        {activeProject?.editors.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {item}
                                </h2>

                                <div className="flex gap-6 text-sm items-center font-semibold">
                                    <select
                                        id={item}
                                        name={item}
                                        className="w-full bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        defaultValue={"editor"}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            if (window.confirm('Are you sure?')) {
                                                changeAccess(item, e)();
                                            }
                                        }}
                                    >
                                        <option value="owner">Owner</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>

                                    <button
                                        type="button"
                                        className="flex items-center text-red-600 dark:text-red-400 hover:underline"
                                        onClick={() => {
                                            if (window.confirm('Are you sure?')) {
                                                deleteUser(item)();
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        {activeProject && activeProject?.viewers.length > 0 && <hr className="my-4 border-gray-900/10 dark:border-gray-500" />}

                        {activeProject?.viewers.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {item}
                                </h2>

                                <div className="flex gap-6 text-sm items-center font-semibold">
                                    <select
                                        id={item}
                                        name={item}
                                        className="w-full bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                        defaultValue={"viewer"}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            if (window.confirm('Are you sure?')) {
                                                changeAccess(item, e)();
                                            }
                                        }}
                                    >
                                        <option value="owner">Owner</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="flex items-center text-red-600 dark:text-red-400 hover:underline"
                                        onClick={() => {
                                            if (window.confirm('Are you sure?')) {
                                                deleteUser(item)();
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manage Project Join Requests */}
                <div>
                    <label className="block mt-4 text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Manage Join Requests
                    </label>

                    <div className="border rounded-lg p-4 items-center mt-2 gap-2 justify-between">
                        {activeProject?.joinRequests.map((request, index) => (
                            <div key={index} className="flex justify-between">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {request}
                                </h2>

                                {/* Accept / Reject Button using Icons */}
                                <div className="flex gap-6">
                                    <button
                                        type="button"
                                        className="flex items-center text-sm font-semibold leading-6 text-green-600 dark:text-green-400 hover:underline"
                                        onClick={() => setAcceptRequestModal(true)}
                                    >
                                        Accept
                                    </button>

                                    <Modal
                                        isOpen={AcceptRequestModal}
                                        onRequestClose={() => setAcceptRequestModal(false)}
                                        contentLabel="Employee Role Selector"
                                        style={
                                            {
                                                overlay: {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                                                },
                                                content: {
                                                    width: '50%',
                                                    height: '30%',
                                                    margin: 'auto',
                                                    padding: '2rem',
                                                    borderRadius: '10px',
                                                    backgroundColor: 'white'
                                                }
                                            }
                                        }
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="font-bold text-primary">{request}</p>

                                            <div className="w-full">
                                                <label className="font-medium" htmlFor="projectrole">Select Role</label>
                                                <select id="projectrole" className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" onChange={(e) => setRole(e.target.value)}>
                                                    <option value="owner">Owner</option>
                                                    <option value="editor">Editor</option>
                                                    <option value="viewer">Viewer</option>
                                                </select>
                                            </div>

                                            <button className="px-3 py-2 text-sm font-semibold text-white transition-all rounded-md shadow-sm bg-primary hover:bg-primary400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary600" onClick={() => {
                                                handleAcceptRequest(request, role)();
                                                setAcceptRequestModal(false);
                                            }}>
                                                Confirm
                                            </button>
                                        </div>
                                    </Modal>

                                    <button
                                        type="button"
                                        className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                                        onClick={() => {
                                            if (window.confirm('Are you sure?')) {
                                                handleRejectRequest(request)();
                                            }
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manage Active Invites */}
                <div>
                    <label className="block mt-4 text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Manage Active Invites
                    </label>

                    <div className="border rounded-lg p-4 items-center mt-2 gap-2 justify-between">
                        {activeProject?.activeInvites.map((invite, index) => (
                            <div key={index} className="flex justify-between">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {invite}
                                </h2>

                                <button
                                    type="button"
                                    className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="mt-6 border-gray-900/10 dark:border-gray-500" />

                <div>
                    {/* Leave Company */}
                    <button
                        type="button"
                        className="flex items-center mt-4 text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => {
                            if (window.confirm('Are you sure?')) {
                                leaveProject();
                            }
                        }}
                    >
                        <IoExitSharp className="w-5 h-5 mr-2" />
                        Leave Project
                    </button>

                    <button
                        type="button"
                        className="flex items-center mt-4 text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => {
                            if (window.confirm('Are you sure?')) {
                                deactivateProject();
                            }
                        }}
                    >
                        <IoTrashBin className="w-5 h-5 mr-2" />
                        Deactivate Project
                    </button>
                </div>
            </div>
        </div>
    )
}
