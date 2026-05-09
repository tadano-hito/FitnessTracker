import WaterIntake from '../models/WaterIntake.js'

// POST /api/water - log water intake
export const logWater = async (req, res) => {
  const { amount, unit } = req.body
  try {
    const log = await WaterIntake.create({
      user: req.user.id,
      amount,
      unit: unit || 'ml'
    })
    res.status(201).json(log)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/water - get today's logs
export const getWaterToday = async (req, res) => {
  try {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)

    const logs = await WaterIntake.find({
      user: req.user.id,
      date: { $gte: start, $lte: end }
    })

    const total = logs.reduce((sum, l) => sum + l.amount, 0)
    res.json({ logs, total })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/water/:id - delete a log
export const deleteWater = async (req, res) => {
  try {
    await WaterIntake.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}