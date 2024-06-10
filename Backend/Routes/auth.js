import express from 'express'
import {
  register,
  login,
  resetPassword,
} from '../Controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/', resetPassword)

export default router
