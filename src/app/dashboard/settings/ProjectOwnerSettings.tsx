'use client'
import { IoExitSharp, IoTrashBin } from "react-icons/io5";
import { userStore } from '@/lib/store'
import { axios_admin } from "@/lib/axios"

export default function ProjectOwnerSettings() {
    const company = userStore(state => state.company);
    const activeProject = userStore(state => state.activeProject);

    console.log(activeProject)

    const leaveProject = async () => {
        try {
            await axios_admin.post("/leave-project")
            userStore.setState({ company: null })
        } catch (error) {
            console.error(error)
        }
    }

    const deleteProject = async () => {
        try {
            await axios_admin.delete("/deactivate-project")
            userStore.setState({ company: null });
            userStore.setState({ projects: [] });
            userStore.setState({ activeProject: null });
        } catch (error) {
            console.error(error)
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

    return (
        <div className="p-4 bg-white rounded-lg dark:bg-darkblue">
            <div className="pb-6 dark:border-gray-500">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Project Owner Settings</h2>

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

                        <div className="flex items-center mt-4 justify-end gap-x-4">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">
                                Cancel
                            </button>
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

                {/* Manage Project Owners */}
                <div>
                    <label className="block mt-4 text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Manage Owners
                    </label>

                    <div className="border rounded-lg p-4 items-center mt-2 gap-2 justify-between">
                        {activeProject?.owners.map((owner, index) => (
                            <div key={index} className="flex justify-between">
                                <label htmlFor="companyname" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {owner}
                                </label>

                                <button
                                    type="button"
                                    className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                                >
                                    Revoke
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manage Project Editors */}
                <div>
                    <label className="block mt-4 text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Manage Editors
                    </label>

                    <div className="border rounded-lg p-4 items-center mt-2 gap-2 justify-between">
                        {activeProject?.editors.map((employee, index) => (
                            <div key={index} className="flex justify-between">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {employee}
                                </h2>

                                <button
                                    type="button"
                                    className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manage Project Viewers */}
                <div>
                    <label className="block mt-4 text-sm font-bold leading-6 text-gray-900 dark:text-slate-200">
                        Manage Viewers
                    </label>

                    <div className="border rounded-lg p-4 items-center mt-2 gap-2 justify-between">
                        {activeProject?.viewers.map((viewer, index) => (
                            <div key={index} className="flex justify-between">
                                <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                    {index + 1}. {viewer}
                                </h2>

                                <button
                                    type="button"
                                    className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                                >
                                    Remove
                                </button>
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
                                    >
                                        Accept
                                    </button>

                                    <button
                                        type="button"
                                        className="flex items-center text-sm font-semibold leading-6 text-red-600 dark:text-red-400 hover:underline"
                                    >
                                        Reject
                                    </button>
                                </div>
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
                            if (window.confirm('This action is irreversible and you will lose access to all your projects. Are you sure you want to leave the company? ')) {
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
                            if (window.confirm('This action is irreversible and you will lose access to all your projects. Are you sure you want to leave the company? ')) {
                                deleteProject();
                            }
                        }}
                    >
                        <IoTrashBin className="w-5 h-5 mr-2" />
                        Delete Project
                    </button>
                </div>
            </div>
        </div>
    )
}
