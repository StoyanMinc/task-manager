'use client'
import { useTaskContext } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext"
import { github, logout, moon, profile } from "@/utils/icons";
import Link from "next/link";

export default function Header() {
    const { user } = useUserContext();
    return (
        <header className="w-full px-6 my-4 flex items-center justify-between bg-[#f9f9f9]">
            <div>
                <h1 className="text-lg font-medium">
                    <span role="img" aria-label="wave">👋 </span>
                    {user._id ? `Welcome, ${user.username}!` : 'Welcome to Task Manager'}
                </h1>
                <p className="text-sm">
                    {user._id ? (
                        <>
                            You hav <span className="font-bold text-[#3aafae]">5</span> active tasks
                        </>
                    ) : (
                        'Please login or register to view your tasks!'
                    )}
                </p>
            </div>
            <div className="h-[50px] flex items-center gap-[10rem]">
                <button
                    className="bg-[#3aafae] text-white px-8 py-3 rounded-[50px] hover:bg-[rgb(73,160,158)] ease-in-out transition duration-400"
                >
                    Create a new task
                </button>
                <div className="flex items-center gap-4">
                    <Link
                        href={'https://github.com/Maclinz/taskfyer'}
                        passHref
                        target="_blank"
                        rel="noopener noopener"
                        className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#e6e6e6]"
                    >
                        {github}
                    </Link>
                    <Link
                        href={'https://github.com/Maclinz/taskfyer'}
                        passHref
                        target="_blank"
                        rel="noopener noopener"
                        className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#e6e6e6]"
                    >
                        {moon}
                    </Link>
                    <Link
                        href={'https://github.com/Maclinz/taskfyer'}
                        passHref
                        target="_blank"
                        rel="noopener noopener"
                        className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#e6e6e6]"
                    >
                        {profile}
                    </Link>
                    <button
                        // onClick={onClick}
                        className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#e6e6e6] hover:bg-gray-100 transition"
                        title="Logout"
                    >
                        {logout}
                    </button>
                </div>
            </div>
        </header>
    )
}