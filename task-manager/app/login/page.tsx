'use client'
import { useUserContext } from "@/context/userContext";
import LoginForm from "../components/auth/loginForm/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
    const router = useRouter();
    const { user } = useUserContext();

    useEffect(() => {
        if (user && user._id) {
            router.push('/');
        }
    }, [user, router]);

     if (user && user._id) {
            return null
        }
    return (
        <div className="auth-page w-full h-full flex justify-center items-center">
            <LoginForm />
        </div>
    )
}