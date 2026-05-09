import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import waterRoutes from './routes/waterRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/water', waterRoutes)

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err))

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Fitness Tracker API running')
})

const PORT = process.env.PORT || 5003
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))