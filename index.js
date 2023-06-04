
// IMPORTS
import 'dotenv/config';
import express from 'express';
import './database/connectdb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth.route.js'

// Creamos una instancia que contiene la aplicación de express
const app = express();

// Creamos una lista con los dominios y puertos permitidos para realizar solicitudes al servidor
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

// Ajustamos los cors del servidor
// CORS: Mecanismo de seguridad que permite a los navegadores restringir las solicitudes realizadas en una página web.
app.use(cors({
  origin: (origin, callback)=> {
    // Verificamos si la URL de origen está en la lista blanca o si no se proporciona origen
    if ((!origin || whiteList.includes(origin)))
      // Permite la solicitud estableciendo el origen como válido
      callback(null, origin); 
    else
    // Devuelve un error de CORS si el origen no está autorizado
      callback("Error de CORS origin: " + origin + " No autorizado"); 
      
  },
  // Permitimos el envío de credenciales (necesario para el RefreshJWT)
  credentials: true
}));

// Ajustamos los headers de la solicitud
app.use((req, res, next)=> {
  // Permitimos el envío de cookies y encabezados de autenticación en la solicitud
  res.header('Access-Control-Allow-Credentials', true); 
  // Utilizamos el valor del encabezado Origin (dominio) de la solicitud, con esto permitimos que el origen pueda realizar solicitudes
  res.header('Access-Control-Allow-Origin', req.headers.origin); 
  // Definimos los métodos HTTP permitidos para la solicitud
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  // Definimos los encabezados permitidos para la solicitud
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'); 
  // Pasamos al siguiente middleware
  next();
});

// Permitimos json
app.use(express.json());

// Habilitamos que el directorio public pueda ser accesible por el cliente
app.use(express.static('public'))

// Permitimos el uso de cookies
app.use(cookieParser())

// Creamos la ruta principal de autorización (/api/auth/[login], /api/auth/[register])
// authRouter es el enrutador que creamos para manejar las rutas secundarias de la ruta de autorización
// Con esto, declaramos que todas las solicitudes que comiencen por /api/v1/auth sean manejadas por authRouter
app.use('/api/v1/auth', authRouter)

// Configuramos el puerto en el que queremos que inicie nuestra aplicación
const PORT = process.env.PORT || 3000;

// Abrimos el puerto de escucha del servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
