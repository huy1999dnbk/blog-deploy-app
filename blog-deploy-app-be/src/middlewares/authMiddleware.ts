import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
declare module 'express-serve-static-core' {
  export interface Request {
    user: string | undefined
  }
}
export const veryfyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      error: 'No token! Authorization fail'
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN as string) as { id: string }
    req.user = decoded.id
    next()
  } catch (error) {
    return res.status(403).json({
      error: 'Token is invalid'
    })
  }
}

export const isLoggedIn = (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json({
      isAuthenticated: true
    })
  }
  return res.status(401).json({
    isAuthenticated: false
  })
}
