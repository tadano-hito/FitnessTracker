import express from 'express'
import { logSleep, getSleepLogs, deleteSleep } from '../controllers/sleepController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, logSleep)
router.get('/', protect, getSleepLogs)
router.delete('/:id', protect, deleteSleep)

export default router