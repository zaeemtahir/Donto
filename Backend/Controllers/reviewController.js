import Review from '../models/ReviewSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Appointment from '../models/Appointment.js'

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const { id } = req.params
    const reviews = await Review.find({
      user: id,
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

// Create review
export const CreateReview = async (req, res) => {
  try {
    const { doctor, user, reviewText, rating, appointment } = req.body
    console.log(doctor, user, reviewText, rating)
    const review = new Review({
      doctor,
      user,
      reviewText,
      rating,
    })
    await review.save()
    // Update the appointment's reviewed status to true
    await Appointment.findByIdAndUpdate(
      appointment,
      { reviewed: true },
      { new: true },
    )
  } catch (err) {
    console.error('Error in CreateReview: ', err)
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}
