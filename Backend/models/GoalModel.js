import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['lose', 'gain'],
    required: true
  },
  targetWeight: { type: Number, required: true },
  currentWeight: { type: Number, required: true },
  startWeight: { type: Number, required: true },
  deadline: { type: Date, required: true },
  weightHistory: [{
    weight: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }],
  achieved: { type: Boolean, default: false },
  achievedDate: { type: Date, default: null }
}, { timestamps: true })

export default mongoose.model('Goal', goalSchema)