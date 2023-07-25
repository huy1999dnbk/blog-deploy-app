import React, { forwardRef, Ref } from 'react'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label?: string
    formContainerClassName?: string
}

const TextInput = forwardRef((props: IInput, ref: Ref<HTMLInputElement>) => {
    const { label, className, formContainerClassName, ...rest } = props
    return (
        <div className={`${formContainerClassName}`}>
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    {label}
                </label>
            )}
            <input
                className={`${className} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"`}
                {...rest}
                ref={ref}
            ></input>
        </div>
    )
})

TextInput.displayName = 'TextInput'

export default TextInput
