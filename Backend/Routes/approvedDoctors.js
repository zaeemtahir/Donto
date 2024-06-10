import express from 'express'
import { getApprovedDoctors } from '../Controllers/doctorController.js'

const router = express.Router()

router.get('/', getApprovedDoctors)

export default router
