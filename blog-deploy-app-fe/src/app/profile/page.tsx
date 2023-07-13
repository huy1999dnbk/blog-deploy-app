'use client'
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { redirect } from 'next/navigation'

const Profile = () => {
    const { user } = useContext(AuthContext)

    if (!user) {
        redirect('/')
    }

    return (
        <>Profile user is here</>
    )
}

export default Profile