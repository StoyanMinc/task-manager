'use client'
import { useTaskContext } from "@/context/taskContext"
import { useUserContext } from "@/context/userContext";
import { badge, check, github } from "@/utils/icons";
import Image from "next/image";
import { useState } from "react";

export default function ProfileModal() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { user, userState, updateUser, changePassword, handlerUserInputs, emailVerification } = useUserContext();
    const { closeProfileModal } = useTaskContext();

    const { username, email, photo } = user;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeProfileModal();
        }
    };

    const passwordInputHandler = (e: any, type: string) => {
        if (type === 'old') {
            setOldPassword(e.target.value)
        } else if (type === 'new') {
            setNewPassword(e.target.value)
        }
    };

    const changePasswordHandler = async () => {
        await changePassword(oldPassword, newPassword);
        closeProfileModal();
    };

    const updateUserHandler = async (e: any) => {
        updateUser(e, userState);
        closeProfileModal();
    };

    const verifyEmailHandler = async () => {
        await emailVerification();
        closeProfileModal();
    }
    return (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden"
            onClick={handleOverlayClick}
        >
            <div
                className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md border-2 border-white"
            >
                <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md"></div>

                <div className="mt-4 relative flex justify-between">
                    <div className="relative inline-block">
                        <Image
                            src={photo}
                            alt="profile"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                        <div className="absolute bottom-0 right-1 shadow-sm">
                            <span className="text-lg text-blue-400">{badge}</span>
                            <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                                {check}
                            </span>
                        </div>
                    </div>
                    <div className="self-end flex items-center gap-2">
                        <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
                            {github} Github
                        </button>
                        <button
                            onClick={verifyEmailHandler}
                            disabled={user.isVerified}
                            className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
                            {user.isVerified ? (<>{check} Verified</>) : ('Verify email')}
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold">{username}</h1>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>

                <div className="border-t-2 border-t-[#323232]/10">
                    <div className="pt-2 grid grid-cols-[150px_1fr] ">
                        <label htmlFor="username" className="text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={username}
                            onChange={(e) => handlerUserInputs('username')(e)}
                            className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                        />
                    </div>
                    <div className="mt-4 pt-4 grid grid-cols-2 gap-4 border-t-2 border-t-[#323232]/10">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="oldPassWord" className="text-sm font-medium">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                value={oldPassword}
                                onChange={(e) => passwordInputHandler(e, 'old')}
                                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="newPassword" className="text-sm font-medium">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => passwordInputHandler(e, 'new')}
                                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={changePasswordHandler}
                            disabled={!oldPassword || !newPassword}
                            type="button"
                            className="mt-4 py-3 px-4 bg-blue-500 text-white text-sm font-medium rounded-md
                hover:bg-blue-400 transition-all duration-300"
                        >
                            Change Password
                        </button>
                    </div>
                    <div className="mt-4 flex justify-end gap-4 border-t-2 border-t-[#323232]/10">
                        <button
                            onClick={closeProfileModal}
                            className="mt-3 py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={updateUserHandler}
                            className="mt-3 py-2 px-4 bg-[#3aafae] text-white text-sm font-medium rounded-md
                hover:bg-[#2e8d8c]/90 transition-all duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}