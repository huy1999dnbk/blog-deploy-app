import jwt from 'jsonwebtoken'

export const signAccessToken = (data: { id: string }) => {
  return jwt.sign(data, process.env.JWT_SECRET_ACCESS_TOKEN as string, {
    expiresIn: '1h'
  })
}

export const signRefreshToken = (data: { id: string }) => {
  return jwt.sign(data, process.env.JWT_SECRET_REFRESH_TOKEN as string, {
    expiresIn: '7d'
  })
}
