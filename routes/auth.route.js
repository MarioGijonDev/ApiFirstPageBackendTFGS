
// IMPORTS
// Import express
import { Router } from 'express';
// Import auth controllers (logic behind auth)
import { login, register, infoUser } from '../controllers/auth.controller.js';
// Import express validator
import { body } from 'express-validator';
// Import own validation result
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';

// Create reouter
const router = Router();

// Setting router for login
router.post('/login', [

  // Check email
  body('email', 'Invalid email format')
    .trim() // remove sides spaces
    .isEmail(), // check email format

  // Check password
  body('password', 'Invalid password')
    .isAlphanumeric() // has letters
    .isLength({ min: 6 }) // has at least 6 characters

], validationResultExpress, login);

// Settings router for register
router.post('/register',[

  // Check name
  body('name', 'Invalid name')
    .trim() // remove sides spaces
    .isAlphanumeric() // has letters
    .isLength({min: 2}), // has at least 3 characters

  // Check surname
  body('surname', 'Invalid surname')
    .trim() // remove sides spaces
    .isAlphanumeric() // check has letters
    .isLength({min: 2}), // has at least 3 characters

  // Check email
  body('email', 'Invalid email format')
    .trim() // remove sides spaces
    .isEmail(), // check email format

  // Check password
  body('password', 'Invalid password')
    .isAlphanumeric() // has letters
    .isLength({ min: 6 }) // has at least 6 characters

], validationResultExpress, register)

// Route for check protection with jwt
router.get('/protected', requireToken, infoUser)

// Exporting router
export default router;
