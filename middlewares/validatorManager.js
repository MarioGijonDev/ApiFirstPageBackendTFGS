
// IMPORTS
import { validationResultExpress } from './validationResultExpress.js'
import { body } from 'express-validator';

// Middleware encargado de validar los campos email y password del formulario de inicio de sesión
export const bodyLoginValidator = [
  // Comprueba el email
  body('email', 'Invalid email format')
    .trim() // Elimina espacios a los lados
    .isEmail(), // Comprueba formato de email
  // Comprueba la contraseña
  body('password', 'Invalid password')
    .isLength({ min: 6 }), // Mínimo 6 caractéres
  // Este middleware se encarga de mostrar o validar finalmente según los requerimientos definidos
  validationResultExpress
]

// Middleware encargado de validar los campos name, email, password del formulario de registro
export const bodyRegisterValidator = [
  // Comprueba el nombre
  body('name', 'Invalid name')
  .trim() // Elimina espacios a los lados
    .isLength({min: 2}), // Mínimo 2 caractéres
  // Comprueba el email
  body('email', 'Invalid email format')
  .trim() // Elimina espacios a los lados
  .isEmail(), // Comprueba formato de email
  // Comprueba la contraseña
  body('password', 'Invalid password')
    .isLength({ min: 6 }), // Mínimo 6 caractéres
  // Este middleware se encarga de mostrar o validar finalmente según los requerimientos definidos
  validationResultExpress
]

