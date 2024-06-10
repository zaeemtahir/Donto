import Appointment from '../models/Appointment.js'
import User from '../models/UserSchema.js'

export const createAppointment = async (req, res) => {
  try {
    // Create a new booking using the request body
    const newAppointment = new Appointment({
      user: req.body.user,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      doctor: req.body.doctor,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      status: 'pending',
    })
    // Save the new appointment
    await newAppointment.save()
    res.status(200).json({
      success: true,
      message: 'Successful',
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.find({ user: id })
    res.status(200).json({
      success: true,
      message: 'Appointment found',
      data: appointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findByIdAndDelete(id)

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted',
      data: appointment,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.status(200).json({
      success: true,
      message: 'Appointments found',
      data: appointments,
    })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Server Error', error: err.message })
  }
}

export const getDoctorAppointment = async (req, res) => {
  try {
    const { name } = req.params
    const appointment = await Appointment.find({ doctor: name })
    res.status(200).json({
      success: true,
      message: 'Appointment found',
      data: appointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true },
    )

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Appointment status updated to confirmed',
      data: appointment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}
