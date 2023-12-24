import React from 'react';
import { FiHome, FiBarChart2, FiFileText, FiShoppingCart, FiDollarSign, FiPhone, FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image'
import logo_2 from '@/assets/logo_2.svg'
import logo_dark_2 from '@/assets/logo_dark_2.svg'

const SidebarButton = ({ href, label, icon, target }: {
  href: string;
  label: string;
  icon: React.ReactNode;
  target?: string;
}) => (
  <Link href={href} target={target} className="flex items-center p-3 hover:text-primary transition">
    <span className="mr-3 text-xl">{icon}</span>
    {label}
  </Link>
);

const Sidebar = () => {
  return (
    <div className="hidden md:block bg-white p-8 pl-5 dark:bg-darkblue">
      <Link href={'/'} className="flex gap-2 items-center mb-8">
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

      <div className="font-medium text-slate-700 dark:text-white">
        <SidebarButton href="/dashboard/home" label="Dashboard" icon={<FiHome />} />
        <SidebarButton href="/dashboard/analytics" label="Analytics" icon={<FiBarChart2 />} />
        <SidebarButton href="/docs" target='_blank' label="Documentation" icon={<FiFileText />} />
        <SidebarButton href="/dashboard/pricing" label="Upgrade" icon={<FiShoppingCart />} />
        <SidebarButton href="/dashboard/buy-features" label="Buy Features" icon={<FiDollarSign />} />
        <SidebarButton href="/dashboard/contact" label="Contact Us" icon={<FiPhone />} />
        <SidebarButton href="/dashboard/settings" label="Settings" icon={<FiSettings />} />
      </div>

      <hr className="mt-4 w-full" />
    </div>
  );
};

export default Sidebar;
