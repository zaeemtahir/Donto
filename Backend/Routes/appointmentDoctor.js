import express from 'express'
import {
  createAppointment,
  getAppointment,
  getDoctorAppointment,
  deleteAppointment,
  updateStatus,
} from '../Controllers/appointmentController.js'

const router = express.Router()

router.post('/', createAppointment)
// router.get('/:id', getAppointment)
router.get('/:name', getDoctorAppointment)
router.delete('/:id', deleteAppointment)
router.patch('/:id', updateStatus)

export default router
