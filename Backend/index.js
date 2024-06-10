import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from './Routes/booking.js'
import appointmentDoctorRoute from './Routes/appointmentDoctor.js'
import appointmentPatientRoute from './Routes/appointmentPatient.js'
import paymentRoute from './Routes/payment.js'
import doctorReviewRoute from './Routes/reviewDoctor.js'
import userReviewRoute from './Routes/reviewUser.js'
import doctorProfileRoute from './Routes/doctorProfile.js'
import adminRoute from './Routes/admin.js'
import doctorApprovedRoute from './Routes/approvedDoctors.js'
import appointmentRoute from './Routes/appointment.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const corseOptions = {
  origin: true,
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corseOptions))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/bookings', bookingRoute)
app.use('/api/v1/appointmentDoctor', appointmentDoctorRoute)
app.use('/api/v1/appointmentPatient', appointmentPatientRoute)
app.use('/api/v1/payment', paymentRoute)
app.use('/api/v1/reviewDoctor', doctorReviewRoute)
app.use('/api/v1/reviewUser', userReviewRoute)
app.use('/api/v1/doctorProfile', doctorProfileRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/doctorsApproved', doctorApprovedRoute)
app.use('/api/v1/appointment', appointmentRoute)
// console.log('working till here...')
app.get('/', (req, res) => {
  res.send('API working')
})

// database connection
mongoose.set('strictQuery', false)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Mongodb connected')
  } catch (err) {
    console.log('Mongodb connection failed', err)
  }
}

app.listen(port, () => {
  connectDB()
  console.log('Server is running on port', port)
})
