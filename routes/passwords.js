import { Router } from 'express';
import { createPassword, getPasswords, getUser, updatePassword, deletePassword } from '../controllers/passwords.js';
import checkToken from '../utils/checkToken.js';
const router = new Router();

// Create password
router.post('/', checkToken, createPassword);

// Get Passwords
router.get('/', checkToken, getPasswords);

// Get User
router.get('/user', checkToken, getUser);

// Update Passwords
router.put('/', checkToken, updatePassword);

// Delete Passwords
router.delete('/delpass', checkToken, deletePassword);

export default router;