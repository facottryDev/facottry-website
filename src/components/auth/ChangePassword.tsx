'use client'
import Image from "next/image"
import React from 'react'
import logo_1_dark from '@/assets/logo_dark_1.svg'
import logo_1 from '@/assets/logo_1.svg'
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { axios_instance } from "@/lib/helpers"

export const ChangePassword = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = searchParams.get('email');
        const password = e.currentTarget.password.value;

        try {
            if (email) {
                let result = null;
                if(pathname === '/auth/forgot-password/change-password') {
                    result = await axios_instance.post(`/forgot`, {
                        password
                    });
                } else{
                    result = await axios_instance.post(`/register`, {
                        password
                    });
                }

                if (result.status === 200) router.push(`/auth/login`);
            } else {
                console.log("Email is required");
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen ">
            {/* Logo */}
            <Link href='/'>
                <Image src={logo_1} alt="logo" className="dark:hidden" width={100} height={100} />
                <Image src={logo_1_dark} alt="logo" className="hidden dark:block" width={100} height={100} />
            </Link>

            {/* New Password */}
            <div className="w-full bg-white shadow-lg border rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkblue dark:border-slate-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Your Password
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New Password" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirm-new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                            <input type="password" name="confirm-new-password" id="confirm-new-password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm New Password" />
                        </div>

                        <button type="submit" className="mb-4 w-full bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-slate-400 dark:hover:bg-slate-300 transition-all text-white hover:bg-primary/80 dark:text-black">Submit</button>

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Already have an account? <Link href="/auth/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    )
}
