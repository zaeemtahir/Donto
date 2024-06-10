import express from 'express'
import { getAllReviews } from '../Controllers/reviewDoctorController.js'

const router = express.Router()

router.get('/:name', getAllReviews)

export default router
