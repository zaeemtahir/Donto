import express from 'express'
import { getSingleUser } from '../Controllers/userController.js'

const router = express.Router()

router.get('/:id', getSingleUser)

export default router
