import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'

// router object
const router = express.Router()

// routes
router.post('/register',registerController);
router.post('/login',loginController);

// export
export default router