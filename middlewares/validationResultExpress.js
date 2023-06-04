
// IMPORTS
import { validationResult } from "express-validator";

// Comprueba errores según las especificaciones dadas (esas especificaciones quedan guardadas en validationResult)
export const validationResultExpress = ((req, res, next) =>{
  // Ejecutamos la validación, enviando los campos de la solicitud
  const errors = validationResult(req);
  // Comprobamos que no haya errores (errors esté vacío)
  if(!errors.isEmpty())
    // Si hay errores, enviamos la respuesta con status 400 y los errores en formato json
    // status 400: Error en la sintaxis de la solicitud
    return res.status(400).json({ errors: errors.array() });  
  // Continuamos con el siguiente middleware
  next();
})

