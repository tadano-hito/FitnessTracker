import mongoose from 'mongoose'

const workoutGoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseName: {
    type: String,
    required: true,
    trim: true
  },
  targetWeight: {
    type: Number,
    default: null  // kg
  },
  targetReps: {
    type: Number,
    default: null
  },
  targetSets: {
    type: Number,
    default: null
  },
  currentWeight: {
    type: Number,
    default: 0
  },
  currentReps: {
    type: Number,
    default: 0
  },
  deadline: {
    type: Date,
    default: null
  },
  achieved: {
    type: Boolean,
    default: false
  },
  achievedDate: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true })

export default mongoose.model('WorkoutGoal', workoutGoalSchema)