import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Dumbbell, Plus, Trash2, Pencil, X, Trophy } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const CATEGORIES = ['all', 'strength', 'cardio', 'flexibility']
const CATEGORY_COLORS = { strength: '#4ade80', cardio: '#f87171', flexibility: '#60a5fa' }

const emptyForm = {
  title: '',
  scheduledDate: new Date().toISOString().split('T')[0],
  notes: '',
  exercises: [{
    exerciseName: '',
    category: 'strength',
    sets: [{ setNumber: 1, targetReps: '', actualReps: '', weight: '' }],
    notes: '',
    restTime: 60
  }]
}

const emptyGoalForm = { exerciseName: '', targetWeight: '', targetReps: '', deadline: '' }

export default function WorkoutPage() {
  const { token } = useAuth()
  const { darkMode } = useTheme()
  const navigate = useNavigate()

  const [workouts, setWorkouts] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const [showGoalForm, setShowGoalForm] = useState(false)
  const [goalForm, setGoalForm] = useState(emptyGoalForm)

  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('workouts') // workouts | goals
  const [chartExercise, setChartExercise] = useState('')

  const headers = { Authorization: `Bearer ${token}` }

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true)
      const params = activeCategory !== 'all' ? { category: activeCategory } : {}
      const { data } = await axios.get('http://localhost:5003/api/workouts', { headers, params })
      setWorkouts(data)
    } catch (err) { setError('Failed to fetch workouts') }
    finally { setLoading(false) }
  }, [activeCategory, token])

  const fetchGoals = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/workouts/goals', { headers })
      setGoals(data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchWorkouts()
    fetchGoals()
  }, [token, navigate, fetchWorkouts])

  useEffect(() => {
    if (success) { const t = setTimeout(() => setSuccess(''), 3000); return () => clearTimeout(t) }
  }, [success])
  useEffect(() => {
    if (error) { const t = setTimeout(() => setError(''), 4000); return () => clearTimeout(t) }
  }, [error])

  // ── Exercise helpers ──
  const addExercise = () => {
    setForm(f => ({
      ...f,
      exercises: [...f.exercises, {
        exerciseName: '', category: 'strength',
        sets: [{ setNumber: 1, targetReps: '', actualReps: '', weight: '' }],
        notes: '', restTime: 60
      }]
    }))
  }

  const removeExercise = (i) => {
    setForm(f => ({ ...f, exercises: f.exercises.filter((_, idx) => idx !== i) }))
  }

  const updateExercise = (i, field, val) => {
    setForm(f => {
      const exs = [...f.exercises]
      exs[i] = { ...exs[i], [field]: val }
      return { ...f, exercises: exs }
    })
  }

  const addSet = (exIdx) => {
    setForm(f => {
      const exs = [...f.exercises]
      exs[exIdx].sets = [...exs[exIdx].sets, {
        setNumber: exs[exIdx].sets.length + 1,
        targetReps: '', actualReps: '', weight: ''
      }]
      return { ...f, exercises: exs }
    })
  }

  const updateSet = (exIdx, setIdx, field, val) => {
    setForm(f => {
      const exs = [...f.exercises]
      exs[exIdx].sets[setIdx] = { ...exs[exIdx].sets[setIdx], [field]: val }
      return { ...f, exercises: exs }
    })
  }

  const removeSet = (exIdx, setIdx) => {
    setForm(f => {
      const exs = [...f.exercises]
      exs[exIdx].sets = exs[exIdx].sets.filter((_, i) => i !== setIdx)
      return { ...f, exercises: exs }
    })
  }

  // ── Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Workout title is required'); return }
    setSubmitting(true)
    try {
      if (editingId) {
        await axios.put(`http://localhost:5003/api/workouts/${editingId}`, form, { headers })
        setSuccess('Workout updated!')
      } else {
        await axios.post('http://localhost:5003/api/workouts', form, { headers })
        setSuccess('Workout logged!')
      }
      setForm(emptyForm); setEditingId(null); setShowForm(false)
      fetchWorkouts()
    } catch (err) { setError(err.response?.data?.message || 'Something went wrong') }
    finally { setSubmitting(false) }
  }

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:5003/api/workouts/${id}/complete`, {}, { headers })
      setSuccess('Workout completed! 🔥')
      fetchWorkouts()
      fetchGoals() // ← refresh goals after completing
    } catch (err) { setError('Failed to complete workout') }
  }

  const handleEdit = (w) => {
    setForm({
      title: w.title,
      scheduledDate: new Date(w.scheduledDate).toISOString().split('T')[0],
      notes: w.notes || '',
      exercises: w.exercises
    })
    setEditingId(w._id); setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/workouts/${id}`, { headers })
      setSuccess('Workout deleted'); fetchWorkouts()
    } catch (err) { setError('Failed to delete') }
  }

  const handleGoalSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5003/api/workouts/goals', goalForm, { headers })
      setSuccess('Goal added!'); setGoalForm(emptyGoalForm); setShowGoalForm(false)
      fetchGoals()
    } catch (err) { setError('Failed to add goal') }
  }

  const handleDeleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/workouts/goals/${id}`, { headers })
      fetchGoals()
    } catch (err) { setError('Failed to delete goal') }
  }

  // ── Chart data ──
  const uniqueExercises = [...new Set(workouts.flatMap(w => w.exercises?.map(e => e.exerciseName) || []))]
  const chartData = workouts
    .filter(w => w.exercises?.some(e => e.exerciseName === chartExercise))
    .map(w => {
      const ex = w.exercises.find(e => e.exerciseName === chartExercise)
      const maxWeight = Math.max(0, ...ex.sets.map(s => s.weight || 0))
      return { date: new Date(w.scheduledDate).toLocaleDateString('en', { month: 'short', day: 'numeric' }), weight: maxWeight }
    }).reverse()

  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`
  const input = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-400/50 transition`

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Track Your</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase flex items-center gap-3">
            <Dumbbell size={26} className="text-green-400" /> Workouts
          </h1>
        </div>
        <button onClick={() => { setShowForm(v => !v); setEditingId(null); setForm(emptyForm) }}
          className="flex items-center gap-2 bg-green-400 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(74,222,128,0.3)]">
          <Plus size={16} /> New Workout
        </button>
      </div>

      {/* Alerts */}
      {success && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl mb-5">✓ {success}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>}

      {/* Form */}
      {showForm && (
        <div className={`${card} p-6 mb-6`}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-black uppercase">{editingId ? 'Edit Workout' : 'Log New Workout'}</h2>
            <button onClick={() => { setShowForm(false); setEditingId(null) }} className="text-gray-500 hover:text-red-400 transition"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Session Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Monday Push Day" className={input} required />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Date</label>
                <input type="date" value={form.scheduledDate}
                  onChange={e => setForm(f => ({ ...f, scheduledDate: e.target.value }))} className={input} />
              </div>
            </div>

            {/* Exercises */}
            <div className="flex flex-col gap-4">
              {form.exercises.map((ex, exIdx) => (
                <div key={exIdx} className={`${darkMode ? 'bg-white/3 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold uppercase text-green-400">Exercise {exIdx + 1}</p>
                    {form.exercises.length > 1 && (
                      <button type="button" onClick={() => removeExercise(exIdx)} className="text-gray-500 hover:text-red-400 transition"><X size={14} /></button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input value={ex.exerciseName} onChange={e => updateExercise(exIdx, 'exerciseName', e.target.value)}
                      placeholder="Exercise name" className={input} required />
                    <select value={ex.category} onChange={e => updateExercise(exIdx, 'category', e.target.value)}
                      className={`${input} cursor-pointer`}
                      style={{ colorScheme: darkMode ? 'dark' : 'light' }}>
                      <option value="strength">Strength</option>
                      <option value="cardio">Cardio</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                  </div>

                  {/* Sets */}
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="grid grid-cols-4 gap-2">
                      <p className="text-xs text-gray-500 uppercase">Set</p>
                      <p className="text-xs text-gray-500 uppercase">Target Reps</p>
                      <p className="text-xs text-gray-500 uppercase">Actual Reps</p>
                      <p className="text-xs text-gray-500 uppercase">Weight (kg)</p>
                    </div>
                    {ex.sets.map((set, setIdx) => (
                      <div key={setIdx} className="grid grid-cols-4 gap-2 items-center">
                        <div className={`${darkMode ? 'bg-green-400/10 text-green-400' : 'bg-green-50 text-green-600'} rounded-lg py-2 text-center text-xs font-bold`}>
                          {set.setNumber}
                        </div>
                        <input type="number" min="1" value={set.targetReps}
                          onChange={e => updateSet(exIdx, setIdx, 'targetReps', e.target.value)}
                          placeholder="--" className={input} />
                        <input type="number" min="0" value={set.actualReps}
                          onChange={e => updateSet(exIdx, setIdx, 'actualReps', e.target.value)}
                          placeholder="--" className={input} />
                        <div className="flex items-center gap-1">
                          <input type="number" min="0" step="0.5" value={set.weight}
                            onChange={e => updateSet(exIdx, setIdx, 'weight', e.target.value)}
                            placeholder="--" className={input} />
                          {ex.sets.length > 1 && (
                            <button type="button" onClick={() => removeSet(exIdx, setIdx)} className="text-gray-500 hover:text-red-400 transition flex-shrink-0"><X size={12} /></button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => addSet(exIdx)}
                    className="text-xs text-green-400 hover:text-green-300 font-bold uppercase tracking-wider transition">
                    + Add Set
                  </button>
                </div>
              ))}
            </div>

            <button type="button" onClick={addExercise}
              className={`${darkMode ? 'border-white/10 text-gray-400 hover:border-green-400/30 hover:text-green-400' : 'border-gray-200 text-gray-500 hover:border-green-400/30 hover:text-green-500'} border border-dashed rounded-xl py-3 text-sm font-medium transition text-center`}>
              + Add Exercise
            </button>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Session Notes</label>
              <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Optional notes..." className={input} />
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="bg-green-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider disabled:opacity-50">
                {submitting ? 'Saving...' : editingId ? 'Update' : 'Log Workout'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }}
                className={`${darkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'} border px-6 py-3 rounded-xl text-sm font-medium transition hover:border-red-400/30 hover:text-red-400`}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['workouts', 'goals'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition border
              ${activeTab === tab ? 'bg-green-400 text-black border-green-400' : darkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'workouts' && (
        <>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition border
                  ${activeCategory === cat ? 'bg-green-400 text-black border-green-400'
                    : darkMode ? 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Workout list */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`${darkMode ? 'bg-white/5' : 'bg-gray-100'} rounded-2xl h-40 animate-pulse`} />
              ))}
            </div>
          ) : workouts.length === 0 ? (
            <div className={`${card} p-12 flex flex-col items-center justify-center text-gray-500 mb-6`}>
              <Dumbbell size={40} className="mb-3 opacity-30" />
              <p className="text-sm">No workouts yet. Log your first session!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {workouts.map(w => (
                <div key={w._id} className={`${card} p-5 hover:border-green-500/30 transition`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-black uppercase">{w.title}</h3>
                        {w.completed && <span className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full font-bold">Done ✓</span>}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(w.scheduledDate).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!w.completed && (
                        <button onClick={() => handleComplete(w._id)}
                          className="text-xs bg-green-400/10 border border-green-400/20 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-400/20 transition font-bold">
                          Complete
                        </button>
                      )}
                      <button onClick={() => handleEdit(w)} className="text-gray-500 hover:text-green-400 transition p-1"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(w._id)} className="text-gray-500 hover:text-red-400 transition p-1"><Trash2 size={14} /></button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {w.exercises?.map((ex, i) => (
                      <div key={i} className={`flex items-center justify-between ${darkMode ? 'bg-white/3' : 'bg-gray-50'} rounded-xl px-3 py-2`}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[ex.category] }} />
                          <span className="text-sm font-medium">{ex.exerciseName}</span>
                          {ex.personalRecord && <Trophy size={12} className="text-yellow-400" />}
                        </div>
                        <span className="text-xs text-gray-500">{ex.sets?.length} sets</span>
                      </div>
                    ))}
                  </div>

                  {w.notes && <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-white/10">{w.notes}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Progress Chart */}
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-sm font-black uppercase">Progress Chart</h2>
                <p className="text-gray-500 text-xs">Weight lifted over time per exercise</p>
              </div>
              <select value={chartExercise} onChange={e => setChartExercise(e.target.value)} className={input} style={{ width: 'auto' }}>
                <option value="">Select exercise...</option>
                {uniqueExercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </select>
            </div>
            {chartExercise && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#ffffff08' : '#f0f0f0'} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis unit=" kg" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: darkMode ? '#111' : '#fff', border: '1px solid #4ade8030', borderRadius: '12px', color: darkMode ? '#fff' : '#111' }}
                    formatter={v => [`${v} kg`, 'Weight']}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#4ade80" strokeWidth={2.5}
                    dot={{ fill: '#4ade80', r: 4 }} activeDot={{ r: 6 }} name={chartExercise} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
                {chartExercise ? 'No weight data yet' : 'Select an exercise to view progress'}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'goals' && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button onClick={() => setShowGoalForm(v => !v)}
              className="flex items-center gap-2 bg-green-400 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider">
              <Plus size={16} /> Add Goal
            </button>
          </div>

          {showGoalForm && (
            <div className={`${card} p-6`}>
              <h2 className="text-base font-black uppercase mb-5">New Workout Goal</h2>
              <form onSubmit={handleGoalSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Exercise</label>
                    <input value={goalForm.exerciseName} onChange={e => setGoalForm(f => ({ ...f, exerciseName: e.target.value }))}
                      placeholder="e.g. Bench Press" className={input} required />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Target Weight (kg)</label>
                    <input type="number" value={goalForm.targetWeight} onChange={e => setGoalForm(f => ({ ...f, targetWeight: e.target.value }))}
                      placeholder="e.g. 100" className={input} />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Target Reps</label>
                    <input type="number" value={goalForm.targetReps} onChange={e => setGoalForm(f => ({ ...f, targetReps: e.target.value }))}
                      placeholder="e.g. 10" className={input} />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Deadline</label>
                    <input type="date" value={goalForm.deadline} onChange={e => setGoalForm(f => ({ ...f, deadline: e.target.value }))}
                      className={input} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-green-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider">
                    Add Goal
                  </button>
                  <button type="button" onClick={() => setShowGoalForm(false)}
                    className={`${darkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'} border px-6 py-3 rounded-xl text-sm font-medium transition`}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {goals.length === 0 ? (
            <div className={`${card} p-12 flex flex-col items-center justify-center text-gray-500`}>
              <Trophy size={40} className="mb-3 opacity-30" />
              <p className="text-sm">No goals yet. Set your first workout goal!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map(g => {
                const weightPct = g.targetWeight ? Math.min((g.currentWeight / g.targetWeight) * 100, 100) : 0
                const repsPct = g.targetReps ? Math.min((g.currentReps / g.targetReps) * 100, 100) : 0
                return (
                  <div key={g._id} className={`${card} p-5 ${g.achieved ? 'border-green-400/30' : ''}`}
                    style={g.achieved ? { background: '#4ade8008' } : {}}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black uppercase">{g.exerciseName}</h3>
                          {g.achieved && <span className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full">Achieved 🏆</span>}
                        </div>
                        {g.deadline && <p className="text-xs text-gray-500 mt-1">Deadline: {new Date(g.deadline).toLocaleDateString()}</p>}
                      </div>
                      <button onClick={() => handleDeleteGoal(g._id)} className="text-gray-500 hover:text-red-400 transition p-1"><Trash2 size={14} /></button>
                    </div>

                    {g.targetWeight && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-500">Weight</span>
                          <span className="font-bold text-green-400">{g.currentWeight} / {g.targetWeight} kg</span>
                        </div>
                        <div className={`w-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-full h-2`}>
                          <div className="h-2 rounded-full bg-green-400 transition-all duration-700"
                            style={{ width: `${weightPct}%`, boxShadow: '0 0 8px #4ade8060', minWidth: weightPct > 0 ? '8px' : '0' }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{Math.round(weightPct)}% complete</p>
                      </div>
                    )}

                    {g.targetReps && (
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-500">Reps</span>
                          <span className="font-bold text-green-400">{g.currentReps} / {g.targetReps} reps</span>
                        </div>
                        <div className={`w-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-full h-2`}>
                          <div className="h-2 rounded-full bg-green-400 transition-all duration-700"
                            style={{ width: `${repsPct}%`, boxShadow: '0 0 8px #4ade8060', minWidth: repsPct > 0 ? '8px' : '0' }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{Math.round(repsPct)}% complete</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}