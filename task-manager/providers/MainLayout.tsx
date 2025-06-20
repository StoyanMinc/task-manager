'use client'
import TaskModal from "@/app/components/task-modal/TaskModal"
import { useTaskContext } from "@/context/taskContext"
import React from "react"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { showTaskModal } = useTaskContext();
    return (
        <div
            className="main-layout flex-1 bg-[#ededed] border-2 border-white rounded-[1.5em] overflow-auto"
        >
            {showTaskModal && <TaskModal />}
            {children}
        </div>
    )
}