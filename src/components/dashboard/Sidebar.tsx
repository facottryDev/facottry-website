'use client'
import React, { useState } from 'react';
import { FiHome, FiPlayCircle, FiBarChart2, FiFileText, FiShoppingCart, FiDollarSign, FiPhone, FiSettings, FiFolder } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image'
import logo_2 from '@/assets/logo_2.svg'
import logo_dark_2 from '@/assets/logo_dark_2.svg'
import { userStore, globalStore } from "@/lib/store";
import { IoClose } from "react-icons/io5";

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
  const allProjects = userStore(state => state.projects);
  const activeProject = userStore(state => state.activeProject);
  const setActiveProject = userStore(state => state.setActiveProject);
  const company = userStore(state => state.company);
  const sidebar = globalStore(state => state.sidebar);
  const setSidebar = globalStore(state => state.setSidebar);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectID = e.target.value;
    const project = allProjects.find((item) => item.projectID === projectID);
    if (project) {
      setActiveProject(project);
    }
  }

  return (
    <div className={`${sidebar ? 'block' : 'hidden'} bg-white p-8 pl-5 dark:bg-darkblue`}>
      <button onClick={() => { setSidebar(false) }} className="flex gap-2 items-center mb-8">
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
      </button>

      <div className="font-medium text-slate-700 dark:text-white">
        <SidebarButton href="/dashboard/home" label="Dashboard" icon={<FiHome />} />
        <SidebarButton href="/dashboard/playground" label="Playground" icon={<FiPlayCircle />} />
        {/* <SidebarButton href="/dashboard/analytics" label="Analytics" icon={<FiBarChart2 />} />
        <SidebarButton href="/docs" target='_blank' label="Documentation" icon={<FiFileText />} />
        <SidebarButton href="/dashboard/pricing" label="Upgrade" icon={<FiShoppingCart />} />
        <SidebarButton href="/dashboard/buy-features" label="Buy Features" icon={<FiDollarSign />} /> */}
        {/* <SidebarButton href="/dashboard/contact" label="Contact Us" icon={<FiPhone />} /> */}
        <SidebarButton href="/dashboard/settings/project" label="Project Settings" icon={<FiSettings />} />
      </div>

      <hr className="mt-4 w-full" />

      <div className="mt-4">
        <select
          id="project"
          name="project"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          onChange={handleProjectChange}
          value={activeProject?.projectID}
        >
          {allProjects
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <option key={item.projectID} value={item.projectID}>
                {item.name} - {item.type}
              </option>
            ))}
        </select>

        {/* Add new project button */}
        <Link href="/dashboard/project" className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-center hover:bg-gray-100 transition-all">
          Add Project
        </Link>

        <div className="flex flex-col mt-4 rounded-md text-sm items-center justify-center bg-gray-800 p-4">
          <button
            className={`bg-gray-700 text-white px-2 w-full py-1 rounded-md`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? 'Show Details' : 'Hide Details'}
          </button>

          <div
            className={`rounded-md mt-2 flex flex-col gap-2 text-white collapsible-content ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
              }`}
          >
            <span>
              <h3 className="font-bold">Project ID: </h3>
              <p>{activeProject?.projectID}</p>
            </span>

            <span>
              <h3 className="font-bold">Company: </h3>
              <p>{company?.name}</p>
            </span>

            <span>
              <h3 className="font-bold">Project Name: </h3>
              <p>{activeProject?.name}</p>
            </span>

            <span>
              <h3 className="font-bold">Project Type: </h3>
              <p>{activeProject?.type}</p>
            </span>

            <span>
              <h3 className="font-bold">Project Role: </h3>
              <p>{activeProject?.role}</p>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
