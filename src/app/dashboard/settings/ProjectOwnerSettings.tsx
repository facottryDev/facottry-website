'use client'
import { IoExitSharp, IoTrashBin, IoPencilSharp } from "react-icons/io5";
import { userStore } from '@/lib/store'
import { axios_admin } from "@/lib/axios"
import Modal from 'react-modal';
import { useState } from "react";

export default function ProjectOwnerSettings() {
    const company = userStore(state => state.company);
    const activeProject = userStore(state => state.activeProject);
    const [role, setRole] = useState("viewer");

    const [AcceptRequestModal, setAcceptRequestModal] = useState(false);
    const [InviteUserModal, setInviteUserModal] = useState(false);
    const [inviteData, setInviteData] = useState({ email: "", role: "" });

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
            await axios_admin.delete("/deactivate-project")
            userStore.setState({ company: null });
            userStore.setState({ projects: [] });
            userStore.setState({ activeProject: null });
        } catch (error) {
            console.error(error)
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

    return (
        <div className="p-4 bg-white rounded-lg dark:bg-darkblue">
            <div className="pb-6 dark:border-gray-500">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Project Settings</h2>

                <hr className="my-4 border-gray-900/10 dark:border-gray-500" />

                <div className="flex flex-col">
                    <label htmlFor="companyname" className="block text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Project Details
                    </label>

                    <form className="p-5 border rounded-lg mt-2" onSubmit={updateProjectDetails}>
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
                    <div className="border rounded-lg p-4 items-center mt-2 gap-2 justify-between max-h-[400px] overflow-y-scroll">
                        {activeProject?.owners.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {item}
                                </h2>

                                <div className="flex gap-6 text-sm items-center font-semibold">
                                    <select
                                        id={item}
                                        name={item}
                                        className="w-full bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
