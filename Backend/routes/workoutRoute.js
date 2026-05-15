import express from 'express'
import {
  createWorkout, getWorkouts, getTodayWorkouts,
  getWeekWorkouts, updateWorkout, completeWorkout,
  deleteWorkout, createGoal, getGoals, deleteGoal
} from '../controllers/workoutController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createWorkout)
router.get('/', protect, getWorkouts)
router.get('/today', protect, getTodayWorkouts)
router.get('/week', protect, getWeekWorkouts)
router.put('/:id', protect, updateWorkout)
router.put('/:id/complete', protect, completeWorkout)
router.delete('/:id', protect, deleteWorkout)

router.post('/goals', protect, createGoal)
router.get('/goals', protect, getGoals)
router.delete('/goals/:id', protect, deleteGoal)

export default router