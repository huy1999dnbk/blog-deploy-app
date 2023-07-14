import React from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid'

interface IIcon {
    className? : string
    onClick: () => void
}

const CloseIcon: React.FunctionComponent<IIcon> = ({ className, onClick }) => {
    return (
        <XCircleIcon
            className={`h-6 w-6 text-blue-500 ${className}`}
            onClick={onClick}
        />
    )
}

export default CloseIcon
