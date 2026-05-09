import mongoose from 'mongoose'

const sleepSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hoursSlept: {
    type: Number,
    required: true
  },
  quality: {
    type: String,
    enum: ['poor', 'fair', 'good', 'excellent'],
    required: true
  },
  bedTime: {
    type: String
  },
  wakeTime: {
    type: String
  },
  notes: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

export default mongoose.model('Sleep', sleepSchema)