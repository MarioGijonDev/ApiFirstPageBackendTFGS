
// IMPORTS
import { Router } from 'express';
import { login, register, infoUser , refreshToken, logout, removeUser} from '../controllers/auth.controller.js';
import { requireAccessToken, requireRefreshToken } from '../middlewares/requireToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

// Creamos una instancia router para manejar las solicitudes al servidor
const router = Router();

// Definimos las rutas, y los middlewares que se ejecutarán secuencialmente por cada ruta

// Ruta para registrarse
// 1º bodyRegisterValidator -> Valdidar los campos de registro
// 2º register -> Contendrá la lógica para registrarse
router.post('/register', bodyRegisterValidator, register)

// Ruta para iniciar sesión
// 1º bodyLoginValidator -> Validar los campos de inicio de sesión
// 2º login -> Contendrá la lógica para iniciar sesión
router.post('/login', bodyLoginValidator, login);

// Ruta para refrescar el JWT de acceso
// 1º requireRefreshToken -> Comprueba el Refresh JWT
// 2º refreshToken -> Refresca el JWT de acceso
router.get('/refresh', requireRefreshToken, refreshToken)

// Ruta para proteger la página comprobando el JWT
// 1º requireAccessToken -> Comprueba el JWT de acceso
// 2º infoUser -> Devuelve la información del usuario (nombre y correo)
router.get('/protected', requireAccessToken, infoUser)

// Ruta para cerrar sesión
// 1º logout -> Contendrá la lógica para cerrar de sesión
router.get('/logout', logout)

// Ruta para eliminar usuario
// 1º requireAccessToken -> Comprueba el JWT de acceso
// 2º removeUser -> Elimina el usuario de la base de datos
router.get('/remove', requireAccessToken, removeUser)

// Exportamos el router
export default router;
