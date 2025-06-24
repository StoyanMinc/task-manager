'use client'
import ProfileModal from "@/app/components/profile-modal/ProfileModal"
import TaskModal from "@/app/components/task-modal/TaskModal"
import { useTaskContext } from "@/context/taskContext"
import React from "react"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { showTaskModal, showProfileModal } = useTaskContext();
    return (
        <div
            className="main-layout flex-1 bg-[#ededed] border-2 border-white rounded-[1.5em] overflow-auto"
        >
            {showTaskModal && <TaskModal />}
            {showProfileModal && <ProfileModal />}
            {children}
        </div>
    )
}