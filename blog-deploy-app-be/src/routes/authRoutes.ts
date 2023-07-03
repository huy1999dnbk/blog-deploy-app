import express from 'express'
import { registerUser, loginUser, handleRefreshToken, logOut } from 'controllers/authControllers'
import { validate } from 'utils/validateSchema/validate'
import { registerInfoSchema, loginInfoSchema } from 'utils/validateSchema/validateSchema'
const authRoutes = express()

authRoutes.get('/register', validate(registerInfoSchema), registerUser)
authRoutes.get('/login', validate(loginInfoSchema), loginUser)
authRoutes.get('/refresh-token', handleRefreshToken)
authRoutes.get('/log-out', logOut)

export default authRoutes
