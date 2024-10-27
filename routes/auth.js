import express from 'express';
import { register, login, adminRegister } from '../controllers/authController.js';

const router = express.Router();

// User registration
router.post('/register', register);

// User login
router.post('/login', login);

// Register admin
router.post('/admin', adminRegister);

export default router;
