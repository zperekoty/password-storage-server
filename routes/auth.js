import { Router } from 'express';
import { register, authorize, logIn } from '../controllers/auth.js';
import checkToken from '../utils/checkToken.js';

const router = new Router();

// Registration
router.post('/registration', register);

// Authorization
router.post('/authorization', authorize);

// Logging in
router.get('/get', checkToken, logIn);

export default router;