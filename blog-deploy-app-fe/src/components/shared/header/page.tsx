'use client'
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { AuthModalContext } from "@/contexts/AuthModal"
import Button from "@/components/UI/button"
import Modal from "@/components/UI/dialog"
import SignUpForm from "../sign-up-form"
import SignInForm from "../sign-in-form"
import Link from "next/link"
const Header = () => {
    const { user, handleSignOut } = useContext(AuthContext)
    const { isOpen, setIsOpenModal, methodAuth, setMethodAuth } = useContext(AuthModalContext)
   
    const handleShowAuthModal = (type: string) => {
        setIsOpenModal(true)
        setMethodAuth(type)
    }

    const closeModal = () => {
        setIsOpenModal(false)

    }

    const titleModal = methodAuth === 'sign-in' ? 'Login form' : methodAuth === 'sign-up' ? 'Create an account' : ''

    return <header className="flex justify-center items-center p-3">
        <div className="max-w-screen-2xl flex justify-between w-full">
            <div>
                <Link href='/'>My blog app</Link>
            </div>
            <div>
                {user ? (
                    <div>
                        <Link href="/profile">Profile</Link>
                        <Button className="ml-3" onClick={handleSignOut}>Logout</Button>
                    </div>
                ) : (
                    <>
                        <Button onClick={() => handleShowAuthModal('sign-in')}>Sign in</Button>
                        <Button onClick={() => handleShowAuthModal('sign-up')}>Sign up</Button>
                    </>
                )}
            </div>
        </div>
        <Modal title={titleModal} isOpen={isOpen} onClose={closeModal}>
            <div>
                {methodAuth === 'sign-in' ? <SignInForm /> : methodAuth === 'sign-up' ? <SignUpForm /> : null}
                {methodAuth === 'sign-up' ? (
                    <p className="text-black mt-4">Already have an account? <span className="font-bold cursor-pointer" onClick={() => setMethodAuth('sign-in')}>Sign In</span></p>
                ) : methodAuth === 'sign-in' ? (
                    <p className="text-black mt-4">Not havent account yet? <span className="font-bold cursor-pointer" onClick={() => setMethodAuth('sign-up')}>Sign Up</span></p>
                ) : null}
            </div>
        </Modal>
    </header>
}

export default Header