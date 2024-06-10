import Appointment from '../models/Appointment.js'
import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const getCount = async (req, res) => {
  try {
    const currentDate = new Date()
    const userCount = await User.countDocuments()
    const doctorCount = await Doctor.countDocuments({ isApproved: 'approved' })
    const previousAppointmentCount = await Appointment.countDocuments({
      status: 'Paid',
      appointmentDate: { $lt: currentDate },
    })
    const currentAppointmentCount = await Appointment.countDocuments({
      status: 'Paid',
      appointmentDate: { $gte: currentDate },
    })
    if (
      userCount &&
      doctorCount &&
      previousAppointmentCount &&
      currentAppointmentCount
    ) {
      res.status(200).json({
        success: true,
        message: 'Count Found',
        data: {
          userCount,
          doctorCount,
          previousAppointmentCount,
          currentAppointmentCount,
        },
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Cannot Find Count',
      error: err.message,
    })
  }
}
