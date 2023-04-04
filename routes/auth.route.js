
// IMPORTS
// import express
import express from 'express';
// import auth controllers (logic behind auth)
import { login, register } from '../controllers/auth.controller.js';
// import express validator
import { body } from 'express-validator';
// import own validation result
import { validationResultExpress } from '../moddlewares/validationResultExpress.js';

// create reouter
const router = express.Router();

// setting router for login
router.post('/login', [
  // check email
  body('email', 'Incorrect email format')
    .trim() // remove sides spaces
    .isEmail(), // check email format
  // check password
  body('password')
    .isLength({ min: 6 }) // check has at leat 6 characters
], validationResultExpress, login);

// settings router for register
router.post('/register', validationResultExpress, register)

// exporting router
export default router;
