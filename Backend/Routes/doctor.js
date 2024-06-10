import express from 'express'
import {
  getAllDoctors,
  updateApprovalStatus,
} from '../Controllers/doctorController.js'

const router = express.Router()

router.get('/', getAllDoctors)
router.patch('/:id', updateApprovalStatus)
export default router
