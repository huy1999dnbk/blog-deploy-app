import express, { Express, NextFunction, Request, Response } from 'express'
const app: Express = express()

const PORT = process.env.PORT || 5000

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log('server is running at port', PORT)
})
