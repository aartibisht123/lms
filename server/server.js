
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './mongodb.js'
import { clerkwebhooks } from './controllers/webhooks.js'


// Initialize express 

const app = express()

//connect to database

await connectDB()
// MiddleWares

app.use(cors())

// Routes
app.get('/', (req, res)=> res.send("API WORKING"))
app.post('/clerk', express.json(), clerkwebhooks)
// Port

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})