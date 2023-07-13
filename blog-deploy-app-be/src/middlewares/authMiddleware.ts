import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../utils/db'
interface IUser {
  id: string
  email: string
  name: string | null
}
declare module 'express-serve-static-core' {
  export interface Request {
    user: IUser | undefined
  }
}
export const veryfyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      error: 'No token'
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN as string) as { id: string }
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id
      }
    })
    if (!user) {
      return res.status(302).json({
        error: 'User not found'
      })
    }
    const userData: IUser = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    req.user = userData
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Token Invalid'
    })
  }
}

export const getMe = (req: Request, res: Response) => {
  return res.status(200).json({
    user: req.user
  })
}
