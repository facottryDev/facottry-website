'use client'
import { RadioGroup } from '@headlessui/react'
import Image from 'next/image'
import { FiTrash } from "react-icons/fi"
import { axios_config } from "@/lib/axios"
import { fetchConfigs } from "@/lib/fetch"
import { projectStore } from "@/lib/store"

type Props = {
    options: any[],
    onThemeChange: (theme: any) => void,
    theme: any,
    getConfigs: () => void,
    userRole: string,
}

export default function RadioButton({ userRole, getConfigs, options, theme, onThemeChange }: Props) {
    const activeProjectID = projectStore(state => state.activeProject.projectID);

    const handleDelete = async (configID: string) => {
        try {
            await axios_config.delete(`/delete-config?configID=${configID}`);
            alert("Theme deleted successfully");
            fetchConfigs(activeProjectID);
            getConfigs();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-fit max-w-xl m-auto">
            <div className="mx-auto w-full">
                <RadioGroup value={theme} onChange={onThemeChange}>
                    <RadioGroup.Label className="sr-only">Themes</RadioGroup.Label>
                    <div className="lg:grid grid-cols-2 lg:gap-4">
                        {options.map((option) => (
                            <RadioGroup.Option
                                key={option.name}
                                value={option}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                        : ''
                                    }
                  ${checked ? 'bg-primary600 dark:bg-primary800 text-white' : 'bg-white dark:bg-darkblue border rounded-lg'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none mb-4 `
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex flex-col justify-center w-full">
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex w-full justify-between items-center px-2">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-bold text-lg ${checked ? 'text-white' : 'text-gray-900'} dark:text-white`}
                                                        >
                                                            {option.name}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${checked ? 'text-sky-100 dark:text-slate-200' : 'text-gray-500'
                                                                } `}
                                                        >
                                                            {option.desc}
                                                        </RadioGroup.Description>
                                                        {checked && (
                                                            <div className="text-xs text-white bg-primary600 dark:bg-primary800 rounded-full ">
                                                                {JSON.stringify(option.params, null, 2)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {userRole && (userRole === 'editor' || userRole === 'owner') && (
                                                        <button className="ml-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all" onClick={() => handleDelete(option.configID)}>
                                                            <FiTrash />
                                                        </button>
                                                    )}
                                                </div>
                                                {checked && (
                                                    <div className="shrink-0 text-white">
                                                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                                                            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
                                                            <path
                                                                d="M7 13l3 3 7-7"
                                                                stroke="#fff"
                                                                strokeWidth={1.5}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            <Image src={option.demo_url} alt="user" width={1000} height={1000} className="mt-2 rounded-xl" />
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}