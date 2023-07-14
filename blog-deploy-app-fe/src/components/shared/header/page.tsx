'use client'
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { AuthModalContext } from "@/contexts/AuthModal"
import Button from "@/components/UI/button"
import Modal from "@/components/UI/dialog"
import Link from "next/link"
const Header = () => {
    const { user } = useContext(AuthContext)
    const { isOpen, setIsOpenModal } = useContext(AuthModalContext)

    const handleShowAuthModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    return <header className="flex justify-center items-center p-3">
        <div className="max-w-screen-2xl flex justify-between w-full">
            <div>
                <Link href='/'>My blog app</Link>
            </div>
            <div>
                {user ? (
                    <>User is logged in</>
                ) : (
                    <>
                        <Button onClick={handleShowAuthModal}>Sign in</Button>
                        <Button onClick={handleShowAuthModal}>Sign up</Button>
                    </>
                )}
            </div>
        </div>
        <Modal title="auth" isOpen={isOpen} onClose={closeModal}>auth here</Modal>
    </header>
}

export default Header