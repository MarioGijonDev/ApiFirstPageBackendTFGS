
// IMPORTS
// Enviroment variables
import 'dotenv/config'
// Express
import express from 'express';
// MongoDB Database
import './database/connectdb.js'
// ROUTERS
import authRouter from './routes/auth.route.js'

// setting port
const PORT = process.env.PORT || 3000;

// setting express app
const app = express();

// enable json
app.use(express.json())

// setting the auth route (/api/login, /api/register)
app.use('/api/', authRouter)

// open listen port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
