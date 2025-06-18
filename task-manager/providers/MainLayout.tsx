import React from "react"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="main-layout flex-1 bg-[#ededed] border-2 border-white rounded-[1.5em] overflow-auto">
            {children}
        </div>
    )
}