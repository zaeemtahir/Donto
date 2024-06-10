import express from 'express'
import { getAllAppointments } from '../Controllers/appointmentController.js'

const router = express.Router()

router.get('/', getAllAppointments)

export default router
