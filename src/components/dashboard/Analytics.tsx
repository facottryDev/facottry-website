import React from 'react'
import Sidebar from "./Sidebar"
import ToggleSwitch from "../common/ToggleTheme"
import SelectConfig from "../common/SelectConfig"
import { PieChart } from "../common/PieChart"
import UserDropdown from "../common/UserDropdown"

const config = [
    { name: 'sony.json' },
    { name: 'lg.json' },
    { name: 'samsung.json' },
    { name: 'mi.json' },
    { name: 'oneplus.json' },
    { name: 'apple.json' },
    { name: 'realme.json' },
]

const SubscriptionStats = {
    title: 'Subscriptions',
    value: '5,321',
    distribution: [
        { name: 'Paid', value: 40 },
        { name: 'Trial', value: 60 },
    ]
}

const UserStats = {
    title: 'Users',
    value: '1,234',
    distribution: [
        { name: 'Premium', value: 20 },
        { name: 'Pro', value: 50 },
        { name: 'Free', value: 30 },
    ]
}

const Analytics = () => {
    return (
        <div className="flex w-screen min-h-screen bg-bggray dark:bg-darkblue300">
            <Sidebar />

            {/* Dashboard Home */}
            <div className="flex flex-col w-full m-8">
                {/* Top Navbar */}
                <nav className="flex justify-between">
                    <div className="flex items-center mr-10 space-x-4">
                        <h1 className="text-2xl font-bold">Analytics</h1>

                        <SelectConfig list={config} />
                    </div>

                    <div className="flex items-center gap-6">
                        <ToggleSwitch />
                        <UserDropdown title="Kartik" />
                    </div>
                </nav>

                <hr className="w-full mt-4" />

                <div className="grid lg:grid-cols-3 gap-10 justify-around mt-8 ">
                    <PieChart data={SubscriptionStats} />
                    <PieChart data={SubscriptionStats} />
                    <PieChart data={SubscriptionStats} />
                    <PieChart data={UserStats} />
                    <PieChart data={UserStats} />
                    <PieChart data={UserStats} />
                </div>
            </div>
        </div>
    )
}

export default Analytics