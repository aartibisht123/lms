
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './mongodb.js'
import { clerkwebhooks } from './controllers/webhooks.js'


// Initialize express 

const app = express()

//connect to database


// MiddleWares

app.use(cors())

// Routes
app.get('/', (req, res)=> res.send("API WORKING"))


// app.post('/clerk', express.json(), clerkwebhooks)

app.post("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkwebhooks);
app.use(express.json());
await connectDB()
// Prevent favicon.ico 500 error
app.get('/favicon.ico', (req, res) => res.status(204).end());
// Port

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})