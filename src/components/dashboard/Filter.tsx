import { filterStore } from "@/lib/store";
import React from 'react'

type Props = {}

const Filter = ({}: Props) => {
    const [filters, setFilters] = filterStore(state => [state.filter, state.setFilter]);

    return (
        <div className="flex justify-center rounded-lg mb-8 border p-4 w-full max-w-screen-lg">
            {/* Country Dropdown */}
            <select
                className="p-2 border rounded-md mr-4"
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            >
                <option value="" className="font-semibold">Country</option>
                <option value="IN">India</option>
                <option value="US">USA</option>
            </select>

            {/* Subscription Dropdown */}
            <select
                className="p-2 border rounded-md mr-4"
                value={filters.subscription}
                onChange={(e) => setFilters({ ...filters, subscription: e.target.value })}
            >
                <option value="" className="font-semibold">Subscription</option>
                <option value="FREE">Free</option>
                <option value="PAID">Paid</option>
            </select>

            {/* OS Dropdown */}
            <select
                className="p-2 border rounded-md mr-4"
                value={filters.os}
                onChange={(e) => setFilters({ ...filters, os: e.target.value })}
            >
                <option value="" className="font-semibold">OS</option>
                <option value="LG">LG</option>
                <option value="SAMSUNG">Samsung</option>
            </select>

            {/* OSver Dropdown */}
            <select
                className="p-2 border rounded-md mr-4"
                value={filters.osver}
                onChange={(e) => setFilters({ ...filters, osver: e.target.value })}
            >
                <option value="" className="font-semibold">OS Version</option>
                <option value="1.0">1.0</option>
                <option value="1.0">1.1</option>
            </select>
        </div>
    )
}

export default Filter