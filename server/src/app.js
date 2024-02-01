import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter) // /api/v1 just to tell its an api and version:1 {badd me changes krna easy hoga}
app.use("/api/v1/products", productRouter)

export default app