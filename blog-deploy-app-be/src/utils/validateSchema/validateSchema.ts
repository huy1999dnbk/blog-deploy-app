import { z } from 'zod'

export const registerInfoSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required'
    }),
    name: z.string({
      required_error: 'Name is required'
    }),
    password: z.string().min(6, { message: 'Must be 6 or more characters long' })
  })
})

export const loginInfoSchema = z.object({
  body: z.object({
    email: z.string().min(1, { message: 'This field has to be filled.' }).email('email is invalid'),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})
