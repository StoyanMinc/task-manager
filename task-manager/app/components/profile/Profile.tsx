'use client'

import { useTaskContext } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext"
import Image from "next/image";

export default function Profile() {
    const { user } = useUserContext();
    const { tasks, completedTasks, tasksInProgress } = useTaskContext();

    return (
        <div className="m-6">
            <div className="px-2 py-4 flex items-center gap-3 bg-[#e6e6e6]/20 rounded-[0.8rem] hover:bg-[#e6e6e6]/50 transition duration-300 ease-in-out cursor-pointer border-transparent hover:border-2 hover:border-white">
                <div>
                    <Image
                        src={user.photo}
                        alt={user.username}
                        width={70}
                        height={70}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h1 className="flex flex-col text-xl">
                        <span className="font-medium">Hello,</span>
                        <span className="font-bold">{user?.username}</span>
                    </h1>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-gray-400">
                        <p className="text-[14px]">Total tasks:</p>
                        <p className="pl-4 relative flex gap-2">
                            <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-[19%] translate-4-[-50%] bg-purple-500 rounded-[5px]"></span>
                            <span className="font-medium text-2xl text-[#333]">{tasks.length}</span>
                        </p>
                    </div>
                    <div className="text-gray-400">
                        <p className="text-[14px]">In progress:</p>
                        <p className="pl-4 relative flex gap-2">
                            <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-[19%] translate-4-[-50%] bg-blue-400 rounded-[5px]"></span>
                            <span className="font-medium text-2xl text-[#333]">{tasksInProgress.length}</span>
                        </p>
                    </div>
                    <div className="text-gray-400">
                        <p className="text-[14px]">Open tasks:</p>
                        <p className="pl-4 relative flex gap-2">
                            <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-[19%] translate-4-[-50%] bg-orange-300 rounded-[5px]"></span>
                            <span className="font-medium text-2xl text-[#333]">{tasksInProgress.length}</span>
                        </p>
                    </div>
                    <div className="text-gray-400">
                        <p className="text-[14px]">Completed:</p>
                        <p className="pl-4 relative flex gap-2">
                            <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-[19%] translate-4-[-50%] bg-green-300 rounded-[5px]"></span>
                            <span className="font-medium text-2xl text-[#333]">{completedTasks.length}</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}