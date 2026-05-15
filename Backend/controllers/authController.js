import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sendEmail from '../config/sendEmail.js'
import cloudinary from '../config/cloudinary.js'
import { OAuth2Client } from "google-auth-library"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// @route POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @route POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @route GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @route POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'No account with that email found' })

    // generate token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashed = crypto.createHash('sha256').update(resetToken).digest('hex')

    user.resetPasswordToken = hashed
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000 // 15 minutes
    await user.save()

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`

    await sendEmail({
      to: user.email,
      subject: 'PulseFit — Password Reset Request',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:16px;border:1px solid #1a1a1a">
          <h1 style="color:#4ade80;font-size:28px;margin-bottom:8px">Pulse<span style="color:#fff">Fit</span></h1>
          <h2 style="font-size:20px;margin-bottom:16px">Password Reset Request</h2>
          <p style="color:#9ca3af;margin-bottom:24px">You requested to reset your password. Click the button below. This link expires in <strong style="color:#fff">15 minutes</strong>.</p>
          <a href="${resetUrl}" style="display:inline-block;background:#4ade80;color:#000;font-weight:bold;padding:14px 28px;border-radius:99px;text-decoration:none;font-size:14px;letter-spacing:1px;text-transform:uppercase">
            Reset Password
          </a>
          <p style="color:#6b7280;font-size:12px;margin-top:32px">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `
    })

    res.json({ message: 'Reset link sent to your email' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @route POST /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  try {
    const hashed = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' })

    user.password = await bcrypt.hash(password, 10)
    user.resetPasswordToken = null
    user.resetPasswordExpire = null
    await user.save()

    res.json({ message: 'Password reset successful' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @route PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const { name, age, weight, height, gender } = req.body
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, age, weight, height, gender },
      { new: true }
    ).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @route POST /api/auth/profile/picture
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    // upload to cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'pulsefit/profiles', transformation: [{ width: 400, height: 400, crop: 'fill' }] },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(req.file.buffer)
    })

    // save URL to user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: result.secure_url },
      { new: true }
    ).select('-password')

    res.json({ profilePicture: user.profilePicture })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    const { email, name, picture, sub } = payload

    let user = await User.findOne({ email })

    // If user doesn't exist → create new
    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        googleId: sub,
        profilePicture: picture,
      })
    }

    const jwtToken = generateToken(user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Google authentication failed" })
  }
}