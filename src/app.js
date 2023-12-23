import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit:'16kb'}))// this line is to accept json data from the frontend and set a particular limit to it
app.use(express.urlencoded({extended: true, limit: "16kb"}))// this line to access the data from the url
app.use(express.static("public"))
app.use(cookieParser())// to access and set the cookie of user's browser


//routes

import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users",userRouter)

// so url will be http://localhost:8000/api/v1/users/register

export { app }