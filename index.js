
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

const whiteList = [process.env.ORIGIN1]

app.use(cors({
  origin: function (origin, callback) {
    console.log('origin => ' + origin);
    if( (!origin || whiteList.includes(origin))){
      return callback(null, origin)
    }
    return callback("Error de CORS origin: " + origin + " No autorizado")
  },
  credentials: true
}))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

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
