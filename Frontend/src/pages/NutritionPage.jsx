import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  Apple, Plus, Trash2, Search, X,
  Pencil, CalendarDays, Sparkles,
} from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'

const API = 'http://localhost:5003/api'
const MEAL_TYPES   = ['breakfast', 'lunch', 'dinner', 'snacks']
const MEAL_ICONS   = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snacks: '🍎' }
const MACRO_COLORS = ['#22d3ee', '#f59e0b', '#f43f5e']
const EMPTY_FOOD   = { name: '', calories: '', protein: '', carbs: '', fats: '' }
const GOAL_OPTIONS = [
  { value: 'lose',     label: 'Weight Loss', emoji: '⚡' },
  { value: 'maintain', label: 'Maintenance',  emoji: '⚖️' },
  { value: 'gain',     label: 'Muscle Gain',  emoji: '💪' },
]

// ════════════════════════════════════════════════════════════
//  SMART FOOD SEARCH
// ════════════════════════════════════════════════════════════
function SmartFoodSearch({ token, onSelect, darkMode }) {
  const [q,               setQ]               = useState('')
  const [results,         setRes]             = useState([])
  const [loading,         setLoad]            = useState(false)
  const [category,        setCat]             = useState('')
  const [cats,            setCats]            = useState([])
  const [open,            setOpen]            = useState(false)
  const [selectedFood,    setSelectedFood]    = useState(null)
  const [selectedServing, setSelectedServing] = useState(null)
  const timer   = useRef(null)
  const wrapRef = useRef(null)

  const inp = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`

  useEffect(() => {
    axios.get(`${API}/nutrition/foods/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => setCats(r.data.data || [])).catch(() => {})
  }, [token])

  useEffect(() => {
    clearTimeout(timer.current)
    const doSearch = async () => {
      setLoad(true)
      try {
        let url = `${API}/nutrition/foods/search?q=${encodeURIComponent(q)}&limit=10`
        if (category) url = `${API}/nutrition/foods/category?cat=${encodeURIComponent(category)}&limit=10`
        const r = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        setRes(r.data.data || [])
        setOpen(true)
      } catch { setRes([]) }
      finally { setLoad(false) }
    }
    if (category) { doSearch(); return }
    if (!q.trim() || q.length < 2) { setRes([]); setOpen(false); return }
    timer.current = setTimeout(doSearch, 300)
    return () => clearTimeout(timer.current)
  }, [q, category, token])

  useEffect(() => {
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const pickFood = (food) => {
    setSelectedFood(food)
    setSelectedServing(food.servings[0])
    setOpen(false)
    setQ(food.name)
  }

  const confirmSelection = () => {
    if (!selectedFood || !selectedServing) return
    onSelect({
      name:     selectedFood.name,
      calories: String(selectedServing.calories),
      protein:  String(selectedServing.protein),
      carbs:    String(selectedServing.carbs),
      fats:     String(selectedServing.fats),
    })
    setSelectedFood(null); setSelectedServing(null)
    setQ(''); setCat(''); setRes([])
  }

  return (
    <div ref={wrapRef} className="flex flex-col gap-3">
      {/* Category pills */}
      <div className="flex gap-2 flex-wrap">
        <button type="button" onClick={() => { setCat(''); setSelectedFood(null) }}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition
            ${!category ? 'bg-green-400 text-black border-green-400' : darkMode ? 'border-white/10 text-gray-500 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-900'}`}>
          All
        </button>
        {cats.slice(0, 8).map(c => (
          <button key={c} type="button" onClick={() => { setCat(c); setSelectedFood(null) }}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition
              ${category === c ? 'bg-green-400 text-black border-green-400' : darkMode ? 'border-white/10 text-gray-500 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-900'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={q}
          onChange={e => { setQ(e.target.value); setSelectedFood(null); setCat('') }}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Search Pakistani food… e.g. biryani, karahi, paratha"
          className={`${inp} pl-9`}
        />
        {loading && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">searching…</span>}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden shadow-2xl max-h-56 overflow-y-auto`}>
          {results.map(food => (
            <button key={food.id} type="button" onClick={() => pickFood(food)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-left ${darkMode ? 'hover:bg-white/5 border-white/5' : 'hover:bg-gray-50 border-gray-100'} border-b last:border-0 transition`}>
              <span className="text-xl">{food.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{food.name}</p>
                <p className="text-gray-500 text-xs">{food.category} · {food.subcategory}</p>
              </div>
              {food.gymFriendly && <span className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full shrink-0">💪 Gym</span>}
            </button>
          ))}
        </div>
      )}

      {/* Serving selector */}
      {selectedFood && (
        <div className={`${darkMode ? 'bg-green-400/5 border-green-400/20' : 'bg-green-50 border-green-200'} border rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{selectedFood.emoji}</span>
            <span className="font-bold text-sm">{selectedFood.name}</span>
            {selectedFood.gymFriendly && <span className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full">💪 Gym Friendly</span>}
          </div>
          <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Select Serving Size</label>
          <div className="flex flex-col gap-2">
            {selectedFood.servings.map((srv, i) => (
              <button key={i} type="button" onClick={() => setSelectedServing(srv)}
                className={`flex justify-between items-center w-full px-4 py-2.5 rounded-xl border text-sm transition
                  ${selectedServing === srv
                    ? darkMode ? 'border-green-400/50 bg-green-400/10 text-white' : 'border-green-400 bg-green-50 text-gray-900'
                    : darkMode ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                <span>{srv.label}</span>
                <span className="text-xs flex gap-3">
                  <span className="text-yellow-400 font-bold">{srv.calories} kcal</span>
                  <span className="text-cyan-400">P:{srv.protein}g</span>
                  <span className="text-amber-400">C:{srv.carbs}g</span>
                  <span className="text-rose-400">F:{srv.fats}g</span>
                </span>
              </button>
            ))}
          </div>
          <button type="button" onClick={confirmSelection}
            className="mt-3 w-full bg-green-400 text-black font-bold py-2.5 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider">
            + Add to Meal
          </button>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════
//  MEAL PLAN CARD
// ════════════════════════════════════════════════════════════
function MealPlanCard({ token, calorieGoal, darkMode }) {
  const [goal,    setGoal]    = useState('maintain')
  const [plan,    setPlan]    = useState(null)
  const [loading, setLoading] = useState(false)

  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`

  const generate = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/nutrition/meal-plan?goal=${goal}&calories=${calorieGoal}`,
        { headers: { Authorization: `Bearer ${token}` } })
      setPlan(data.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  return (
    <div className={`${card} p-6`}>
      <h2 className="text-base font-black uppercase mb-2 flex items-center gap-2">
        <Sparkles size={16} className="text-green-400" /> AI Meal Plan
      </h2>
      <p className="text-gray-500 text-xs mb-5">Full day Pakistani meal plan based on your goal</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {GOAL_OPTIONS.map(g => (
          <button key={g.value} type="button" onClick={() => setGoal(g.value)}
            className={`py-2.5 rounded-xl text-xs font-bold uppercase border transition flex flex-col items-center gap-1
              ${goal === g.value ? 'bg-green-400 border-green-400 text-black' : darkMode ? 'border-white/10 text-gray-500 hover:text-white bg-white/5' : 'border-gray-200 text-gray-500 hover:text-gray-900 bg-gray-50'}`}>
            <span className="text-base">{g.emoji}</span>
            {g.label}
          </button>
        ))}
      </div>

      <button onClick={generate} disabled={loading}
        className="w-full bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(74,222,128,0.2)] disabled:opacity-50 mb-4">
        {loading ? 'Generating…' : '✨ Generate My Meal Plan'}
      </button>

      {plan && (
        <div className="flex flex-col gap-3">
          {Object.entries(plan.meals).map(([type, item]) => {
            if (!item) return null
            const srv = item.selectedServing
            return (
              <div key={type} className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-xl px-4 py-3`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase text-gray-500">{MEAL_ICONS[type]} {type}</span>
                  <span className="text-yellow-400 font-bold text-xs">{srv?.calories} kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">{srv?.label}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[['P', srv?.protein, '#22d3ee'], ['C', srv?.carbs, '#f59e0b'], ['F', srv?.fats, '#f43f5e']].map(([l, v, c]) => (
                    <span key={l} className="text-xs font-bold px-2 py-0.5 rounded-full border"
                      style={{ color: c, background: `${c}18`, borderColor: `${c}40` }}>
                      {l} {v}g
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
          <div className={`${darkMode ? 'bg-green-400/10 border-green-400/20' : 'bg-green-50 border-green-200'} border rounded-xl p-3 flex justify-between`}>
            <span className="text-gray-500 text-sm">Total planned</span>
            <span className="text-green-400 font-bold text-sm">
              {Object.values(plan.meals).reduce((s, m) => s + (m?.selectedServing?.calories || 0), 0)} kcal
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════
//  WEEKLY HISTORY
// ════════════════════════════════════════════════════════════
function WeeklyHistory({ token, calorieGoal, darkMode }) {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [days,    setDays]    = useState(7)

  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`

  const fetch7 = useCallback(async () => {
    setLoading(true)
    try {
      const { data: r } = await axios.get(`${API}/nutrition/history?days=${days}`,
        { headers: { Authorization: `Bearer ${token}` } })
      setData(r.data || [])
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [token, days])

  useEffect(() => { fetch7() }, [fetch7])

  const CustomTooltipBar = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className={`${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'} border rounded-xl px-3 py-2 text-xs`}>
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-yellow-400 font-bold">{payload[0]?.value} kcal</p>
        <p className="text-gray-500">Goal: {calorieGoal} kcal</p>
      </div>
    )
  }

  return (
    <div className={`${card} p-6`}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-black uppercase flex items-center gap-2">
            <CalendarDays size={16} className="text-green-400" /> History
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">Daily calorie trend</p>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30].map(d => (
            <button key={d} type="button" onClick={() => setDays(d)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition
                ${days === d ? 'bg-green-400 text-black border-green-400' : darkMode ? 'border-white/10 text-gray-500 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-900'}`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32 text-gray-500 text-sm">Loading…</div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-gray-500 text-sm">No history yet</div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : '#f0f0f0'} />
              <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltipBar />} cursor={{ fill: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
              <Bar dataKey="totalCalories" radius={[6, 6, 0, 0]} maxBarSize={40}>
                {data.map((_, i) => <Cell key={i} fill="url(#calGrad)" />)}
              </Bar>
              <defs>
                <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: 'Avg Calories', value: Math.round(data.reduce((s, d) => s + d.totalCalories, 0) / data.length), unit: 'kcal', color: '#facc15' },
              { label: 'Avg Protein',  value: Math.round(data.reduce((s, d) => s + d.totalProtein, 0) / data.length),  unit: 'g',    color: '#22d3ee' },
              { label: 'Days Logged',  value: data.filter(d => d.mealCount > 0).length, unit: `/${days}`,              color: '#4ade80' },
            ].map(({ label, value, unit, color }) => (
              <div key={label} className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-xl p-3 text-center`}>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{label}</p>
                <p className="text-xl font-black" style={{ color }}>{value}<span className="text-xs text-gray-500 font-normal ml-1">{unit}</span></p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════
//  EDIT MEAL MODAL
// ════════════════════════════════════════════════════════════
function EditMealModal({ meal, token, onClose, onSaved, darkMode }) {
  const [mealType,  setMealType]  = useState(meal.mealType)
  const [foodItems, setFoodItems] = useState(meal.foodItems.map(fi => ({ ...fi, calories: String(fi.calories), protein: String(fi.protein), carbs: String(fi.carbs), fats: String(fi.fats) })))
  const [notes,     setNotes]     = useState(meal.notes || '')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

  const inp = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`

  const setField = (idx, key, val) =>
    setFoodItems(fi => { const a = [...fi]; a[idx] = { ...a[idx], [key]: val }; return a })

  const handleSave = async () => {
    setError('')
    if (!foodItems[0]?.name) { setError('At least one food item required.'); return }
    setLoading(true)
    try {
      await axios.put(`${API}/nutrition/${meal._id}`,
        { mealType, notes, foodItems: foodItems.map(fi => ({ name: fi.name, calories: Number(fi.calories) || 0, protein: Number(fi.protein) || 0, carbs: Number(fi.carbs) || 0, fats: Number(fi.fats) || 0 })) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      onSaved()
    } catch (e) { setError(e?.response?.data?.message || 'Failed to save.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className={`${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black uppercase">✏️ Edit Meal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-400 transition"><X size={18} /></button>
        </div>

        <div className="mb-4">
          <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Meal Type</label>
          <div className="grid grid-cols-4 gap-2">
            {MEAL_TYPES.map(t => (
              <button key={t} type="button" onClick={() => setMealType(t)}
                className={`py-2 rounded-xl text-xs font-bold uppercase border transition
                  ${mealType === t ? 'bg-green-400 border-green-400 text-black' : darkMode ? 'border-white/10 text-gray-500 hover:text-white bg-white/5' : 'border-gray-200 text-gray-500 hover:text-gray-900 bg-gray-50'}`}>
                {MEAL_ICONS[t]}
              </button>
            ))}
          </div>
        </div>

        {foodItems.map((fi, idx) => (
          <div key={idx} className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-xl p-4 mb-3 flex flex-col gap-3`}>
            <input value={fi.name} onChange={e => setField(idx, 'name', e.target.value)} placeholder="Food name" className={inp} />
            <div className="grid grid-cols-2 gap-3">
              {[['Calories', 'calories'], ['Protein (g)', 'protein'], ['Carbs (g)', 'carbs'], ['Fats (g)', 'fats']].map(([lbl, key]) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{lbl}</label>
                  <input type="number" min="0" step="0.1" value={fi[key]} onChange={e => setField(idx, key, e.target.value)} className={inp} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-4">
          <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Notes</label>
          <input value={notes} onChange={e => setNotes(e.target.value)} className={inp} />
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="flex gap-3">
          <button onClick={onClose} className={`flex-1 border ${darkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'} font-bold py-3 rounded-xl transition text-sm`}>Cancel</button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition text-sm disabled:opacity-50">
            {loading ? 'Saving…' : '✓ Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════
//  BMI CALCULATOR
// ════════════════════════════════════════════════════════════
function BMICalculator({ profile, darkMode }) {
  const [h, setH] = useState(profile?.height || '')
  const [w, setW] = useState(profile?.weight || '')

  const bmi = h > 0 && w > 0 ? (w / Math.pow(h / 100, 2)).toFixed(1) : null
  const cat = !bmi ? null : bmi < 18.5 ? { label: 'Underweight', color: '#60a5fa' } : bmi < 25 ? { label: 'Normal', color: '#4ade80' } : bmi < 30 ? { label: 'Overweight', color: '#facc15' } : { label: 'Obese', color: '#f87171' }
  const pct = bmi ? Math.min(((bmi - 10) / 30) * 100, 100) : 0

  const inp = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`
  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`

  return (
    <div className={`${card} p-6`}>
      <h2 className="text-base font-black uppercase mb-5">⚖️ BMI Calculator</h2>
      <div className="grid grid-cols-2 gap-4">
        {[['Height (cm)', h, setH, '175'], ['Weight (kg)', w, setW, '70']].map(([lbl, val, set, ph]) => (
          <div key={lbl}>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{lbl}</label>
            <input type="number" value={val} onChange={e => set(e.target.value)} placeholder={ph} className={inp} />
          </div>
        ))}
      </div>
      {bmi && (
        <div className="mt-5">
          <div className={`h-2.5 ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-full overflow-hidden mb-3`}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg,#60a5fa,${cat.color})` }} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">BMI</span>
            <span className="text-3xl font-black" style={{ color: cat.color }}>{bmi}</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full border"
              style={{ color: cat.color, background: `${cat.color}18`, borderColor: `${cat.color}40` }}>{cat.label}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[['<18.5', 'Under', '#60a5fa'], ['18.5–24.9', 'Normal', '#4ade80'], ['25–29.9', 'Over', '#facc15'], ['≥30', 'Obese', '#f87171']].map(([r, l, c]) => (
              <div key={l} className="rounded-xl p-2 text-center border" style={{ background: `${c}10`, borderColor: `${c}30` }}>
                <div className="text-xs font-bold" style={{ color: c }}>{l}</div>
                <div className="text-gray-500 text-xs mt-0.5">{r}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════
//  MAIN PAGE — no sidebar, uses Layout
// ════════════════════════════════════════════════════════════
export default function NutritionPage() {
  const { token }      = useAuth()
  const { darkMode }   = useTheme()
  const navigate       = useNavigate()

  // fetch profile for BMI
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    if (!token) return
    axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setProfile(r.data)).catch(() => {})
  }, [token])

  const [meals,       setMeals]       = useState([])
  const [summary,     setSummary]     = useState({ totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 })
  const [fetching,    setFetching]    = useState(false)
  const [mealType,    setMealType]    = useState('breakfast')
  const [foodItems,   setFoodItems]   = useState([{ ...EMPTY_FOOD }])
  const [notes,       setNotes]       = useState('')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [success,     setSuccess]     = useState(false)
  const [editingMeal, setEditingMeal] = useState(null)

  const GOAL = profile?.calorieGoal || 2000

  const fetchToday = useCallback(async () => {
    setFetching(true)
    try {
      const { data } = await axios.get(`${API}/nutrition/today`, { headers: { Authorization: `Bearer ${token}` } })
      setMeals(data.data || [])
      setSummary(data.summary || {})
    } catch { }
    finally { setFetching(false) }
  }, [token])

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchToday()
  }, [token, fetchToday, navigate])

  const setField   = (idx, key, val) => setFoodItems(fi => { const a = [...fi]; a[idx] = { ...a[idx], [key]: val }; return a })
  const fillFromSearch = (item) => setFoodItems(fi => { const a = [...fi]; const i = a.findIndex(x => !x.name); const idx = i >= 0 ? i : a.length - 1; a[idx] = item; return a })
  const addFood    = () => setFoodItems(fi => [...fi, { ...EMPTY_FOOD }])
  const removeFood = idx => setFoodItems(fi => fi.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess(false)
    if (!foodItems[0]?.name) { setError('Add at least one food item.'); return }
    setLoading(true)
    try {
      await axios.post(`${API}/nutrition`,
        { mealType, notes, foodItems: foodItems.map(fi => ({ name: fi.name, calories: Number(fi.calories) || 0, protein: Number(fi.protein) || 0, carbs: Number(fi.carbs) || 0, fats: Number(fi.fats) || 0 })) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setFoodItems([{ ...EMPTY_FOOD }]); setNotes(''); setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      fetchToday()
    } catch (e) { setError(e?.response?.data?.message || 'Failed to log meal.') }
    finally { setLoading(false) }
  }

  const deleteMeal = async (id) => {
    try { await axios.delete(`${API}/nutrition/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchToday() } catch { }
  }

  const macroData = [
    { name: 'Protein', value: Math.round(summary.totalProtein || 0) },
    { name: 'Carbs',   value: Math.round(summary.totalCarbs   || 0) },
    { name: 'Fats',    value: Math.round(summary.totalFats    || 0) },
  ].filter(d => d.value > 0)

  const progress = Math.min(((summary.totalCalories || 0) / GOAL) * 100, 100)

  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`
  const inp  = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const { name, value } = payload[0].payload
    const total = (summary.totalProtein || 0) + (summary.totalCarbs || 0) + (summary.totalFats || 0)
    return (
      <div className={`${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'} border rounded-xl px-3 py-2 text-sm`}>
        <p className="font-bold">{name}</p>
        <p className="text-gray-500">{value}g · {total > 0 ? ((value / total) * 100).toFixed(1) : 0}%</p>
      </div>
    )
  }

  return (
    <div>
      {/* Edit modal */}
      {editingMeal && (
        <EditMealModal meal={editingMeal} token={token} darkMode={darkMode}
          onClose={() => setEditingMeal(null)}
          onSaved={() => { setEditingMeal(null); fetchToday() }} />
      )}

      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Track Your</p>
        <h1 className="text-2xl md:text-3xl font-black uppercase flex items-center gap-3">
          <Apple size={26} className="text-green-400" /> Nutrition
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Calories', value: Math.round(summary.totalCalories || 0), unit: 'kcal', color: '#facc15', icon: '🔥' },
          { label: 'Protein',  value: Math.round(summary.totalProtein  || 0), unit: 'g',    color: '#22d3ee', icon: '💪' },
          { label: 'Carbs',    value: Math.round(summary.totalCarbs    || 0), unit: 'g',    color: '#f59e0b', icon: '🌾' },
          { label: 'Fats',     value: Math.round(summary.totalFats     || 0), unit: 'g',    color: '#f43f5e', icon: '🫒' },
        ].map(({ label, value, unit, color, icon }) => (
          <div key={label} className={`${card} p-4`}>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{icon} {label}</p>
            <p className="text-3xl font-black" style={{ color }}>{value} <span className="text-sm text-gray-500 font-normal">{unit}</span></p>
          </div>
        ))}
      </div>

      {/* Calorie progress */}
      <div className={`${card} p-5 mb-5`}>
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-gray-500 text-xs uppercase tracking-widest">Daily Calorie Goal</span>
          <span className="text-sm text-gray-400"><span className="font-bold">{Math.round(summary.totalCalories || 0)}</span> / {GOAL} kcal</span>
        </div>
        <div className={`h-3 ${darkMode ? 'bg-white/10' : 'bg-gray-100'} rounded-full overflow-hidden`}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: progress > 95 ? 'linear-gradient(90deg,#facc15,#f87171)' : 'linear-gradient(90deg,#4ade80,#22d3ee)', boxShadow: '0 0 10px #4ade8050' }} />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-right">
          {GOAL - (summary.totalCalories || 0) > 0 ? `${Math.round(GOAL - (summary.totalCalories || 0))} kcal remaining` : '🎉 Daily goal reached!'}
        </p>
      </div>

      {/* Log + Today's meals */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">

        {/* LOG FORM */}
        <div className={`${card} p-6`}>
          <h2 className="text-base font-black uppercase mb-5 flex items-center gap-2">
            <Plus size={16} className="text-green-400" /> Log a Meal
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Meal Type</label>
              <div className="grid grid-cols-4 gap-2">
                {MEAL_TYPES.map(t => (
                  <button key={t} type="button" onClick={() => setMealType(t)}
                    className={`py-2 rounded-xl text-xs font-bold uppercase border transition
                      ${mealType === t ? 'bg-green-400 border-green-400 text-black' : darkMode ? 'border-white/10 text-gray-500 hover:text-white bg-white/5' : 'border-gray-200 text-gray-500 hover:text-gray-900 bg-gray-50'}`}>
                    {MEAL_ICONS[t]} {t}
                  </button>
                ))}
              </div>
            </div>

            <SmartFoodSearch token={token} onSelect={fillFromSearch} darkMode={darkMode} />

            {foodItems.map((fi, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-white/3 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-xl p-3 flex flex-col gap-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-400 font-bold uppercase">{fi.name || `Item ${idx + 1}`}</span>
                  {foodItems.length > 1 && <button type="button" onClick={() => removeFood(idx)} className="text-gray-500 hover:text-red-400 transition"><X size={13} /></button>}
                </div>
                <input value={fi.name} onChange={e => setField(idx, 'name', e.target.value)} placeholder="Food name" className={inp} />
                <div className="grid grid-cols-4 gap-2">
                  {[['Cal', 'calories'], ['P(g)', 'protein'], ['C(g)', 'carbs'], ['F(g)', 'fats']].map(([lbl, key]) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 mb-1 block">{lbl}</label>
                      <input type="number" min="0" step="0.1" value={fi[key]} onChange={e => setField(idx, key, e.target.value)} placeholder="0" className={inp} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button type="button" onClick={addFood}
              className={`border border-dashed ${darkMode ? 'border-white/20 text-gray-500 hover:text-white hover:border-white/40' : 'border-gray-300 text-gray-400 hover:text-gray-700'} rounded-xl py-2 text-sm transition`}>
              + Add Another Food Item
            </button>

            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes (optional)" className={inp} />

            {error   && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
            {success && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl">✓ Meal logged!</div>}

            <button type="submit" disabled={loading}
              className="w-full bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50">
              {loading ? 'Logging…' : 'Log Meal'}
            </button>
          </form>
        </div>

        {/* TODAY'S MEALS */}
        <div className={`${card} p-6`}>
          <h2 className="text-base font-black uppercase mb-5">🍽 Today's Meals</h2>
          {fetching ? (
            <div className="flex items-center justify-center h-32"><div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin" /></div>
          ) : meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <Apple size={36} className="mb-3 opacity-30" />
              <p className="text-sm">No meals logged today.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1">
              {meals.map(meal => (
                <div key={meal._id} className={`${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-xl px-4 py-3`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm capitalize">{MEAL_ICONS[meal.mealType]} {meal.mealType}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold text-xs">{meal.totalCalories} kcal</span>
                      <button onClick={() => setEditingMeal(meal)} className="text-gray-500 hover:text-green-400 transition"><Pencil size={13} /></button>
                      <button onClick={() => deleteMeal(meal._id)} className="text-gray-500 hover:text-red-400 transition"><Trash2 size={13} /></button>
                    </div>
                  </div>
                  {meal.foodItems.map((fi, i) => (
                    <div key={i} className="flex justify-between text-xs text-gray-500 py-0.5">
                      <span>• {fi.name}</span><span>{fi.calories} kcal</span>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {[['P', meal.totalProtein, '#22d3ee'], ['C', meal.totalCarbs, '#f59e0b'], ['F', meal.totalFats, '#f43f5e']].map(([l, v, c]) => (
                      <span key={l} className="text-xs font-bold px-2 py-0.5 rounded-full border"
                        style={{ color: c, background: `${c}18`, borderColor: `${c}40` }}>{l} {Math.round(v)}g</span>
                    ))}
                  </div>
                  {meal.notes && <p className="text-xs text-gray-500 italic mt-2">"{meal.notes}"</p>}
                </div>
              ))}
            </div>
          )}

          {/* Macros pie inline */}
          {macroData.length > 0 && (
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">📊 Macros</p>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={90} height={90}>
                  <PieChart>
                    <Pie data={macroData} cx="50%" cy="50%" innerRadius={22} outerRadius={40} paddingAngle={3} dataKey="value" stroke="none">
                      {macroData.map((_, i) => <Cell key={i} fill={MACRO_COLORS[i]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-1.5 flex-1">
                  {[['Protein', summary.totalProtein, '#22d3ee'], ['Carbs', summary.totalCarbs, '#f59e0b'], ['Fats', summary.totalFats, '#f43f5e']].map(([lbl, val, c]) => {
                    const total = (summary.totalProtein || 0) + (summary.totalCarbs || 0) + (summary.totalFats || 0)
                    return (
                      <div key={lbl} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />
                        <span className="text-xs text-gray-500 flex-1">{lbl}</span>
                        <span className="text-xs font-bold">{Math.round(val || 0)}g</span>
                        <span className="text-xs text-gray-600">{total > 0 ? ((val || 0) / total * 100).toFixed(0) : 0}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BMI + Meal Plan */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        <BMICalculator profile={profile} darkMode={darkMode} />
        <MealPlanCard token={token} calorieGoal={GOAL} darkMode={darkMode} />
      </div>

      {/* Weekly history */}
      <WeeklyHistory token={token} calorieGoal={GOAL} darkMode={darkMode} />
    </div>
  )
}