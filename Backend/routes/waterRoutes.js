import express from 'express'
import { logWater, getWaterToday, deleteWater } from '../controllers/waterController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, logWater)
router.get('/', protect, getWaterToday)
router.delete('/:id', protect, deleteWater)

export default router