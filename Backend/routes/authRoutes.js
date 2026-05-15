import express from 'express'
import { register, login, getMe, forgotPassword, resetPassword, updateProfile, uploadProfilePicture, googleAuth } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'
import upload from '../config/multer.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', googleAuth)
router.get('/me', protect, getMe)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.put('/profile', protect, updateProfile)
router.post('/profile/picture', protect, upload.single('picture'), uploadProfilePicture)
export default router