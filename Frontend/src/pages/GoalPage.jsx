import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  Target, TrendingDown, TrendingUp, Calendar, Scale,
  Plus, Trash2, Trophy, Medal, Flame, Zap, ArrowRight,
  CheckCircle, Clock, ChevronUp, ChevronDown, Minus,
  Utensils, BarChart2
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const API = 'http://localhost:5003/api'

const getMilestoneIcon = (pct, achieved) => {
  if (pct === 100) return <Trophy size={18} className={achieved ? 'text-yellow-400' : 'text-gray-600'} />
  if (pct === 75) return <Medal size={18} className={achieved ? 'text-yellow-300' : 'text-gray-600'} />
  if (pct === 50) return <Medal size={18} className={achieved ? 'text-gray-300' : 'text-gray-600'} />
  return <Medal size={18} className={achieved ? 'text-orange-400' : 'text-gray-600'} />
}

const getTrendIcon = (trend) => {
  if (!trend) return null
  if (trend.icon === '↓') return <ChevronDown size={16} className="text-green-400" />
  if (trend.icon === '↑') return <ChevronUp size={16} className="text-red-400" />
  return <Minus size={16} className="text-yellow-400" />
}

export default function GoalPage() {
  const { token } = useAuth()
  const { darkMode } = useTheme()
  const navigate = useNavigate()

  const [goal, setGoal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [newWeight, setNewWeight] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ type: 'lose', currentWeight: '', targetWeight: '', deadline: '' })
  const [formErrors, setFormErrors] = useState({})

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchGoal()
  }, [token, navigate])

  useEffect(() => {
    if (success) { const t = setTimeout(() => setSuccess(''), 3000); return () => clearTimeout(t) }
  }, [success])
  useEffect(() => {
    if (error) { const t = setTimeout(() => setError(''), 4000); return () => clearTimeout(t) }
  }, [error])

  const fetchGoal = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API}/goals`, { headers })
      setGoal(data)
    } catch (err) {
      if (err.response?.status === 404) setGoal(null)
      else setError('Failed to load goal')
    } finally { setLoading(false) }
  }

  const validateForm = () => {
    const errors = {}
    const cw = parseFloat(form.currentWeight)
    const tw = parseFloat(form.targetWeight)
    if (!form.currentWeight) errors.currentWeight = 'Required'
    else if (cw < 20 || cw > 300) errors.currentWeight = 'Must be 20–300 kg'
    if (!form.targetWeight) errors.targetWeight = 'Required'
    else if (tw < 20 || tw > 300) errors.targetWeight = 'Must be 20–300 kg'
    if (!form.deadline) errors.deadline = 'Required'
    else if (new Date(form.deadline) <= new Date()) errors.deadline = 'Must be future date'
    if (form.type === 'lose' && cw && tw && tw >= cw) errors.targetWeight = 'Must be less than current'
    if (form.type === 'gain' && cw && tw && tw <= cw) errors.targetWeight = 'Must be more than current'
    return errors
  }

  const handleSetGoal = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return }
    setFormErrors({})
    setSubmitting(true)
    try {
      const { data } = await axios.post(`${API}/goals`, {
        type: form.type,
        currentWeight: parseFloat(form.currentWeight),
        targetWeight: parseFloat(form.targetWeight),
        deadline: form.deadline
      }, { headers })
      setGoal(data)
      setShowForm(false)
      setForm({ type: 'lose', currentWeight: '', targetWeight: '', deadline: '' })
      setSuccess('Goal set! Let\'s go 💪')
    } catch (err) { setError(err.response?.data?.message || 'Failed to set goal') }
    finally { setSubmitting(false) }
  }

  const handleLogWeight = async (e) => {
    e.preventDefault()
    const w = parseFloat(newWeight)
    if (!newWeight || isNaN(w) || w < 20 || w > 300) { setError('Enter a valid weight (20–300 kg)'); return }
    setSubmitting(true)
    try {
      const { data } = await axios.put(`${API}/goals/${goal._id}`, { currentWeight: w }, { headers })
      setGoal(data)
      setShowWeightModal(false)
      setNewWeight('')
      setSuccess('Weight logged!')
      if (data.achieved) setSuccess('🏆 Goal Achieved! Congratulations!')
    } catch (err) { setError(err.response?.data?.message || 'Failed to log weight') }
    finally { setSubmitting(false) }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/goals`, { headers })
      setGoal(null)
      setShowDeleteModal(false)
      setSuccess('Goal deleted')
    } catch (err) { setError('Failed to delete goal') }
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`
  const input = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`
  const inputErr = `w-full ${darkMode ? 'bg-red-500/10 text-white placeholder-gray-600' : 'bg-red-50 text-gray-900'} border border-red-500/50 rounded-xl px-4 py-3 text-sm focus:outline-none transition`

  const daysLeft = goal ? Math.max(0, Math.ceil((new Date(goal.deadline) - new Date()) / 86400000)) : 0
  const daysColor = daysLeft === 0 ? '#f87171' : daysLeft <= 7 ? '#fb923c' : daysLeft <= 30 ? '#facc15' : '#4ade80'

  const chartData = goal?.weightHistory?.map(h => ({
    date: new Date(h.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    weight: h.weight
  })) || []

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Track Your</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase flex items-center gap-3">
            <Target size={26} className="text-green-400" /> My Goal
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {goal && (
            <>
              <button onClick={() => { setError(''); setShowWeightModal(true) }}
                className="flex items-center gap-2 bg-green-400 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                <Scale size={16} /> Log Weight
              </button>
              <button onClick={() => setShowDeleteModal(true)}
                className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border p-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:border-red-400/30 transition`}>
                <Trash2 size={16} />
              </button>
            </>
          )}
          {!goal && !loading && (
            <button onClick={() => { setError(''); setShowForm(true) }}
              className="flex items-center gap-2 bg-green-400 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <Plus size={16} /> Set Goal
            </button>
          )}
        </div>
      </div>

      {/* Alerts */}
      {success && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2"><CheckCircle size={16} />{success}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* No goal */}
      {!loading && !goal && !showForm && (
        <div className={`${card} p-16 flex flex-col items-center justify-center text-center`}>
          <Target size={52} className="text-green-400 mb-4 opacity-50" />
          <h2 className="text-xl font-black uppercase mb-2">No Goal Set</h2>
          <p className="text-gray-500 text-sm mb-6">Set a weight goal to start tracking your journey.</p>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider">
            <Plus size={16} /> Set My Goal
          </button>
        </div>
      )}

      {/* Goal Form */}
      {showForm && (
        <div className={`${card} p-6 mb-6`}>
          <h2 className="text-lg font-black uppercase mb-6">{goal ? 'Edit Goal' : 'Set New Goal'}</h2>
          <form onSubmit={handleSetGoal} className="flex flex-col gap-5">

            {/* Type selector */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Goal Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: 'lose', label: 'Lose Weight', icon: TrendingDown },
                  { val: 'gain', label: 'Gain Weight', icon: TrendingUp }
                ].map(({ val, label, icon: Icon }) => (
                  <button key={val} type="button" onClick={() => setForm(f => ({ ...f, type: val }))}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase transition border
                      ${form.type === val ? 'bg-green-400 border-green-400 text-black' : darkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900'}`}>
                    <Icon size={16} />{label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Current Weight (kg)</label>
                <input type="number" step="0.1" value={form.currentWeight}
                  onChange={e => { setForm(f => ({ ...f, currentWeight: e.target.value })); setFormErrors(f => ({ ...f, currentWeight: '' })) }}
                  placeholder="e.g. 85" className={formErrors.currentWeight ? inputErr : input} />
                {formErrors.currentWeight && <p className="text-red-400 text-xs mt-1">{formErrors.currentWeight}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Target Weight (kg)</label>
                <input type="number" step="0.1" value={form.targetWeight}
                  onChange={e => { setForm(f => ({ ...f, targetWeight: e.target.value })); setFormErrors(f => ({ ...f, targetWeight: '' })) }}
                  placeholder="e.g. 75" className={formErrors.targetWeight ? inputErr : input} />
                {formErrors.targetWeight && <p className="text-red-400 text-xs mt-1">{formErrors.targetWeight}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Deadline</label>
                <input type="date" value={form.deadline} min={minDate}
                  onChange={e => { setForm(f => ({ ...f, deadline: e.target.value })); setFormErrors(f => ({ ...f, deadline: '' })) }}
                  className={formErrors.deadline ? inputErr : input} />
                {formErrors.deadline && <p className="text-red-400 text-xs mt-1">{formErrors.deadline}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="bg-green-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider disabled:opacity-50">
                {submitting ? 'Saving...' : 'Save Goal'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setFormErrors({}) }}
                className={`${darkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'} border px-6 py-3 rounded-xl text-sm font-medium transition`}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goal Dashboard */}
      {!loading && goal && (
        <div className="flex flex-col gap-5">

          {/* Achieved banner */}
          {goal.achieved && (
            <div className="bg-green-400/10 border border-green-400/30 rounded-2xl p-5 flex items-center gap-4">
              <Trophy size={32} className="text-yellow-400 flex-shrink-0" />
              <div>
                <p className="font-black uppercase text-green-400 text-lg">Goal Achieved! 🏆</p>
                <p className="text-gray-500 text-sm">Congratulations! You reached your target weight.</p>
              </div>
            </div>
          )}

          {/* Stat cards row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className={`${card} p-4`}
              style={{ background: goal.type === 'lose' ? '#f8717108' : '#4ade8008', borderColor: goal.type === 'lose' ? '#f8717130' : '#4ade8030' }}>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Goal Type</p>
              <div className="flex items-center gap-2">
                {goal.type === 'lose'
                  ? <TrendingDown size={20} className="text-red-400" />
                  : <TrendingUp size={20} className="text-green-400" />}
                <p className="font-black text-lg capitalize">{goal.type}</p>
              </div>
            </div>
            <div className={`${card} p-4`}>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Current</p>
              <p className="text-3xl font-black">{goal.currentWeight}<span className="text-sm text-gray-500 font-normal"> kg</span></p>
            </div>
            <div className={`${card} p-4`}>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Target</p>
              <p className="text-3xl font-black text-green-400">{goal.targetWeight}<span className="text-sm text-gray-500 font-normal"> kg</span></p>
            </div>
            <div className={`${card} p-4`} style={{ borderColor: `${daysColor}30`, background: `${daysColor}08` }}>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Days Left</p>
              <div className="flex items-center gap-2">
                <Calendar size={16} style={{ color: daysColor }} />
                <p className="text-3xl font-black" style={{ color: daysColor }}>{daysLeft}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className={`${card} p-6`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black uppercase">Overall Progress</h2>
              <span className="text-2xl font-black text-green-400">{Math.round(goal.progress || 0)}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-full h-4 overflow-hidden mb-3`}>
              <div className="h-full rounded-full bg-green-400 transition-all duration-700"
                style={{ width: `${goal.progress || 0}%`, boxShadow: '0 0 12px #4ade8080' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Start: {goal.startWeight} kg</span>
              <span className="font-bold">{Math.abs(goal.currentWeight - goal.targetWeight).toFixed(1)} kg to go</span>
              <span>Target: {goal.targetWeight} kg</span>
            </div>
          </div>

          {/* Milestones + Pace + Trend row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Milestones */}
            <div className={`${card} p-5`}>
              <h2 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-yellow-400" /> Milestones
              </h2>
              <div className="flex flex-col gap-3">
                {goal.milestones?.map(m => (
                  <div key={m.pct} className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition
                    ${m.achieved
                      ? darkMode ? 'bg-green-400/10 border-green-400/20' : 'bg-green-50 border-green-200'
                      : darkMode ? 'bg-white/3 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    {getMilestoneIcon(m.pct, m.achieved)}
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${m.achieved ? 'text-green-400' : 'text-gray-500'}`}>{m.label}</p>
                      <p className="text-xs text-gray-600">{m.pct}% complete</p>
                    </div>
                    {m.achieved && <CheckCircle size={14} className="text-green-400 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Pace + Trend */}
            <div className="flex flex-col gap-4">

              {/* Pace */}
              <div className={`${card} p-5 flex-1`}
                style={goal.pace ? { borderColor: `${goal.pace.color}30`, background: `${goal.pace.color}08` } : {}}>
                <h2 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-green-400" /> Pace
                </h2>
                {goal.pace ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.pace.icon}</span>
                    <p className="font-black text-base" style={{ color: goal.pace.color }}>{goal.pace.label}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Log more weight to see pace</p>
                )}
              </div>

              {/* Weight trend */}
              <div className={`${card} p-5 flex-1`}>
                <h2 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
                  <BarChart2 size={16} className="text-green-400" /> Trend
                </h2>
                {goal.weightTrend ? (
                  <div className="flex items-center gap-2">
                    {getTrendIcon(goal.weightTrend)}
                    <p className="font-bold text-sm">{goal.weightTrend.label}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Log 3+ weights to see trend</p>
                )}
              </div>
            </div>

            {/* Predicted date + Calories */}
            <div className="flex flex-col gap-4">

              {/* Predicted date */}
              <div className={`${card} p-5 flex-1`}>
                <h2 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-green-400" /> Predicted Date
                </h2>
                {goal.predictedDate ? (
                  <div>
                    <p className="font-black text-base text-green-400">
                      {new Date(goal.predictedDate).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Based on your current progress rate</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Log 2+ weights to predict</p>
                )}
              </div>

              {/* Calorie suggestion */}
              <div className={`${card} p-5 flex-1`}>
                <h2 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
                  <Utensils size={16} className="text-green-400" /> Daily Calories
                </h2>
                {goal.calorieSuggestion ? (
                  <div>
                    <p className="text-3xl font-black text-green-400">{goal.calorieSuggestion}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {goal.type === 'lose' ? 'kcal/day to lose ~0.5kg/week' : 'kcal/day to gain weight'}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Add height, weight & age in Profile</p>
                )}
              </div>
            </div>
          </div>

          {/* Weekly summary */}
          {goal.weeklySummary && (
            <div className={`${card} p-5`}>
              <h2 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
                <Flame size={16} className="text-orange-400" /> This Week
              </h2>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-3xl font-black text-green-400">{goal.weeklySummary.change} kg</p>
                  <p className="text-sm text-gray-500">
                    {goal.weeklySummary.direction} this week
                    {goal.weeklySummary.vsLastWeek && (
                      <span className={`ml-2 font-bold ${goal.weeklySummary.vsLastWeek === 'better' ? 'text-green-400' : 'text-red-400'}`}>
                        ({goal.weeklySummary.vsLastWeek === 'better' ? '↑ Better' : '↓ Slower'} than last week)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Weight history chart */}
          {chartData.length > 1 && (
            <div className={`${card} p-6`}>
              <h2 className="text-sm font-black uppercase mb-1">Weight History</h2>
              <p className="text-gray-500 text-xs mb-5">Your weight over time</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#ffffff08' : '#f0f0f0'} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} domain={['auto', 'auto']} unit=" kg" />
                  <Tooltip
                    contentStyle={{ background: darkMode ? '#111' : '#fff', border: '1px solid #4ade8030', borderRadius: '12px', color: darkMode ? '#fff' : '#111', fontSize: '12px' }}
                    labelStyle={{ color: '#9ca3af' }}
                    formatter={v => [`${v} kg`, 'Weight']}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#4ade80" strokeWidth={2.5}
                    dot={{ fill: '#4ade80', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Edit goal button */}
          <button onClick={() => {
            setForm({ type: goal.type, currentWeight: goal.currentWeight, targetWeight: goal.targetWeight, deadline: new Date(goal.deadline).toISOString().split('T')[0] })
            setFormErrors({})
            setShowForm(true)
          }}
            className={`${darkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900'} border w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition flex items-center justify-center gap-2`}>
            <ArrowRight size={16} /> Edit Goal
          </button>
        </div>
      )}

      {/* Log Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6 w-full max-w-sm`}>
            <h2 className="text-lg font-black uppercase mb-1">Log Weight</h2>
            <p className="text-gray-500 text-sm mb-5">Enter your weight today</p>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded-xl mb-4">{error}</div>}
            <form onSubmit={handleLogWeight} className="flex flex-col gap-4">
              <input type="number" step="0.1" value={newWeight} autoFocus
                onChange={e => { setNewWeight(e.target.value); setError('') }}
                placeholder="e.g. 83.5" className={input} />
              <div className="flex gap-3">
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Log Weight'}
                </button>
                <button type="button" onClick={() => { setShowWeightModal(false); setNewWeight(''); setError('') }}
                  className={`flex-1 ${darkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'} border py-3 rounded-xl text-sm font-medium transition`}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6 w-full max-w-sm`}>
            <div className="flex items-center gap-3 mb-3">
              <Trash2 size={22} className="text-red-400" />
              <h2 className="text-lg font-black uppercase">Delete Goal?</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">This will permanently delete your goal and all weight history.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete}
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-400 transition text-sm uppercase tracking-wider">
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)}
                className={`flex-1 ${darkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'} border py-3 rounded-xl text-sm font-medium transition`}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}