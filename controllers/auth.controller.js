
// IMPORTS
import { User } from '../models/User.js'
import { generateRefreshToken, generateAccessToken } from '../utils/tokenManager.js';

// Registrarse
export const register = async (req, res) => {
  // Recogemos los dados enviados por el body de la solicitud
  // Estos datos son el nombre, email y contraseña
  const { name, email, password } = req.body;
  try{
    // Creamos un usuario con el modelo que tenemos en MongoDB
    const user = new User({name, email, password});
    // Guardamos el usuario en nuestra base de datos
    await user.save();
    // Enviamos el json con el resultado exitoso de registro
    return res.json({status: 'ok', action: 'register' }); 
  }catch(e){
    // Si el error es 11000, implica que el email ya existe
    if(e.code === 11000)
      return res.status(400).json({ status: 'bad', error: 'Email already exists' })
    // Devolvemos un error por defecto en caso de que haya un error en el servidor
    return res.status(500).json({ status: 'bad', error: 'Something went wrong in server' })
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  // Obtenemos los datos necesarios del body de la solicitud
  const { email, password } = req.body;
  try{
    // Comprobamos que el usuario existe
    let user = await User.findOne({ email });
    // En caso de que no existe, devolvemos un json con la información del error
    if(!user)
      return res.status(403).json({ status: 'bad', error: 'User does not exists' })
    // Comprobamos que la contraseña coincide con la registrada en la base de datos
    const passwordResponse = await user.comparePassword(password);
    // Si las contraseñas no coinciden, enviamos un json con la información del error
    if(!passwordResponse)
      return res.status(403).json({ status: 'bad', error: 'Incorrect credentials' })
    // Creamos un JWT de acceso
    const { token, expiresIn } = generateAccessToken(user.id)
    // Creamos un RefreshJWT que se enviará al usuario mediante una cookie 
    generateRefreshToken(user.id, res)
    // Devolvemos un json con el resultado exitoso de la operación
    return res.json({ status: 'ok', action: 'login' })

  }catch(e){
    // Devolvemos el error en caso de error de servidor
    return res.status(500).json({ status: 'bad', error: 'Something went wrong in server' })

  }
}
 
// Obtener y enviar información del usuario
export const infoUser = async (req, res) =>{ 
  try{
    // Buscamos el usuario por id, usando lean() para obtener los datos simplificados
    const {name, email} = await User.findById(req.uid).lean();
    // Devolvemos la información mediante un json
    return res.json({status: 'ok', name, email })
  }catch(e){
    // En caso de error, devolvemos el mensaje asociado a este
    return res.status(401).json({ status: 'bad', error: e.message })

  }
}

// Refrescar el JWT de acceso
export const refreshToken = (req, res) =>{
  try {
    // Creamos un nuevo Token de acceso
    const { token, expiresIn } = generateAccessToken(req.uid);
    // Devolvemos el token con la fecha de expiración
    return res.json({ action: 'refreshToken', token, expiresIn })
  }catch(e){
    // En caso de error, devolvemos el mensaje asociado a este
    return res.status(401).send({ status: 'bad', error: e.message })
  }
}

// Cerrar sesión
export const logout = (req, res)=>{
  try{
    // ELiminamos la cookie refreshToken del navegador del cliente
    res.clearCookie('refreshToken')
    // Enviamos confirmación de cierre de sesión
    res.json({ status: 'ok', action: 'logout' })
  }catch(e){
    // En caso de error, devolvemos un mensaje informando al cliente de este error
    res.status(400).json({ status: 'bad', error: 'Something went wrong at loggin out, check you are login and refresh page'})
  }
}

// Eliminar usuario
export const removeUser = async (req, res)=>{
  try{
    // Buscamos el usuario en la base de datos por su id y lo borramos
    const result = await User.findByIdAndRemove(req.uid)
    // Comprobamos que el usuario definitivamente ha sido borrado
    const userDeleted = await User.findById(req.uid).lean();
    // En caso de que el usuario no se haya borrado, lanzamos un error
    if(userDeleted)
      throw new Error('No user removed');
    // En caso contrario, enviamos el mensaje de confirmación de usuario eliminado
    res.json({ status: 'ok', action: 'remove' })
  }catch(e){
    // En caso de error, devolvemos un mensaje informadno de que no se ha eliminado el usuario
    res.status(400).json({ status: 'bad', error: 'Something went wrong at loggin out, check you are login and refresh page'})
  }
}

