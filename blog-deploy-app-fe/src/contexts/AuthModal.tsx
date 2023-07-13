'use client'
import React, { ReactNode, createContext, useState, Dispatch } from 'react'

type AuthModalContextType = {
    isOpen: boolean
    setIsModal: Dispatch<boolean>
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthModalContext = createContext<AuthModalContextType>({
    isOpen: false,
    setIsModal: () => {},
})

export const AuthModalProvider: React.FunctionComponent<IAuthProvider> = ({ children }) => {
    const [isOpen, setIsModal] = useState<boolean>(false)

    return (
        <AuthModalContext.Provider value={{ isOpen, setIsModal }}>
            {children}
        </AuthModalContext.Provider>
    )
}
