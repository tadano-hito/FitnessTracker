import Sleep from '../models/Sleep.js'

export const logSleep = async (req, res) => {
  const { hoursSlept, quality, bedTime, wakeTime, notes } = req.body
  try {
    const log = await Sleep.create({
      user: req.user.id,
      hoursSlept, quality, bedTime, wakeTime, notes
    })
    res.status(201).json(log)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getSleepLogs = async (req, res) => {
  try {
    const logs = await Sleep.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(7)
    res.json(logs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteSleep = async (req, res) => {
  try {
    await Sleep.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}