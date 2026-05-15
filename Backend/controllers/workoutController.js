import WorkoutSession from '../models/WorkoutSession.js'
import WorkoutGoal from '../models/WorkoutGoal.js'

// ─── SESSIONS ────────────────────────────────────────────────────────────────

// POST /api/workouts
export const createWorkout = async (req, res) => {
  try {
    const session = await WorkoutSession.create({
      user: req.user.id,
      ...req.body
    })
    res.status(201).json(session)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/workouts
export const getWorkouts = async (req, res) => {
  try {
    const { category, date, completed } = req.query
    const filter = { user: req.user.id }
    if (completed !== undefined) filter.completed = completed === 'true'

    // filter by date range if provided
    if (date) {
      const start = new Date(date)
      start.setHours(0, 0, 0, 0)
      const end = new Date(date)
      end.setHours(23, 59, 59, 999)
      filter.scheduledDate = { $gte: start, $lte: end }
    }

    // filter by exercise category
    if (category) filter['exercises.category'] = category

    const workouts = await WorkoutSession.find(filter).sort({ scheduledDate: -1 })
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/workouts/today
export const getTodayWorkouts = async (req, res) => {
  try {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)

    const workouts = await WorkoutSession.find({
      user: req.user.id,
      scheduledDate: { $gte: start, $lte: end }
    }).sort({ createdAt: -1 })

    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/workouts/week
export const getWeekWorkouts = async (req, res) => {
  try {
    const start = new Date()
    start.setDate(start.getDate() - start.getDay()) // Sunday
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 6) // Saturday
    end.setHours(23, 59, 59, 999)

    const workouts = await WorkoutSession.find({
      user: req.user.id,
      scheduledDate: { $gte: start, $lte: end }
    }).sort({ scheduledDate: 1 })

    res.json(workouts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/workouts/:id
export const updateWorkout = async (req, res) => {
  try {
    const workout = await WorkoutSession.findById(req.params.id)
    if (!workout) return res.status(404).json({ message: 'Workout not found' })
    if (workout.user.toString() !== req.user.id.toString())
      return res.status(403).json({ message: 'Not authorized' })

    const updated = await WorkoutSession.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// PUT /api/workouts/:id/complete
export const completeWorkout = async (req, res) => {
  try {
    const workout = await WorkoutSession.findById(req.params.id)
    if (!workout) return res.status(404).json({ message: 'Workout not found' })
    if (workout.user.toString() !== req.user.id.toString())
      return res.status(403).json({ message: 'Not authorized' })

    workout.completed = true
    workout.duration = req.body.duration || null

    // check for personal records in each exercise
    for (const exercise of workout.exercises) {
      const prevSessions = await WorkoutSession.find({
        user: req.user.id,
        completed: true,
        'exercises.exerciseName': exercise.exerciseName,
        _id: { $ne: workout._id }
      })

      const prevMaxWeight = Math.max(0, ...prevSessions.flatMap(s =>
        s.exercises
          .filter(e => e.exerciseName === exercise.exerciseName)
          .flatMap(e => e.sets.map(set => set.weight || 0))
      ))

      const currentMaxWeight = Math.max(0, ...exercise.sets.map(s => s.weight || 0))
      if (currentMaxWeight > prevMaxWeight) exercise.personalRecord = true

      // auto update workout goals
      await WorkoutGoal.updateMany(
        { user: req.user.id, exerciseName: exercise.exerciseName, achieved: false },
        {
          currentWeight: currentMaxWeight,
          currentReps: Math.max(0, ...exercise.sets.map(s => s.actualReps || 0))
        }
      )

      // mark goal as achieved if target met
      const goals = await WorkoutGoal.find({
        user: req.user.id,
        exerciseName: exercise.exerciseName,
        achieved: false
      })

      for (const goal of goals) {
        const weightMet = !goal.targetWeight || currentMaxWeight >= goal.targetWeight
        const repsMet = !goal.targetReps || Math.max(...exercise.sets.map(s => s.actualReps || 0)) >= goal.targetReps
        if (weightMet && repsMet) {
          goal.achieved = true
          goal.achievedDate = new Date()
          await goal.save()
        }
      }
    }

    await workout.save()
    res.json(workout)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/workouts/:id
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await WorkoutSession.findById(req.params.id)
    if (!workout) return res.status(404).json({ message: 'Workout not found' })
    if (workout.user.toString() !== req.user.id.toString())
      return res.status(403).json({ message: 'Not authorized' })
    await workout.deleteOne()
    res.json({ message: 'Workout deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ─── GOALS ───────────────────────────────────────────────────────────────────

// POST /api/workouts/goals
export const createGoal = async (req, res) => {
  try {
    const goal = await WorkoutGoal.create({ user: req.user.id, ...req.body })
    res.status(201).json(goal)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// GET /api/workouts/goals
export const getGoals = async (req, res) => {
  try {
    const goals = await WorkoutGoal.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(goals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/workouts/goals/:id
export const deleteGoal = async (req, res) => {
  try {
    await WorkoutGoal.findByIdAndDelete(req.params.id)
    res.json({ message: 'Goal deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}