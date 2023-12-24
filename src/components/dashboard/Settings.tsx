'use client'
import React, { useState } from 'react';
import Sidebar from "./Sidebar"
import ToggleSwitch from "../common/ToggleTheme"
import logo from '@/assets/logo_1.svg'
import Image from 'next/image'
import { BsChevronDown } from 'react-icons/bs';
import AccountSettings from "./AccountSettings";
import ConfigSettings from "./ConfigSettings";
import SecuritySettings from "./SecuritySettings";
import UserDropdown from "../common/UserDropdown";

const tabs = [
    {
        name: 'account',
        label: 'Account',
    },
    {
        name: 'config',
        label: 'Config',
    },
    {
        name: 'security',
        label: 'Security',
    },
]

const Settings = () => {
    const [selectedTab, setSelectedTab] = useState('account');

    return (
        <section className="flex min-h-screen bg-bggray dark:bg-darkblue300">
            <Sidebar />

            <div className="w-full py-8 px-8 mx-auto ">
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
                        <UserDropdown title="Kartik" />
                    </div>
                </nav>

                <hr className="w-full mt-4" />

                <div className="mt-8">
                    {selectedTab === 'account' && <AccountSettings />}
                    {selectedTab === 'config' && <ConfigSettings />}
                    {selectedTab === 'security' && <SecuritySettings />}
                </div>
            </div>
        </section>
    );
};

export default Settings;