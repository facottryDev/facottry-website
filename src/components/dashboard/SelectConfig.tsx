'use client'
import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronDown, BsCheckLg } from "react-icons/bs"

type Props = {
    list: { name: string }[]
}

export default function SelectConfig({ list }: Props) {
    const [selected, setSelected] = useState(list[0])
    
    return (
        <div className="w-52">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:border-primary400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary300 sm:text-sm dark:bg-darkblue">
                        <span className="block font-medium truncate">{selected.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <BsChevronDown
                                className="w-5 h-3 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg h-fit max-h-[60vh] ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-darkblue ">
                            {list.map((item, itemIdx) => (
                                <Listbox.Option
                                    key={itemIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary100 dark:text-white dark:bg-primary800 text-primary900 ' : 'text-slate-900 dark:text-white'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary900 dark:text-white">
                                                    <BsCheckLg className=" w-5 h-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
