import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { AuthModalProvider } from '@/contexts/AuthModal'
import { GlobalProvider } from '@/contexts/GlobalContext'
import ProgressBar from '@/components/shared/progress-bar'
import Header from '@/components/shared/header/page'
import PrivateRoutes from '@/routes/PrivateRoutes'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className}>
                <div className="w-full h-full min-h-screen flex justify-center items-center bg-neutral-50">
                    <div className="max-w-screen-2xl w-full h-full min-h-screen bg-neutral-100">
                        <GlobalProvider>
                            <AuthModalProvider>
                                <AuthProvider>
                                    <ProgressBar />
                                    <Header />
                                    <PrivateRoutes>{children}</PrivateRoutes>
                                </AuthProvider>
                            </AuthModalProvider>
                        </GlobalProvider>
                    </div>
                </div>
            </body>
        </html>
    )
}
