'use client'
import React from 'react'
import AccountSettings from "@/app/dashboard/settings/AccountSettings"
import ToggleSwitch from "@/components/global/ToggleTheme"
import UserDropdown from "@/components/dashboard/UserDropdown"
import Link from "next/link"
import Image from "next/image"
import logo_2 from '@/assets/logo_2.svg'
import logo_dark_2 from '@/assets/logo_dark_2.svg'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="">
      <nav className="flex items-center justify-between m-4">
        <Link href={'/'} className="flex gap-2 items-center">
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
          <p className="font-extrabold text-2xl text-black dark:text-white">
            Fac<span className="text-primary">OTT</span>ry
          </p>
        </Link>

        <div className="flex items-center gap-6">
          <ToggleSwitch />
          <UserDropdown />
        </div>
      </nav>

      <AccountSettings />

      <div className="flex w-screen items-center justify-center">
        <Link href={'/onboarding/company'} className="text-primary600 font-bold py-2 px-4 rounded">
          Next Step &rarr;
        </Link>
      </div>
    </div>
  )
}

export default page