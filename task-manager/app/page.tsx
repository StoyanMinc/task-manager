'use client';
import useRedirectUser from "@/hooks/useUserRedirect";

export default function Home() {
    useRedirectUser('/login')

    return (
        <main></main>
    );
}
