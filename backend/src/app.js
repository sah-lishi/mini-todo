import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
const allowedOrigin = ['http://localhost:5173']
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

app.use(express.json())

app.use(express.urlencoded())

app.use(express.static("public"))

app.use(cookieParser())

// import routes
import userRouter from '../src/routes/user.route.js'
import googleAuthRouter from '../src/routes/gauth.routes.js'
import todoRouter from '../src/routes/todo.routes.js'
import categoryRouter from '../src/routes/category.routes.js'
// declare routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/gauth", googleAuthRouter)
app.use("/api/v1/todos", todoRouter)
app.use("/api/v1/category", categoryRouter)

export default app
