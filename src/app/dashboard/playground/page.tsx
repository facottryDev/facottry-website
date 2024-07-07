'use client'
import Sidebar from "@/components/dashboard/Sidebar"
import UserDropdown from "@/components/dashboard/UserDropdown"
import ToggleSwitch from "@/components/global/ToggleTheme"
import { globalStore, userStore } from "@/lib/store"
import Image from "next/image"
import logo_2 from '@/assets/logo_2.svg'
import logo_dark_2 from '@/assets/logo_dark_2.svg'
import { SDKDemo } from "./sdkDemo"
import SiteExamples from "./SiteExamples"

type Props = {}
const ownerTabs = ['SDK Demo', 'Site Examples']
const viewerTabs = ['SDK Demo', 'Site Examples']

const Playground = (props: Props) => {
    const activeProject = userStore(state => state.activeProject);
    const userRole = activeProject?.role;

    const roleTab = (userRole === 'owner' || userRole === 'editor') ? ownerTabs : viewerTabs;

    const [selectedTab, setSelectedTab, sidebar, setSidebar] = globalStore(state => [state.playgroundTab, state.setPlaygroundTab, state.sidebar, state.setSidebar]);

    return (
        <div className="flex min-h-screen dark:bg-darkblue300">
            <div>
                <Sidebar />
            </div>

            {/* Dashboard Home */}
            <div className="flex flex-col w-full bg-bggray p-8">
                {/* Top Navbar */}
                <nav className="flex justify-between">
                    <div className="flex items-center mr-10 space-x-4">
                        {!sidebar && (
                            <button onClick={() => {
                                setSidebar(true);
                            }}>
                                <Image
                                    src={logo_2}
                                    alt="FacOTTry"
                                    width={50}
                                    height={50}
                                    className="dark:hidden"
                                />
                                <Image
                                    src={logo_dark_2}
                                    alt="FacOTTry"
                                    width={50}
                                    height={50}
                                    className="hidden dark:block"
                                />
                            </button>
                        )}

                        <h1 className="text-2xl font-bold">Playground</h1>


                    </div>

                    <div className="flex items-center gap-6">
                        <ToggleSwitch />
                        <UserDropdown />
                    </div>
                </nav>

                <hr className="w-full mt-4" />

                <div>
                    <select
                        className="cursor-pointer text-sm font-medium text-center text-gray-500 dark:text-gray-400 mx-auto sm:hidden block w-full p-2 border border-gray-300 rounded-b-md"
                        value={selectedTab}
                        onChange={(e) => setSelectedTab(e.target.value)}
                    >
                        {roleTab.map((tab, index) => (
                            <option key={index} value={tab}>
                                {tab}
                            </option>
                        ))}
                    </select>
                    <div className="hidden sm:block text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
                        <ul className="flex space-x-1">
                            {roleTab.map((tab, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setSelectedTab(tab)}
                                        className={`tab-button ${selectedTab === tab ? 'tab-button-active' : ''}`}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {selectedTab === 'SDK Demo' && (
                    <SDKDemo />
                )}
                {selectedTab === 'Site Examples' && (
                    <SiteExamples />
                )}
            </div>
        </div>
    )
}

export default Playground