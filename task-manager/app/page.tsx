'use client';
import { useTaskContext } from "@/context/taskContext";
import useRedirectUser from "@/hooks/useUserRedirect";

export default function Home() {
    useRedirectUser('/login')
    const { tasks } = useTaskContext();
    
    return (
        <main></main>
    );
}
