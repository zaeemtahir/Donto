import express from 'express'
import { CreateReview, getAllReviews } from '../Controllers/reviewController.js'

const router = express.Router()

router.post('/', CreateReview)
router.get('/:id', getAllReviews)

export default router
