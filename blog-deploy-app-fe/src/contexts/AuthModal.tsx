'use client'
import React, { ReactNode, createContext, useState, Dispatch } from 'react'

type AuthModalContextType = {
    isOpen: boolean
    setIsOpenModal: Dispatch<boolean>
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthModalContext = createContext<AuthModalContextType>({
    isOpen: false,
    setIsOpenModal: () => {},
})

export const AuthModalProvider: React.FunctionComponent<IAuthProvider> = ({ children }) => {
    const [isOpen, setIsOpenModal] = useState<boolean>(false)

    return (
        <AuthModalContext.Provider value={{ isOpen, setIsOpenModal }}>
            {children}
        </AuthModalContext.Provider>
    )
}
