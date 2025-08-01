import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    // origin: 'https://well-ness-app.vercel.app',
    credentials: true
}))

app.use(express.json({
    limit:'16kb'
}))
app.use(express.urlencoded({
    extended: true,
    limit:'16kb'
}))

app.use(express.static('public'))

app.use(cookieParser())

import authRoutes from './routes/auth.route.js'
app.use('/auth', authRoutes)

import sessionRoutes from './routes/session.route.js'
app.use('/api', sessionRoutes)

export { app }