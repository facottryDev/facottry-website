'use client'
import Image from "next/image"
import React from 'react'
import logo_1_dark from '@/assets/logo_dark_1.svg'
import logo_1 from '@/assets/logo_1.svg'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { axios_instance } from "@/lib/helpers"

const ForgotPassword = () => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;

        try {
            if (email) {
                const result1 = await axios_instance.post(`/is-registered`, {
                    email,
                });

                if (result1.data === false) {
                    console.log("Email not registered")
                    router.push(`/auth/signup`);
                } else {
                    const result2 = await axios_instance.post(`/send-otp`, {
                        email,
                    });

                    if (result2.status === 200) router.push(`/auth/forgot-password/verify?email=${email}`
                    );
                }
            } else {
                console.log("Email is required");
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen bg-gray-100 dark:bg-darkblue300">
            {/* Logo */}
            <Link href='/'>
                <Image src={logo_1} alt="logo" className="dark:hidden" width={100} height={100} />
                <Image src={logo_1_dark} alt="logo" className="hidden dark:block" width={100} height={100} />
            </Link>

            {/* Signup Form */}
            <div className="w-full bg-white shadow-lg border rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkblue dark:border-slate-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Forgot Password?
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" />
                        </div>

                        <button type="submit" className="mb-4 w-full bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-slate-400 dark:hover:bg-slate-300 transition-all text-white hover:bg-primary/80 dark:text-black">Continue</button>

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Don&apos;t have an account? <Link href="/auth/signup" className="font-semibold text-primary-600 hover:underline dark:text-primary-500">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword