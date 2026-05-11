import BloodPressure from '../models/BloodPressure.js'

export const logBP = async (req, res) => {
  const { systolic, diastolic, pulse, notes } = req.body
  try {
    const log = await BloodPressure.create({
      user: req.user.id,
      systolic, diastolic, pulse, notes
    })
    res.status(201).json(log)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getBPLogs = async (req, res) => {
  try {
    const logs = await BloodPressure.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(10)
    res.json(logs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteBP = async (req, res) => {
  try {
    await BloodPressure.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}