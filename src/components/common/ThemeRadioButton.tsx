'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import Image from 'next/image'

type Props = {
    themes: {
        name: string,
        desc: string,
        image: any;
    }[],
}

export default function RadioButton({ themes }: Props) {
    const [selected, setSelected] = useState(themes[0])

    return (
        <div className="w-fit max-w-xl m-auto">
            <div className="mx-auto w-full">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Themes</RadioGroup.Label>
                    <div className="space-y-2">
                        {themes.map((theme) => (
                            <RadioGroup.Option
                                key={theme.name}
                                value={theme}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                        : ''
                                    }
                  ${checked ? 'bg-primary600 dark:bg-primary800 text-white' : 'bg-white dark:bg-darkblue'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none mb-4 `
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex flex-col justify-center w-full">
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-bold text-lg ${checked ? 'text-white' : 'text-gray-900'} dark:text-white`}
                                                        >
                                                            {theme.name}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${checked ? 'text-sky-100 dark:text-slate-200' : 'text-gray-500'
                                                                } `}
                                                        >
                                                            <span>
                                                                {theme.desc}
                                                            </span>
                                                        </RadioGroup.Description>
                                                    </div>
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

                                            <Image src={theme.image} alt="user" width={1000} height={1000} className="mt-2 rounded-xl" />
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