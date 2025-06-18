'use client'
import IconCheck from "@/public/icons/IconCheck"
import IconDeleteAll from "@/public/icons/IconDeleteAll"
import IconFileCheck from "@/public/icons/IconFileCheck"
import IconGrid from "@/public/icons/IconGrid"
import IconStopwatch from "@/public/icons/IconStopwatch"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MiniSideBar() {

    const pathname = usePathname();
    const getStrokeColor = (link: string) => {
        return pathname === link ? '#3aafae' : '#71717a'
    }
    const navItems = [
        {
            icon: <IconGrid strokeColor={getStrokeColor('/')}/>,
            title: 'All',
            link: '/'
        },
        {
            icon: <IconFileCheck strokeColor={getStrokeColor('/completed')} />,
            title: 'completed',
            link: '/completed'
        },
        {
            icon: <IconCheck strokeColor={getStrokeColor('/pending')} />,
            title: 'pending',
            link: '/pending'
        },
        {
            icon: <IconStopwatch strokeColor={getStrokeColor('/overdue')} />,
            title: 'overdue',
            link: '/overdue'
        },
    ]
    return (
        <div className="flex flex-col w-[5rem] bg-[#f9f9f9]">
            <div className="flex justify-center items-center h-[5rem]">
                <Image src='/SMlogo.png' alt="logo" width={40} height={40} />
            </div>
            <div className="mt-8 flex flex-1 flex-col justify-between items-center bg-[#f9f9f9]">
                <ul className="flex flex-col gap-10 flex-1">
                    {navItems.map((item, index) => (
                        <li key={index} className="relative group">
                            <Link href={item.link}>{item.icon}</Link>
                            <span
                                className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                {item.title}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="mb-[1.5rem]">
                    <button className="w-12 h-12 flex justify-center items-center border-2 border-[#eb4e31] p-2 rounded-full">
                        <IconDeleteAll strokeColor="#eb4e31" />
                    </button>
                </div>
            </div>
        </div>
    )
}

