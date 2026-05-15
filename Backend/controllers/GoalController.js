import Goal from '../models/GoalModel.js'
import User from '../models/User.js'

// ─── helpers ────────────────────────────────────────────────────────────────

const getProgress = (goal) => {
  const { type, startWeight, currentWeight, targetWeight } = goal
  if (type === 'lose') {
    const total = startWeight - targetWeight
    const done = startWeight - currentWeight
    return total <= 0 ? 100 : Math.min(100, Math.max(0, (done / total) * 100))
  } else {
    const total = targetWeight - startWeight
    const done = currentWeight - startWeight
    return total <= 0 ? 100 : Math.min(100, Math.max(0, (done / total) * 100))
  }
}

const getPredictedDate = (goal) => {
  const history = goal.weightHistory
  if (history.length < 2) return null

  // calculate avg weekly change from last 4 entries
  const recent = history.slice(-4)
  const first = recent[0]
  const last = recent[recent.length - 1]
  const daysDiff = (new Date(last.date) - new Date(first.date)) / 86400000
  if (daysDiff === 0) return null

  const weightChange = last.weight - first.weight // negative = losing
  const changePerDay = weightChange / daysDiff

  const remaining = goal.currentWeight - goal.targetWeight
  if (changePerDay === 0) return null

  const daysNeeded = Math.abs(remaining / changePerDay)
  const predicted = new Date()
  predicted.setDate(predicted.getDate() + Math.round(daysNeeded))
  return predicted
}

const getPace = (goal) => {
  const deadline = new Date(goal.deadline)
  const now = new Date()
  const created = new Date(goal.createdAt)

  const totalDays = (deadline - created) / 86400000
  const daysPassed = (now - created) / 86400000
  const expectedProgress = (daysPassed / totalDays) * 100
  const actualProgress = getProgress(goal)

  const diff = actualProgress - expectedProgress
  if (diff >= -5) return { label: 'On Track', color: '#4ade80', icon: '🟢' }
  if (diff >= -15) return { label: 'Slightly Behind', color: '#facc15', icon: '🟡' }
  return { label: 'Behind Schedule', color: '#f87171', icon: '🔴' }
}

const getMilestones = (goal) => {
  const progress = getProgress(goal)
  return [
    { pct: 25, label: '25% Done', icon: '🥉', achieved: progress >= 25 },
    { pct: 50, label: 'Halfway!', icon: '🥈', achieved: progress >= 50 },
    { pct: 75, label: '75% Done', icon: '🥇', achieved: progress >= 75 },
    { pct: 100, label: 'Goal Achieved!', icon: '🏆', achieved: progress >= 100 },
  ]
}

const getWeeklySummary = (goal) => {
  const history = goal.weightHistory
  if (history.length < 2) return null

  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 86400000)
  const twoWeeksAgo = new Date(now.getTime() - 14 * 86400000)

  const thisWeek = history.filter(h => new Date(h.date) >= oneWeekAgo)
  const lastWeek = history.filter(h => new Date(h.date) >= twoWeeksAgo && new Date(h.date) < oneWeekAgo)

  if (thisWeek.length < 2) return null

  const thisWeekChange = thisWeek[thisWeek.length - 1].weight - thisWeek[0].weight
  const lastWeekChange = lastWeek.length >= 2
    ? lastWeek[lastWeek.length - 1].weight - lastWeek[0].weight
    : null

  return {
    change: Math.abs(thisWeekChange).toFixed(1),
    direction: thisWeekChange < 0 ? 'lost' : 'gained',
    vsLastWeek: lastWeekChange !== null
      ? (Math.abs(thisWeekChange) > Math.abs(lastWeekChange) ? 'better' : 'worse')
      : null
  }
}

const getWeightTrend = (goal) => {
  const history = goal.weightHistory
  if (history.length < 3) return null
  const last3 = history.slice(-3)
  const avg = (last3[2].weight - last3[0].weight) / 2
  if (Math.abs(avg) < 0.1) return { label: 'Stable', icon: '→' }
  return avg < 0
    ? { label: 'Trending Down', icon: '↓' }
    : { label: 'Trending Up', icon: '↑' }
}

