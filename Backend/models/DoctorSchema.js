import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String },

  // Fields for doctors only
  qualification: { type: Array, required: true },
  pmdcNumber: { type: String, required: true },
  services: [
    {
      service_name: { type: String },
      ticketPrice: { type: Number },
    },
  ],

  dob: { type: Date, required: true },
  cnic: { type: String, required: true },

  experiences: { type: Array },

  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending',
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }],
  profileUrl: {
    type: String,
  },
})

export default mongoose.model('Doctor', DoctorSchema)
