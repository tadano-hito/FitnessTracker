import mongoose from 'mongoose'

const setSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  targetReps: { type: Number, default: null },
  actualReps: { type: Number, default: null },
  weight: { type: Number, default: null },
  completed: { type: Boolean, default: false }
}, { _id: false })

const exerciseSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility'],
    required: true
  },
  sets: [setSchema],
  notes: { type: String, default: '' },
  personalRecord: { type: Boolean, default: false },
  restTime: { type: Number, default: 60 } // seconds
}, { _id: false })

const workoutSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  scheduledDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,  // minutes
    default: null
  },
  exercises: [exerciseSchema],
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true })

export default mongoose.model('WorkoutSession', workoutSessionSchema)