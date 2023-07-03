import bcrypt from 'bcrypt'
const saltRounds = 10

export const hashPassword = (password: string) => bcrypt.hashSync(password, saltRounds)
export const comparePassword = (passwordInput: string, hashedPasswordInDb: string) =>
  bcrypt.compareSync(passwordInput, hashedPasswordInDb)
