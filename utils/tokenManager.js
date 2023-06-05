
// IMPORTS
import jwt from 'jsonwebtoken'

// Función para generar el JWT de acceso
// Recibe el id del usuario como parámetro
export const generateAccessToken = (uid) => {
  // Asignaremos 15 minutos de duración del token
  const expiresIn = 60 * 15;
  try {
    // Creamos el JWT de acceso con el uid como carga útil
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    // Devolvemos el token y el tiempo de expiración
    return { token, expiresIn };
  } catch (e) {
    // En caso de error, lo mostramos en la terminal
    console.log(e);
  }
}
// Función para generar el Refresh JWT
// Recibe el id del usuario y la respuesta como parámetro
export const generateRefreshToken = (uid, res) => {
  // Asignaremos 30 días de duración del token de refresco
  const expiresIn = 1000 * 60 * 60 * 24 * 30;
  try {
    // Creamos el Refresh JWT con el uid como carga útil
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
    // Añadimos el Refresh JWT a la respuesta en forma de cookie
    res.cookie('refreshToken', refreshToken, {
      secure: !(process.env.MODO === 'developer'), // Para enviar como http o https
      expires: new Date(Date.now() + expiresIn),
      httpOnly: true // Para enviarlo como HTTPOnly
    });
  } catch (e) {
    // En caso de error, lo devolvemos en la respuesta en formato json
    return res.status(401).json({ error: 'Error al generar el token de refresco' });
  }
}


