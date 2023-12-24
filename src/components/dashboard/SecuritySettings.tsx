'use client'
import Link from 'next/link'
import { MdEdit } from "react-icons/md"

export default function SecuritySettings() {
    return (
        <form>
            <div className="p-4 bg-white rounded-lg dark:bg-darkblue">
                <div className="pb-6 border-b border-gray-900/10 dark:border-gray-500">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Security Settings</h2>
                    <p className="text-sm leading-6 text-gray-600 dark:text-slate-400">Secure your account below</p>

                    <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                Sign-in Email
                            </label>
                            <Link href={'/auth/reset-password'} className="flex items-center gap-2 text-sm font-semibold text-primary">
                                kartik100100@gmail.com
                                <MdEdit />
                            </Link>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block mb-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                Password
                            </label>
                            <Link href={'/auth/reset-password'} className="flex items-center gap-2 text-sm font-semibold text-primary">
                                Change Password
                                <MdEdit />
                            </Link>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block mb-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-200">
                                Phone Number
                            </label>
                            <Link href={'/auth/reset-password'} className="flex items-center gap-2 text-sm font-semibold text-primary">
                                Add Phone
                                <MdEdit />
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="flex items-center justify-end mt-4 gap-x-6">
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
            </div>
        </form>
    )
}
