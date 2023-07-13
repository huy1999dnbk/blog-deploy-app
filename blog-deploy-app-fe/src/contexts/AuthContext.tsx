'use client'
import AxiosGlobal from '@/utils/AxiosConfig'
import React, { ReactNode, createContext, useState, Dispatch, useEffect } from 'react'

interface IUser {
    id: string,
    email: string,
    name: string
}

type AuthContextType = {
    user: IUser | null
    setUser: Dispatch<IUser>
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
})

export const AuthProvider: React.FunctionComponent<IAuthProvider> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null)
    
    const checkIsLoggedin = async() => {
        try {
            const data = await AxiosGlobal.get('/auth/getMe')
            if(data.status === 200) {
                setUser(data.data.user)
            } else {
                setUser(null)
            }
        } catch (error) {
            setUser(null)
        }
    } 

    useEffect(() => {
        checkIsLoggedin()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
