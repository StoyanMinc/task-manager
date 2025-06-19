
'use client';

import React from 'react';
import { UserContextProvider } from '../context/userContext';
import { TaskProvider } from '../context/taskContext'
interface Pros {
    children: React.ReactNode;
}
function UserProvider({ children }: Pros) {
    return (
        <UserContextProvider>
            <TaskProvider>
                {children}
            </TaskProvider>
        </UserContextProvider>
    )
}

export default UserProvider;