const getCalorieSuggestion = async (userId, goalType) => {
  try {
    const user = await User.findById(userId)
    if (!user?.weight || !user?.height || !user?.age) return null
    // Mifflin-St Jeor BMR
    const bmr = user.gender === 'female'
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age - 161
      : 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
    const tdee = Math.round(bmr * 1.375) // moderate activity
    return goalType === 'lose' ? tdee - 500 : tdee + 300
  } catch { return null }
}

// ─── routes ─────────────────────────────────────────────────────────────────

// POST /api/goals
export const setGoal = async (req, res) => {
  try {
    const { type, targetWeight, currentWeight, deadline } = req.body
    if (!type || !targetWeight || !currentWeight || !deadline)
      return res.status(400).json({ message: 'All fields are required' })
    if (!['lose', 'gain'].includes(type))
      return res.status(400).json({ message: 'Type must be lose or gain' })
    if (type === 'lose' && Number(targetWeight) >= Number(currentWeight))
      return res.status(400).json({ message: 'For weight loss, target must be less than current weight' })
    if (type === 'gain' && Number(targetWeight) <= Number(currentWeight))
      return res.status(400).json({ message: 'For weight gain, target must be more than current weight' })
    if (new Date(deadline) <= new Date())
      return res.status(400).json({ message: 'Deadline must be a future date' })

    // delete existing goal for this user only
    await Goal.deleteMany({ user: req.user.id })

    const goal = await Goal.create({
      user: req.user.id,
      type,
      targetWeight: Number(targetWeight),
      currentWeight: Number(currentWeight),
      startWeight: Number(currentWeight),
      deadline,
      weightHistory: [{ weight: Number(currentWeight), date: new Date() }]
    })

    res.status(201).json(goal)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

// GET /api/goals
export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ user: req.user.id }).sort({ _id: -1 })
    if (!goal) return res.status(404).json({ message: 'No goal found' })

    const calories = await getCalorieSuggestion(req.user.id, goal.type)

    res.json({
      ...goal.toObject(),
      progress: getProgress(goal),
      pace: getPace(goal),
      milestones: getMilestones(goal),
      weeklySummary: getWeeklySummary(goal),
      predictedDate: getPredictedDate(goal),
      weightTrend: getWeightTrend(goal),
      calorieSuggestion: calories
    })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

// PUT /api/goals/:id
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id })
    if (!goal) return res.status(404).json({ message: 'Goal not found' })

    const { currentWeight, targetWeight, deadline, type } = req.body

    if (currentWeight !== undefined) {
      if (currentWeight < 20 || currentWeight > 300)
        return res.status(400).json({ message: 'Weight must be between 20 and 300 kg' })
      goal.currentWeight = Number(currentWeight)
      goal.weightHistory.push({ weight: Number(currentWeight), date: new Date() })

      // check if goal achieved
      if (goal.type === 'lose' && goal.currentWeight <= goal.targetWeight) {
        goal.achieved = true
        goal.achievedDate = new Date()
      }
      if (goal.type === 'gain' && goal.currentWeight >= goal.targetWeight) {
        goal.achieved = true
        goal.achievedDate = new Date()
      }
    }

    if (targetWeight !== undefined) goal.targetWeight = Number(targetWeight)
    if (deadline !== undefined) goal.deadline = deadline
    if (type !== undefined) goal.type = type

    const updated = await goal.save()
    const calories = await getCalorieSuggestion(req.user.id, updated.type)

    res.json({
      ...updated.toObject(),
      progress: getProgress(updated),
      pace: getPace(updated),
      milestones: getMilestones(updated),
      weeklySummary: getWeeklySummary(updated),
      predictedDate: getPredictedDate(updated),
      weightTrend: getWeightTrend(updated),
      calorieSuggestion: calories
    })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

// DELETE /api/goals
export const deleteGoal = async (req, res) => {
  try {
    await Goal.deleteMany({ user: req.user.id })
    res.json({ message: 'Goal deleted' })
  } catch (err) { res.status(500).json({ message: err.message }) }
}