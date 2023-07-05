import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import appRoutes from 'routes'
import cookieParser from 'cookie-parser'
dotenv.config()
const app: Express = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'localhost:3000'
  })
)

app.use('/api/v1', appRoutes)

app.listen(PORT, () => {
  console.log('server is running at port', PORT)
})
