'use client'
import ToggleSwitch from "@/components/global/ToggleTheme";
import UserDropdown from "@/components/dashboard/UserDropdown";
import AccountSettings from "./AccountSettings";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useState } from 'react';
import CompanyEmployeeSettings from "./CompanyEmployeeSettings";
import CompanyOwnerSettings from "./CompanyOwnerSettings";
import SecuritySettings from "./SecuritySettings";
import { userStore } from "@/lib/store";
import ProjectOwnerSettings from "./ProjectOwnerSettings";
import ProjectEditorSettings from "./ProjectEditorSettings";
import ProjectViewerSettings from "./ProjectViewerSettings";

const tabs = [
    {
        name: 'account',
        label: 'Account',
    },
    {
        name: 'company',
        label: 'Company',
    },
    {
        name: 'project',
        label: 'Project',
    },
    {
        name: 'security',
        label: 'Security',
    },
]

const Settings = () => {
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTab') || 'account' as string);
    const company = userStore(state => state.company);
    const activeProject = userStore(state => state.activeProject);

    // Store selectedTab in local storage
    React.useEffect(() => {
        localStorage.setItem('selectedTab', selectedTab);
    }, [selectedTab]);

    return (
        <section className="flex min-h-screen dark:bg-darkblue300">
            <Sidebar />

            <div className="w-full bg-bggray p-8 mx-auto">
                <nav className="flex justify-between">
                    <div className="flex items-center mr-10 space-x-4">
                        <h1 className="text-2xl font-bold">Settings</h1>

                        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700 mx-auto mt-1">
                            <ul className="flex space-x-6 ml-4">
                                {tabs.map((tab, index) => (
                                    <li key={index} className="">
                                        <button
                                            onClick={() => { setSelectedTab(tab.name) }}
                                            className="inline-block py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 focus:text-primary transition-all focus:border-primary duration-300">
                                            {tab.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <ToggleSwitch />
                        <UserDropdown />
                    </div>
                </nav>

                <hr className="w-full mt-4" />

                <div className="mt-8">
                    {selectedTab === 'account' && <AccountSettings />}
                    {selectedTab === 'company' && company?.role === 'owner' && <CompanyOwnerSettings />}
                    {selectedTab === 'company' && company?.role === 'employee' && <CompanyEmployeeSettings />}

                    {selectedTab === 'project' && activeProject?.role === 'owner' && <ProjectOwnerSettings />}
                    {selectedTab === 'project' && activeProject?.role === 'editor' && <ProjectEditorSettings />}
                    {selectedTab === 'project' && activeProject?.role === 'viewer' && <ProjectViewerSettings />}
                    
                    {selectedTab === 'security' && <SecuritySettings />}
                </div>
            </div>
        </section>
    );
};

export default Settings;