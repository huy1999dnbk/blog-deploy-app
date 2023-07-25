import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import TextInput from '@/components/UI/text-input'
import Button from '@/components/UI/button'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    email: string
    password: string
}

const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    })

    const {handleLogin, errorAuth} = useContext(AuthContext)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        handleLogin(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errorAuth && <p className="text-red-700 font-bold">{errorAuth}</p>}
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
                label="Password"
                formContainerClassName="mt-5"
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Password is require',
                    },
                })}
                type='password'
            />
            {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}
            <div className="inline-block w-full text-center mt-4">
                <Button type="submit">Sign In</Button>
            </div>
        </form>
    )
}

export default SignInForm
