import express from 'express'
import { setGoal, getGoal, updateGoal, deleteGoal } from '../controllers/GoalController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, setGoal)
router.get('/', protect, getGoal)
router.put('/:id', protect, updateGoal)
router.delete('/', protect, deleteGoal)

export default router