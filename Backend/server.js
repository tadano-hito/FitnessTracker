import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import waterRoutes from './routes/waterRoutes.js'
import sleepRoutes from './routes/sleepRoutes.js'
import bpRoutes from './routes/bpRoutes.js'
import workoutRoutes from './routes/workoutRoute.js'
import goalRoutes from './routes/goalRoutes.js'
import nutritionRoutes from './routes/nutritionRoutes.js'
import dns from 'dns'
import net from 'net'
dotenv.config()
dns.setServers(["8.8.8.8"]);

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/water', waterRoutes)
app.use('/api/sleep', sleepRoutes)
app.use('/api/bp', bpRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/nutrition', nutritionRoutes)

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