'use client'
import { useTaskContext } from "@/context/taskContext";

import { useState } from "react";

export default function Filters() {
    const { priority, setPriority } = useTaskContext();
    const [activePriority, setActivePriority] = useState(0)

    const priorityOptions = ['All', 'Low', 'Medium', 'High'];
    return (
        <div className="relative px-2 py-2 grid grid-cols-4 items-center gap-3 bg-[#f9f9f9] border-2 border-white rounded-md">
            <span className="absolute left-[5px] bg-[#ededed] rounded-md transition-all duration-300"
                style={{
                    width: 'calc(100% / 4 - 10px)',
                    height: 'calc(100% - 10px)',
                    transform: `translate(calc(${activePriority * 100}% + ${activePriority * 10}px))`,
                    transition: 'transform 300ms cubic-bezier(.95,.03,1,1)',

                }}
            ></span>
            {priorityOptions.map((p, i) => (
                <button
                    key={i}
                    className={`relative px-1 z-10 font-medium text-sm ${activePriority === i ? 'text-[#3aafae]' : 'text-gray-500'}`}
                    onClick={() => {
                        setActivePriority(i);
                        setPriority(p.toLowerCase());
                    }}
                >

                    {p}
                </button>
            ))}
        </div>
    )
}