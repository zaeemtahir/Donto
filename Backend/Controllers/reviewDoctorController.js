import Review from '../models/ReviewSchema.js'
import Appointment from '../models/Appointment.js'

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const { name } = req.params
    const reviews = await Review.find({
      doctor: name,
    })
    res.status(200).json({
      success: true,
      message: 'Successful',
      data: reviews,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Not found',
    })
  }
}
