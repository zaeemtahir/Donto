import Booking from '../models/BookingSchema.js'
import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import mongoose from 'mongoose'

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      doctor: req.params.doctorId
    })
    res.status(200).json({
      success: true,
      message: 'Successful',
      data: bookings,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { doctorId, user, ticketPrice, appointmentDate, status, isPaid } =
      req.body

    // If doctor is not provided in the request body, 400 http wala error
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID is required in the request body',
      })
    }
    //error handling : if user ennter nahi hua to auto pkr le
    if (!user) req.body.user = req.userId

    console.log('WORKINg TILL HERE!')

    // Create a new booking using the request body
    const newBooking = new Booking({
      doctor: new mongoose.Types.ObjectId(doctorId),
      user: new mongoose.Types.ObjectId(user),
      ticketPrice,
      appointmentDate,
      status: status || 'pending',
      isPaid: isPaid || true,
    })

    console.log('WORKGIN TILL HERE 2!')

    // Save the new booking
    const savedBooking = await newBooking.save()

    console.log('WORKGIN TILL HERE 3  !')

    // Update the User model by adding the booking ID to the 'bookings' array
    await User.findByIdAndUpdate(req.body.user, {
      $push: { bookings: savedBooking._id },
    })

    // Update the Doctor model by adding the booking ID to the 'bookings' array
    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { bookings: savedBooking._id },
    })

    res.status(200).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking,
    })
    console.log('WORKGIN TILL HERE 4  !')
  } catch (err) {
    console.error('Error in createBooking: ', err)
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}