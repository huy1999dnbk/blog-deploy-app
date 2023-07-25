'use client'
import AxiosGlobal from '@/utils/AxiosConfig'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
const Profile = () => {
    const { user } = useContext(AuthContext)
    const [info,setInfo] = useState('')
    const getSetting = async() => {
        const data = await AxiosGlobal.get('/auth/setting')
        setInfo(data?.data?.msg)
    }

    useEffect(() => {
        if(user) {
            getSetting()
        }
    }, [user])

    return (
        <div>Profile user is here {user?.email} +  {info}</div>
    )
}

export default Profile