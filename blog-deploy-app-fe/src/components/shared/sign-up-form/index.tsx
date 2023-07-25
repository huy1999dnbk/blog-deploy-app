import { useContext } from 'react'
import TextInput from '@/components/UI/text-input'
import Button from '@/components/UI/button'
import { AuthContext } from '@/contexts/AuthContext'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    email: string
    name: string
    password: string
    confirmPassword: string
}

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<Inputs>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    })

    const { handleSignUp } = useContext(AuthContext)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {confirmPassword, ...user} = data
        handleSignUp(user)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                label="Email"
                formContainerClassName="mt-5"
                {...register('email', {
                    required: {
                        value: true,
                        message: 'email is required'
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'email is invalid',
                    },
                })}
            />
            {errors.email && <p className="text-red-600" role="alert">{errors.email?.message}</p>}
            <TextInput
                label="Name"
                formContainerClassName="mt-5"
                {...register('name', {
                    required: {
                        value: true,
                        message: 'name is require',
                    },
                })}
            />
            {errors.name && <p className="text-red-600" role="alert">{errors.name?.message}</p>}
            <TextInput
                label="Password"
                formContainerClassName="mt-5"
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Password is require',
                    },
                    minLength: {
                        value: 6,
                        message: 'password must at least 6 characters',
                    },
                })}
                type='password'
            />
            {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}
            <TextInput
                label="Comfirm Password"
                formContainerClassName="mt-5"
                {...register('confirmPassword', {
                    required: {
                        value: true,
                        message: 'Confirm password is required',
                    },
                    validate: (value) => {
                        const { password } = getValues()
                        return (
                            password === value ||
                            'Confirm password should match with password'
                        )
                    },
                })}
                type='password'
            />
            {errors.confirmPassword && (
                <p className="text-red-600" role="alert">{errors.confirmPassword?.message}</p>
            )}
            <div className="inline-block w-full text-center mt-4">
                <Button type="submit">Sign Up</Button>
            </div>
        </form>
    )
}

export default SignUpForm
