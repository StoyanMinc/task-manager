'use client'
import SideBar from "@/app/components/sidebar/SideBar";
import { useUserContext } from "@/context/userContext"

export default function SideBarProvider() {
    const { user } = useUserContext();
    return <>{user._id && <SideBar />}</>
}