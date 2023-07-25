import React, { ReactNode } from "react"

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isDisable?: false,
    onClick?: () => void,
    className?: string,
    children: ReactNode
}

const Button: React.FunctionComponent<IButton> = ({ isDisable, onClick, className, children, ...props }) => {
    return <button disabled={isDisable} onClick={onClick} className={`${className} text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`} {...props}>
        {children}
    </button>
}

export default Button