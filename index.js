
// IMPORTS
// Enviroment variables
import 'dotenv/config';
// Express
import express from 'express';
// MongoDB Database
import './database/connectdb.js';

// ROUTERS
import authRouter from './routes/auth.route.js'

// Setting port
const PORT = process.env.PORT || 3000;

// Setting express app
const app = express();

// Enable json
app.use(express.json());

// Setting the auth route (/api/auth/login, /api/auth/register)
app.use('/api/auth', authRouter)

// Open listen port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
