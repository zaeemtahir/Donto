import express from 'express'
import { getSingleDoctor } from '../Controllers/doctorController.js'

const router = express.Router()

router.get('/:id', getSingleDoctor)
export default router
