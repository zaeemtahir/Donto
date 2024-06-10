import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//token for password authentication
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '15d',
    },
  )
}

export const register = async (req, res) => {
  var {
    email,
    password,
    name,
    role,
    gender,
    dob,
    cnic,
    qualification,
    pmdcNumber,
    profileUrl,
  } = req.body

  try {
    let user = null

    if (role === 'patient') {
      user = await User.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'Patient already exists' })
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      user = new User({
        email,
        name,
        password: hashPassword,
        gender,
        role,
      })
    } else if (role === 'doctor') {
      user = await Doctor.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'Doctor already exists' })
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      name = 'Dr. ' + name

      user = new Doctor({
        email,
        password: hashPassword,
        name,
        role,
        gender,
        dob,
        cnic,
        qualification,
        pmdcNumber,
        profileUrl,
      })
    }

    await user.save()

    // Success case
    res
      .status(200)
      .json({ success: true, message: 'User successfully created' })
  } catch (err) {
    console.error(err) // Log the error details to the console
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      err: err.message,
    })
  }
}
//login configuration for user
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = null

    // Find user in the database
    const patient = await User.findOne({ email })
    const doctor = await Doctor.findOne({ email, isApproved: 'approved' })

    // If user is a patient
    if (patient) {
      user = patient
    }

    // If user is a doctor
    if (doctor) {
      user = doctor
    }

    // If user is not found
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Checking if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' })
    }

    // Getting token
    const token = generateToken(user)

    // Destructure user object to remove sensitive information
    const { password: _, role, appointments, ...rest } = user._doc

    res.cookie('token', token)

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      data: { ...rest },
      role,
    })
  } catch (err) {
    console.error(err) // Log the error details to the console
    res
      .status(500)
      .json({ success: false, message: 'Failed to login', err: err.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashPassword },
      { new: true },
    )
    const doctor = await Doctor.findOneAndUpdate(
      { email: email, isApproved: 'approved' },
      { password: hashPassword },
      { new: true },
    )
    if (user) {
      res.status(200).json({
        success: true,
        message: 'User found and Updated',
      })
    } else if (doctor) {
      res.status(200).json({
        success: true,
        message: 'Doctor found and Updated',
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
  } catch (error) {
    console.log('Error: ', error)
  }
}
