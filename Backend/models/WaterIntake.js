import mongoose from 'mongoose'

const waterIntakeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'ml'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

export default mongoose.model('WaterIntake', waterIntakeSchema)