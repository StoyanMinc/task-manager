'use client'
import { useUserContext } from "@/context/userContext"
import React from "react";

interface MainContentLayoutProps {
    children: React.ReactNode
}

export default function MainContentLayout({ children }: MainContentLayoutProps) {

    const { user } = useUserContext();
    return (
        <main className={`${user._id ? 'pr-[20rem]' : ''} pb-[1rem] flex h-full`}>
            {children}
        </main>
    )
}