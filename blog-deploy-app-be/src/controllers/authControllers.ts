import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import { prisma } from '../utils/db'
import { hashPassword, comparePassword } from '../utils/password'
import { signAccessToken, signRefreshToken } from '../utils/jwt'
import jwt from 'jsonwebtoken'
const excludedField = ['hashedPassword']
export const registerUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body
  const existedUser = await prisma.user.findFirst({
    where: {
      email
    }
  })
  //check if email is already existed
  if (existedUser) {
    return res.status(400).json({
      error: 'Email already exists'
    })
  }
  const hashedPassword = hashPassword(password)
  const createdUser = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  })
  const accessToken = signAccessToken({
    id: createdUser.id
  })
  const refreshToken = signRefreshToken({
    id: createdUser.id
  })
  //remove password field when return response
  const createdUserWithoutPassword = omit(createdUser, excludedField)
  //store refresh token in database
  const refreshTokenCreated = await prisma.tokens.create({
    data: {
      refreshToken,
      user_id: createdUser.id
    }
  })
  //set cookie for refresh token
  res.cookie('refreshToken', refreshTokenCreated.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  return res.status(201).json({
    ...createdUserWithoutPassword,
    accessToken
  })
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const existedUser = await prisma.user.findFirst({
    where: {
      email
    }
  })
  //check if email is already existed
  if (!existedUser) {
    return res.status(400).json({
      error: 'Invalid credentials'
    })
  }
  const isPasswordValid = comparePassword(password, existedUser.hashedPassword)
  if (!isPasswordValid) {
    return res.status(400).json({
      error: 'Invalid credentials'
    })
  }
  const accessToken = signAccessToken({
    id: existedUser.id
  })
  const refreshToken = signRefreshToken({
    id: existedUser.id
  })
  //remove password field when return response
  const createdUserWithoutPassword = omit(existedUser, excludedField)
  //store refresh token in database
  const refreshTokenCreated = await prisma.tokens.create({
    data: {
      refreshToken,
      user_id: existedUser.id
    }
  })
  //set cookie for refresh token
  res.cookie('refreshToken', refreshTokenCreated.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  return res.status(201).json({
    ...createdUserWithoutPassword,
    accessToken
  })
}

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookie = req.cookies
  if (!cookie) {
    return res.status(302).json({
      error: 'Refresh token is required'
    })
  }
  const refreshToken = cookie.refreshToken
  res.clearCookie('refreshToken', {
    httpOnly: true
  })
  const refreshTokenInDb = await prisma.tokens.findFirst({
    where: {
      refreshToken
    }
  })
  if (!refreshTokenInDb) {
    return res.status(302).json({
      error: 'Refresh token is invalid'
    })
  }
  await prisma.tokens.delete({
    where: {
      id: refreshTokenInDb.id
    }
  })
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN as string) as { id: string }
    const newAccessToken = signAccessToken({
      id: decoded.id
    })
    const newRefreshToken = signRefreshToken({
      id: decoded.id
    })
    const newRefreshTokenInDb = await prisma.tokens.create({
      data: {
        refreshToken: newRefreshToken,
        user_id: decoded.id
      }
    })
    res.cookie('refreshToken', newRefreshTokenInDb.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
      accessToken: newAccessToken
    })
  } catch (error) {
    return res.status(302).json({
      error: 'Refresh token is invalid'
    })
  }
}

export const logOut = async (req: Request, res: Response) => {
  const cookie = req.cookies
  if (!cookie) {
    return res.status(302).json({
      error: 'Refresh token is required'
    })
  }
  res.clearCookie('refreshToken', {
    httpOnly: true
  })
  const refreshToken = cookie.refreshToken
  const refreshTokenInDb = await prisma.tokens.findFirst({
    where: {
      refreshToken
    }
  })
  if (!refreshTokenInDb) {
    return res.status(302).json({
      error: 'Refresh token is invalid'
    })
  }
  await prisma.tokens.delete({
    where: {
      id: refreshTokenInDb.id
    }
  })
  // need to clear req.user in here too
  req.user = undefined
  return res.status(200).json({
    msg: 'Log out successfully'
  })
}
