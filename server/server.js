import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import { clerkwebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'


// Initialize express 
const app = express()
app.use(express.json());

//connect to database
await connectDB()
await connectCloudinary()

// MiddleWares
app.use(cors())
app.use(clerkMiddleware())


// Routes
app.get('/', (req, res)=> res.send("API WORKING"))
app.post('/clerk', express.json(), clerkwebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({ type: 'application/json'}), stripeWebhooks)
// Port
const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})