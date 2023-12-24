import React from 'react';
import Sidebar from "./Sidebar"
import ToggleSwitch from "../common/ToggleTheme"
import logo from '@/assets/logo_1.svg'
import Image from 'next/image'
import { BsChevronDown } from 'react-icons/bs';
import ContactForm from "../common/ContactForm";
import UserDropdown from "../common/UserDropdown";

const Pricing = () => {
    return (
        <section className="flex min-h-screen bg-bggray dark:bg-darkblue300">
            <Sidebar />
            <div className="w-full py-8 px-8 mx-auto ">
                <nav className="flex justify-between">
                    <div className="flex items-center mr-10 space-x-4">
                        <h1 className="text-2xl font-bold">Contact</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <ToggleSwitch />
                        <UserDropdown title="Kartik" />
                    </div>
                </nav>

                <hr className="w-full mt-4" />

                <div className="mt-8">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default Pricing;