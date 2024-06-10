import express from 'express';
import { createAppointment, getAppointment}  from '../Controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/:id', getAppointment)

export default router;
    