'use client'
import React, { useContext, ReactNode, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
interface IPrivateRoute {
    children: ReactNode
}

const protectedRoutes = ['/profile']

const PrivateRoutes: React.FunctionComponent<IPrivateRoute> = ({
    children,
}) => {
    const { user, statusAuth } = useContext(AuthContext)
    const router = useRouter()
    const pathname = usePathname()
    const pathIsProtected = protectedRoutes.indexOf(pathname) !== -1

    useEffect(() => {
        if (statusAuth === 'unauthenticated' && !user && pathIsProtected) {
            router.push('/')
        }
    }, [statusAuth, user, pathIsProtected, router])

    if((statusAuth === 'not-known' || !user) && pathIsProtected) {
        return <>loading ........</>
    }

    return children
}

export default PrivateRoutes
