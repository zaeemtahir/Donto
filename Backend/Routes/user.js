import express from 'express'
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from '../Controllers/userController.js'

import { authenticate, restrict } from '../auth/verifyToken.js'

const router = express.Router()

router.put('/:id', authenticate, restrict(['patient']), updateUser)
router.get('/', getAllUser)
router.delete('/:id', deleteUser)

export default router
