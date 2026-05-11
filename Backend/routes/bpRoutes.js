import express from 'express'
import { logBP, getBPLogs, deleteBP } from '../controllers/bpController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, logBP)
router.get('/', protect, getBPLogs)
router.delete('/:id', protect, deleteBP)

export default router