
// IMPORTS
// Enviroment variables
import 'dotenv/config';
// Express
import express from 'express';
// MongoDB Database
import './database/connectdb.js';
// Import cookieParser
import cookieParser from 'cookie-parser';
// Import cors
import cors from 'cors'

// ROUTERS
import authRouter from './routes/auth.route.js'

// Setting port
const PORT = process.env.PORT || 3000;

// Setting express app
const app = express();

/* const whiteList = [process.env.ORIGIN2, process.env.ORIGIN3]

// Enable cors
app.use(cors({
  origin: (origin, callback)=>{
    console.log(origin)
    if(whiteList.includes(origin))
      return callback(null, origin)
    
    return callback(`Cors error, origin ${origin} is not authorize`)
  }
})) */

app.use(cors())

// Enable json
app.use(express.json());

// Static means that the directory will be accessible
app.use(express.static('public'))

// Enable cookie
app.use(cookieParser())

// Setting the auth route (/api/auth/login, /api/auth/register)
app.use('/api/v1/auth', authRouter)

// Open listen port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
