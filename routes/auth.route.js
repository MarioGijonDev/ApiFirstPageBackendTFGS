
// IMPORTS
// Import express
import { Router } from 'express';
// Import auth controllers (logic behind auth)
import { login, register, infoUser , refreshToken, logout, removeUser} from '../controllers/auth.controller.js';
// Import middleware requireToken
import { requireToken } from '../middlewares/requireToken.js';
// Import middleware requireRefreshToken
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
// Import validator middlewares
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

// Create reouter
const router = Router();

// Setting router for login
router.post('/login', bodyLoginValidator, login);

// Settings router for register
router.post('/register', bodyRegisterValidator, register)

// Route for check protection with jwt
router.get('/protected', requireToken, infoUser)

// Route for generate refresh token
router.get('/refresh', requireRefreshToken, refreshToken)

// Route for logout
router.get('/logout', logout)

// Route for remove user account
router.get('/remove', requireToken, removeUser)

// Exporting router
export default router;
