'use client'
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import Link from "next/link"
const Header  = () => {
    const { user } = useContext(AuthContext)
    return <header className="flex justify-center items-center">
        <div className="max-w-screen-2xl">
            <div>
                <Link href='/'>My blog app</Link>
            </div>
            <div>
                {user ? (
                    <>User is logged in</>
                ) : (
                    <>
                        <button>Sign in</button>
                        <button>Sign up</button>
                    </>
                )}
            </div>
        </div>
    </header>
}

export default Header