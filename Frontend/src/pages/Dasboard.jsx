import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import {
  Droplet, Moon, HeartPulse, Dumbbell, Apple,
  Target, LayoutDashboard, LogOut, Menu, X, Flame, Plus, User
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line
} from 'recharts'

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Droplet, label: 'Water Intake', path: '/water' },
  { icon: Moon, label: 'Sleep', path: '/sleep' },
  { icon: HeartPulse, label: 'Blood Pressure', path: '/blood-pressure' },
  { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  { icon: Apple, label: 'Nutrition', path: '/nutrition' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: User, label: 'Profile', path: '/profile' },
]

const getSleepColor = (h) => h >= 7 ? '#4ade80' : h >= 6 ? '#facc15' : '#f87171'
const getBPStatus = (s, d) => {
  if (s < 120 && d < 80) return { label: 'Normal', color: '#4ade80' }
  if (s < 130 && d < 80) return { label: 'Elevated', color: '#facc15' }
  if (s < 140 || d < 90) return { label: 'High Stage 1', color: '#fb923c' }
  return { label: 'High Stage 2', color: '#f87171' }
}

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return { text: 'Good Morning', icon: '🌅' }
  if (h < 17) return { text: 'Good Afternoon', icon: '☀️' }
  if (h < 21) return { text: 'Good Evening', icon: '🌆' }
  return { text: 'Good Night', icon: '🌙' }
}

const calculateStreak = (logs) => {
  if (!logs.length) return 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dates = [...new Set(logs.map(l => {
    const d = new Date(l.createdAt || l.date)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
  }))].sort((a, b) => b - a)
  let streak = 0
  let current = today.getTime()
  for (const date of dates) {
    if (date === current || date === current - 86400000) {
      streak++
      current = date - 86400000
    } else break
  }
  return streak
}

const calculateHealthScore = (waterTotal, waterGoal, lastSleep, lastBP) => {
  let score = 0
  // Water: 33 points
  score += Math.min((waterTotal / waterGoal) * 33, 33)
  // Sleep: 33 points
  if (lastSleep) {
    const h = lastSleep.hoursSlept
    if (h >= 7 && h <= 9) score += 33
    else if (h >= 6) score += 20
    else score += 10
  }
  // BP: 34 points
  if (lastBP) {
    const { label } = getBPStatus(lastBP.systolic, lastBP.diastolic)
    if (label === 'Normal') score += 34
    else if (label === 'Elevated') score += 22
    else if (label === 'High Stage 1') score += 12
    else score += 5
  }
  return Math.round(score)
}

const getScoreColor = (s) => s >= 80 ? '#4ade80' : s >= 60 ? '#facc15' : s >= 40 ? '#fb923c' : '#f87171'
const getScoreLabel = (s) => s >= 80 ? 'Excellent' : s >= 60 ? 'Good' : s >= 40 ? 'Fair' : 'Poor'

