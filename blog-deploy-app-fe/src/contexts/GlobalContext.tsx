'use client'
import React, { ReactNode, createContext, useState, Dispatch } from 'react'

type GlobalContextType = {
    progress: number
    setProgress: Dispatch<number>
    globalLoading: boolean
    setGlobalLoading: Dispatch<boolean>
}

interface IGlobalProvider {
    children: ReactNode
}

export const GlobalContext = createContext<GlobalContextType>({
    progress: 0,
    setProgress: () => {},
    globalLoading: false,
    setGlobalLoading: () => {},
})

export const GlobalProvider: React.FunctionComponent<IGlobalProvider> = ({ children }) => {
    const [progress, setProgress] = useState<number>(0)
    const [globalLoading, setGlobalLoading] = useState<boolean>(false)

    return (
        <GlobalContext.Provider value={{ progress, setProgress, globalLoading, setGlobalLoading }}>
            {children}
        </GlobalContext.Provider>
    )
}
