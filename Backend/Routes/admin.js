import express from 'express'
import { getCount } from '../Controllers/adminController.js'

const router = express.Router()

router.get('/', getCount)
export default router
