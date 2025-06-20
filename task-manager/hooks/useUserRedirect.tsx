'use client'
import { useUserContext } from "@/context/userContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const useRedirectUser = (redirect: string) => {
    const { user } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (!user || !user._id) {
            router.push(redirect);
        }
    }, [redirect, router, user])
};

export default useRedirectUser;