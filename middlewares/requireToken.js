
// IMPORTS
import jwt from 'jsonwebtoken'

// Middleware para validar el Refresh JWT
export const requireRefreshToken = (req, res, next) => {
  try {
    // Obtenemos el Refresh JWT de las cookies de la solicitud
    const refreshTokenCookie = req.cookies.refreshToken;
    // Si no existe, lanzamos un error con la información necesaria
    if (!refreshTokenCookie)
      throw new Error('Token does not exist');
    // Verificamos y decodificamos el token de actualización para obtener el identificador de usuario (uid)
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    // Agregamos el id en los parámetros de la solicitud para su uso en siguientes middlewares
    req.uid = uid;
    // Continuamos con el siguiente middleware
    next();
  } catch (e) {
    // En caso de error, enviamos una respuesta de error con el mensaje asociado
    return res.status(401).json({ error: e.message });
  }
}

// Middleware para validar el token de acceso
export const requireAccessToken = (req, res, next) => {
  try {
    // Obtenemos, si es que existe, el token de acceso
    // Este token de acceso se encuentro en formato Bearer
    const bearerToken = req.headers?.authorization;
    // Lanzamos un error en caso de que no se encuentre el brearerToken
    if (!bearerToken) throw new Error('Token must be in bearer format');
    // Obtenemos el token, el formato es Bearer "token"
    // Donde Bearer es la posición [0] y token es la posición [1]
    const token = bearerToken.split(' ')[1];
    // Recogemos el payload del token, en este caso, el id del usuario
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    // Agregamos el id en los parámetros de la solicitud para su uso en siguientes middlewares
    req.uid = uid;
    // Continuamos con el siguiente middleware
    next();
  } catch (e) {
    // En caso de error, enviamos una respuesta de error con el mensaje asociado
    return res.status(401).json({ status: 'bad', error: e.message });
  }
}
