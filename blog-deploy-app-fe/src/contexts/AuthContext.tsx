'use client'
import { useContext } from 'react'
import AxiosGlobal from '@/utils/AxiosConfig'
import { AuthModalContext } from './AuthModal'
import { axiosProgress } from '@/utils/utils'
import { GlobalContext } from './GlobalContext'
import React, {
    ReactNode,
    createContext,
    useState,
    Dispatch,
    useEffect,
} from 'react'
interface IUserSignUp {
    email: string
    name: string
    password: string
}

interface IUserSignIn {
    email: string
    password: string
}

interface IUser {
    id: string
    email: string
    name: string
}

type AuthContextType = {
    user: IUser | null
    setUser: Dispatch<IUser>
    errorAuth: string | null
    setErrorAuth: Dispatch<string | null>
    handleSignUp: (data: IUserSignUp) => void
    handleLogin: (data: IUserSignIn) => void
    handleSignOut: () => void
    statusAuth: string
    setStatusAuth: Dispatch<string>
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    errorAuth: null,
    setErrorAuth: () => {},
    handleSignUp: (data: IUserSignUp) => {},
    handleLogin: (data: IUserSignIn) => {},
    handleSignOut: () => {},
    statusAuth: 'unauthenticated',
    setStatusAuth: () => {},
})

export const AuthProvider: React.FunctionComponent<IAuthProvider> = ({
    children,
}) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [errorAuth, setErrorAuth] = useState<string | null>(null)
    const {setIsOpenModal} = useContext(AuthModalContext)
    const {setProgress, setGlobalLoading} = useContext(GlobalContext)
    const [statusAuth, setStatusAuth] = useState('not-known')
    const checkIsLoggedin = async () => {
        setGlobalLoading(true)
        setStatusAuth('not-known')
        try {
            const data = await AxiosGlobal.get('/auth/getMe', axiosProgress(setProgress))
            if (data.status === 200) {
                setUser(data.data.user)
                setGlobalLoading(false)
                setStatusAuth('authenticated')
            } else {
                setUser(null)
                setGlobalLoading(false)
            }
        } catch (error) {
            setGlobalLoading(false)
            setUser(null)
            setStatusAuth('unauthenticated')
        }
    }

    const handleSignUp = async (dataSignUp: IUserSignUp) => {
        setErrorAuth(null)
        setStatusAuth('not-known')
        try {
            const data  = await AxiosGlobal.post(
                '/auth/register',
                dataSignUp,
                axiosProgress(setProgress)
            )
            if (data.status === 201) {
                const userInfo = {
                    id: data.data.id,
                    email: data.data.email,
                    name: data.data.name,
                }
                setUser(userInfo)
                setStatusAuth('authenticated')
                localStorage.setItem('accessToken', data.data.accessToken)
                setErrorAuth(null)
                setIsOpenModal(false)

            }
        } catch (error) {
            console.log(error)
            setStatusAuth('unauthenticated')
        }
    }

    const handleLogin = async (dataSignIn: IUserSignIn) => {
        setErrorAuth(null)
        setStatusAuth('not-known')
        try {
            const data  = await AxiosGlobal.post(
                '/auth/login',
                dataSignIn,
                axiosProgress(setProgress)
            )
            if (data.status === 200) {
                const userInfo = {
                    id: data.data.id,
                    email: data.data.email,
                    name: data.data.name,
                }
                setUser(userInfo)
                setStatusAuth('authenticated')
                localStorage.setItem('accessToken', data.data.accessToken)
                setErrorAuth(null)
                setIsOpenModal(false)
            }
        } catch (error: any) {
            console.log(error)
            setErrorAuth(error?.response?.data?.error)
            setStatusAuth('unauthenticated')
        }
    }

    const handleSignOut = async() => {
        setStatusAuth('unauthenticated')
        try {
            const data = await AxiosGlobal.post(
                '/auth/log-out',
                axiosProgress(setProgress)
            )
            if (data.status === 200 || data.status === 302){
                AxiosGlobal.defaults.headers.common.Authorization = ''
                setUser(null)
                localStorage.clear()
            }
        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(() => {
        checkIsLoggedin()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                handleSignUp,
                errorAuth,
                setErrorAuth,
                handleLogin,
                handleSignOut,
                statusAuth,
                setStatusAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
