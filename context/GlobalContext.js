'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const { data: session } = useSession()

    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        const fetchUnreadCount = async () => {
            const result = await getUnreadMessageCount()

            setUnreadCount(result.count)
        }

        if (session) {
            fetchUnreadCount()
        } else {
            setUnreadCount(0)
        }
    }, [session])

    return (
        <GlobalContext.Provider
            value={{
                unreadCount,
                setUnreadCount
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext(){
    return useContext(GlobalContext)
}


