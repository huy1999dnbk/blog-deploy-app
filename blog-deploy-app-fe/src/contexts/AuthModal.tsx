'use client'
import React, { ReactNode, createContext, useState, Dispatch } from 'react'

type AuthModalContextType = {
    isOpen: boolean
    setIsOpenModal: Dispatch<boolean>
    methodAuth: string | null
    setMethodAuth: Dispatch<string | null>
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthModalContext = createContext<AuthModalContextType>({
    isOpen: false,
    setIsOpenModal: () => {},
    methodAuth: null,
    setMethodAuth: () => {},
})

export const AuthModalProvider: React.FunctionComponent<IAuthProvider> = ({ children }) => {
    const [isOpen, setIsOpenModal] = useState<boolean>(false)
    const [ methodAuth, setMethodAuth ] = useState<string | null>(null)

    return (
        <AuthModalContext.Provider value={{ isOpen, setIsOpenModal, methodAuth, setMethodAuth }}>
            {children}
        </AuthModalContext.Provider>
    )
}
