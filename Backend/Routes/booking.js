import express from 'express'
import {
  getAllBookings,
  createBooking,
} from '../Controllers/bookingController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'

const router = express.Router({ mergeParams: true })

router.post('/', createBooking)
router.get(
  '/getBookings/:doctorId',
  // authenticate,
  // restrict(['patient']),

  getAllBookings,
)

export default router
