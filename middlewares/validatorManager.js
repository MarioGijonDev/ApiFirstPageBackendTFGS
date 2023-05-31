
// IMPORTS
// Import validation result express
import { validationResultExpress } from './validationResultExpress.js'
// Import body of express validator
import { body } from 'express-validator';

// Middleware for login validation
export const bodyLoginValidator = [

  // Check email
  body('email', 'Invalid email format')
    .trim() // remove sides spaces
    .isEmail(), // check email format

  // Check password
  body('password', 'Invalid password')
    .isLength({ min: 6 }), // has at least 6 characters

  validationResultExpress

]

// Middleware for register validation
export const bodyRegisterValidator = [

  // Check name
  body('name', 'Invalid name')
    .trim() // remove sides spaces
    .isLength({min: 2}), // has at least 3 characters
  // Check email
  body('email', 'Invalid email format')
    .trim() // remove sides spaces
    .isEmail(), // check email format

  // Check password
  body('password', 'Invalid password')
    .isLength({ min: 6 }), // has at least 6 characters

  validationResultExpress

]