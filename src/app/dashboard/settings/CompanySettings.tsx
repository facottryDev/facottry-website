'use client'
import { PiUserCircleFill } from 'react-icons/pi'
import { userStore } from '@/lib/store'
import { axios_auth } from "@/lib/axios"
import Image from "next/image"

export default function AccountSettings() {
    const user = userStore(state => state.user)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const formData = new FormData(e.currentTarget)
            const data = Object.fromEntries(formData.entries())

            let body = {};

            if(data.name){
                const isValidName = (name: string) => {
                    const nameRegex = /^[a-zA-Z\s]+$/;
                    return nameRegex.test(name);
                };
    
                if (!isValidName(String(data.name))) {
                    throw new Error('Invalid name');
                }

                body = { ...body, name: data.name };
            }

            if(data.mobile){
                const isValidMobile = (mobile: string) => {
                    const mobileRegex = /^[0-9]{10}$/;
                    return mobileRegex.test(mobile);
                };
    
                if (!isValidMobile(String(data.mobile))) {
                    throw new Error('Invalid mobile number');
                }

                body = { ...body, mobile: data.mobile };
            }

            if(data.address){
                body = { ...body, address: data.address };
            }

            axios_auth.patch('/update-user', body);
            alert('User updated successfully')
            window.location.reload();
        } catch (error) {
            console.error(error)
            alert('Error updating user')
        }
    }

    return (
        <form className="p-4 bg-white rounded-lg dark:bg-darkblue" onSubmit={handleSubmit}>
            <div className="pb-6 border-b border-gray-900/10 dark:border-gray-500">
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Company Settings</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">Edit your information below</p>

                <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                        <label htmlFor="companyid" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                            CompanyID
                        </label>
                        <input
                            type="text"
                            name="companyid"
                            id="companyid"
                            disabled
                            value={user.email}
                            className=" block mt-2 w-full rounded-md border-0 py-1.5 text-gray-500 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:placeholder:text-slate-200"
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={user.name}
                            autoComplete="name"
                            className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:placeholder:text-slate-200"
                        />
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                            Address
                        </label>
                        <div className="mt-2">
                            <textarea
                                name="address"
                                id="address"
                                autoComplete="address"
                                placeholder={user.address}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 focus:ring-inset sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3 sm:col-start-1">
                        <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                            Mobile
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                autoComplete="phone"
                                placeholder={user.mobile}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 focus:ring-inset sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center mt-4 justify-end gap-x-6">
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
    )
}
