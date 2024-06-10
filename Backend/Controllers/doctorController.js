import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateDoctor = async (req, res) => {
  const id = req.params.id
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updatedDoctor,
    })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Updation failed', error: err.message })
  }
}

export const deleteDoctor = async (req, res) => {
  const id = req.params.id
  try {
    await Doctor.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Deleted successfully' })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete', error: err.message })
  }
}

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id

  try {
    const doctor = await Doctor.findById(id)

    if (doctor) {
      res.status(200).json({
        success: true,
        message: 'Doctor found',
        data: {
          name: doctor.name,
          profileUrl: doctor.profileUrl,
        },
      })
    } else {
      res.status(404).json({ success: false, message: 'Doctor not found' })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    })
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    const data = await Doctor.find()

    res
      .status(200)
      .json({ success: true, message: 'Doctors found', data: data })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred',
      error: error.message,
    })
  }
}

export const getApprovedDoctors = async (req, res) => {
  try {
    const data = await Doctor.find({ isApproved: 'approved' })

    res
      .status(200)
      .json({ success: true, message: 'Doctors found', data: data })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred',
      error: error.message,
    })
  }
}

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query
    let doctor
    if (query) {
      doctor = await Doctor.find({
        isApproved: 'approved',
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { specialization: { $regex: query, $options: 'i' } },
        ],
      }).select('-password')
    } else {
      doctor = await Doctor.find({ isApproved: 'approved' }).select('-password')
    }

    res
      .status(200)
      .json({ success: true, message: 'Doctors found', data: doctor })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Doctors not found',
      error: err.message,
    })
  }
}

export const updateApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { isApproved } = req.body
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true },
    )
    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: doctor,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Updation failed',
      error: error.message,
    })
  }
}

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId
  try {
    const doctor = await Doctor.findById(doctorId)
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: 'Doctor not found' })
    }
    const { password, rest } = doctor._doc
    const appointments = await Booking.find({ doctor: doctorId })
    res.status(200).json({
      success: true,
      message: 'Profile info is getting',
      data: { ...rest, appointments },
    })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong, cannot get' })
  }
}