export default function Dashboard() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [waterTotal, setWaterTotal] = useState(0)
  const [waterGoal] = useState(2500)
  const [sleepLogs, setSleepLogs] = useState([])
  const [bpLogs, setBpLogs] = useState([])
  const [streak, setStreak] = useState(0)
  const [quickLogging, setQuickLogging] = useState(false)

  const fetchAll = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const [waterRes, sleepRes, bpRes] = await Promise.all([
        axios.get('http://localhost:5003/api/water', { headers }),
        axios.get('http://localhost:5003/api/sleep', { headers }),
        axios.get('http://localhost:5003/api/bp', { headers }),
      ])
      setWaterTotal(waterRes.data.total)
      setSleepLogs(sleepRes.data)
      setBpLogs(bpRes.data)
      const allLogs = [...waterRes.data.logs, ...sleepRes.data, ...bpRes.data]
      setStreak(calculateStreak(allLogs))
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchAll()
  }, [token, navigate])

  const quickLogWater = async (amount) => {
    setQuickLogging(true)
    try {
      await axios.post('http://localhost:5003/api/water',
        { amount, unit: 'ml' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchAll()
    } catch (err) { console.error(err) }
    finally { setQuickLogging(false) }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const lastSleep = sleepLogs[0]
  const lastBP = bpLogs[0]
  const bpStatus = lastBP ? getBPStatus(lastBP.systolic, lastBP.diastolic) : null
  const greeting = getGreeting()
  const healthScore = calculateHealthScore(waterTotal, waterGoal, lastSleep, lastBP)
  const scoreColor = getScoreColor(healthScore)

  // Water ring
  const waterPct = Math.min((waterTotal / waterGoal) * 100, 100)
  const r = 44
  const circ = 2 * Math.PI * r
  const waterDash = (waterPct / 100) * circ

  // Sleep chart — deduplicate by actual date, keep latest per date
  const sleepByDay = {}
  ;[...sleepLogs].reverse().forEach(l => {
    const dateKey = new Date(l.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' })
    const dayLabel = new Date(l.createdAt).toLocaleDateString('en', { weekday: 'short' })
    if (!sleepByDay[dateKey]) {
      sleepByDay[dateKey] = { day: dayLabel, date: dateKey, hours: l.hoursSlept, quality: l.quality }
    }
  })
  const sleepChartData = Object.values(sleepByDay).slice(-7)

  // BP chart
  const bpChartData = [...bpLogs].reverse().slice(-5).map(l => ({
    date: new Date(l.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    systolic: l.systolic,
    diastolic: l.diastolic
  }))

  // Goals progress
  const waterProgress = Math.min((waterTotal / waterGoal) * 100, 100)
  const sleepProgress = lastSleep ? Math.min((lastSleep.hoursSlept / 8) * 100, 100) : 0
  const bpProgress = lastBP ? (bpStatus?.label === 'Normal' ? 100 : bpStatus?.label === 'Elevated' ? 75 : bpStatus?.label === 'High Stage 1' ? 40 : 20) : 0

  return (
    <div className="bg-black min-h-screen flex text-white">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white/3 border-r border-white/10 flex flex-col min-h-screen fixed z-20`}>
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          {sidebarOpen && <span className="text-lg font-black tracking-widest uppercase">Pulse<span className="text-green-400">Fit</span></span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition ml-auto">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${active ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                <Icon size={18} className={active ? 'text-green-400' : 'group-hover:text-white'} />
                {sidebarOpen && <span className="text-sm font-medium">{link.label}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="px-2 py-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all w-full">
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300 flex-1 p-4 md:p-8 min-w-0`}>

        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
              {greeting.text} {greeting.icon}
            </p>
            <h1 className="text-2xl md:text-3xl font-black uppercase">
              {user?.name?.split(' ')[0]} <span className="text-green-400">💪</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
            <Flame size={16} className="text-orange-400" />
            <span className="text-sm font-bold">{streak} Day{streak !== 1 ? 's' : ''} Streak</span>
          </div>
        </div>

        {/* Health Score + Goals Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          {/* Health Score */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5"
            style={{ borderColor: `${scoreColor}30`, background: `${scoreColor}08` }}>
            <div className="relative flex-shrink-0">
              <svg width="80" height="80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#ffffff08" strokeWidth="8" />
                <circle cx="40" cy="40" r="34" fill="none"
                  stroke={scoreColor} strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(healthScore / 100) * (2 * Math.PI * 34)} ${2 * Math.PI * 34}`}
                  strokeDashoffset={(2 * Math.PI * 34) * 0.25}
                  style={{ transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 6px ${scoreColor})` }}
                />
                <text x="40" y="44" textAnchor="middle" fill={scoreColor} fontSize="16" fontWeight="bold">{healthScore}</text>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Health Score</p>
              <p className="text-xl font-black" style={{ color: scoreColor }}>{getScoreLabel(healthScore)}</p>
              <p className="text-xs text-gray-600 mt-1">Based on water, sleep & BP</p>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Today's Goals</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Water', value: `${waterTotal}ml / ${waterGoal}ml`, pct: waterProgress, color: '#4ade80', icon: Droplet },
                { label: 'Sleep', value: lastSleep ? `${lastSleep.hoursSlept}hrs / 8hrs` : 'Not logged', pct: sleepProgress, color: getSleepColor(lastSleep?.hoursSlept || 0), icon: Moon },
                { label: 'Blood Pressure', value: lastBP ? `${lastBP.systolic}/${lastBP.diastolic} — ${bpStatus?.label}` : 'Not logged', pct: bpProgress, color: bpStatus?.color || '#6b7280', icon: HeartPulse },
              ].map(g => {
                const Icon = g.icon
                return (
                  <div key={g.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon size={12} style={{ color: g.color }} />
                        <span className="text-xs font-medium text-gray-400">{g.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">{g.value}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all duration-700"
                        style={{ width: `${g.pct}%`, background: g.color, boxShadow: `0 0 8px ${g.color}60` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mb-6">

          {/* Water card */}
          <div className="col-span-2 md:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center hover:border-green-500/30 transition">
            <svg width="100" height="100" className="mb-2">
              <circle cx="50" cy="50" r={r} fill="none" stroke="#ffffff08" strokeWidth="8" />
              <circle cx="50" cy="50" r={r} fill="none"
                stroke={waterPct >= 100 ? '#4ade80' : waterPct >= 60 ? '#4ade80' : waterPct >= 30 ? '#facc15' : '#f87171'}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${waterDash} ${circ}`}
                strokeDashoffset={circ * 0.25}
                style={{ transition: 'stroke-dasharray 0.8s ease', filter: 'drop-shadow(0 0 8px #4ade80)' }}
              />
              <text x="50" y="46" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">{waterTotal}ml</text>
              <text x="50" y="60" textAnchor="middle" fill="#6b7280" fontSize="9">of {waterGoal}ml</text>
              <text x="50" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">{Math.round(waterPct)}%</text>
            </svg>
            <span className="text-xs font-semibold text-gray-300 mb-2">Water Intake</span>
            {/* Quick log buttons */}
            <div className="flex gap-1 w-full mb-2">
              {[250, 500].map(amt => (
                <button key={amt} onClick={() => quickLogWater(amt)} disabled={quickLogging}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-400/10 border border-green-400/20 text-green-400 text-xs font-bold py-1.5 rounded-lg hover:bg-green-400/20 transition disabled:opacity-50">
                  <Plus size={10} />+{amt}ml
                </button>
              ))}
            </div>
            <Link to="/water" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">More →</Link>
          </div>

          {/* Sleep card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-green-500/30 transition">
            <div className="flex items-center gap-1.5 mb-3">
              <Moon size={13} className="text-green-400" />
              <span className="text-xs font-semibold text-gray-300">Sleep</span>
            </div>
            {lastSleep ? (
              <>
                <p className="text-3xl font-black mb-0.5" style={{ color: getSleepColor(lastSleep.hoursSlept) }}>
                  {lastSleep.hoursSlept}<span className="text-sm text-gray-500 font-normal"> hrs</span>
                </p>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: getSleepColor(lastSleep.hoursSlept) }}>
                  {lastSleep.quality}
                </p>
              </>
            ) : (
              <p className="text-3xl font-black text-gray-600 mb-4">--</p>
            )}
            <Link to="/sleep" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">Log →</Link>
          </div>

          {/* BP card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-green-500/30 transition">
            <div className="flex items-center gap-1.5 mb-3">
              <HeartPulse size={13} className="text-green-400" />
              <span className="text-xs font-semibold text-gray-300">Blood Pressure</span>
            </div>
            {lastBP ? (
              <>
                <p className="text-3xl font-black text-white mb-0.5">
                  {lastBP.systolic}<span className="text-sm text-gray-500 font-normal">/{lastBP.diastolic}</span>
                </p>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: bpStatus?.color }}>
                  {bpStatus?.label}
                </p>
              </>
            ) : (
              <p className="text-3xl font-black text-gray-600 mb-4">--/--</p>
            )}
            <Link to="/blood-pressure" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">Log →</Link>
          </div>

          {/* Streak card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-orange-500/30 transition">
            <div className="flex items-center gap-1.5 mb-3">
              <Flame size={13} className="text-orange-400" />
              <span className="text-xs font-semibold text-gray-300">Streak</span>
            </div>
            <p className="text-3xl font-black text-white mb-0.5">
              {streak}<span className="text-sm text-gray-500 font-normal"> days</span>
            </p>
            <p className="text-xs font-bold uppercase tracking-wider mb-3 text-orange-400">
              {streak > 0 ? '🔥 Keep it up!' : 'Start logging!'}
            </p>
            <p className="text-xs text-gray-600">Log daily to grow</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* Sleep Chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-black uppercase">Sleep This Week</h2>
                <p className="text-gray-500 text-xs">Green 7+, yellow 6–7, red under 6</p>
              </div>
              <Link to="/sleep" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">View All →</Link>
            </div>
            {sleepChartData.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-600 text-xs">No sleep data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={sleepChartData} barSize={24}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip
                    cursor={{ fill: '#4ade8010', stroke: '#4ade8030', strokeWidth: 1, radius: 8 }}
                    contentStyle={{ background: '#111', border: '1px solid #4ade8030', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(v, n, props) => [
                      `${v} hrs — ${props?.payload?.quality || ''}`,
                      'Sleep'
                    ]}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]} fill="#4ade80"
                    label={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* BP Chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-black uppercase">BP History</h2>
                <p className="text-gray-500 text-xs">Last 5 readings — systolic vs diastolic</p>
              </div>
              <Link to="/blood-pressure" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">View All →</Link>
            </div>
            {bpChartData.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-600 text-xs">No BP data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={bpChartData}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis domain={[40, 180]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(v, n) => [`${v} mmHg`, n]}
                  />
                  <Line type="monotone" dataKey="systolic" stroke="#f87171" strokeWidth={2} dot={{ r: 3, fill: '#f87171' }} name="Systolic" />
                  <Line type="monotone" dataKey="diastolic" stroke="#4ade80" strokeWidth={2} dot={{ r: 3, fill: '#4ade80' }} name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </main>
    </div>
  )
}