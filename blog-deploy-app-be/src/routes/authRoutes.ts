import express from 'express'
import { registerUser, loginUser, handleRefreshToken, logOut } from '../controllers/authControllers'
import { validate } from '../utils/validateSchema/validate'
import { registerInfoSchema, loginInfoSchema } from '../utils/validateSchema/validateSchema'
import { getMe, veryfyToken } from '../middlewares/authMiddleware'
const authRoutes = express()

authRoutes.post('/register', validate(registerInfoSchema), registerUser)
authRoutes.post('/login', validate(loginInfoSchema), loginUser)
authRoutes.post('/refresh-token', handleRefreshToken)
authRoutes.post('/log-out', veryfyToken, logOut)
authRoutes.get('/getMe', veryfyToken, getMe)

export default authRoutes
