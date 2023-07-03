import express from 'express'
import authRoutes from './authRoutes'
const appRoutes = express()
appRoutes.use('/auth', authRoutes)

export default appRoutes
