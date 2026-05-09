import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import {
  Droplet, Plus, Trash2, LayoutDashboard,
  Moon, HeartPulse, Dumbbell, Apple, Target, LogOut, Menu, X,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,  } from 'recharts'
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Droplet, label: 'Water Intake', path: '/water' },
  { icon: Moon, label: 'Sleep', path: '/sleep' },
  { icon: HeartPulse, label: 'Blood Pressure', path: '/blood-pressure' },
  { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  { icon: Apple, label: 'Nutrition', path: '/nutrition' },
  { icon: Target, label: 'Goals', path: '/goals' },
]

const quickAmounts = [150, 250, 350, 500]

export default function WaterIntakePage() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [logs, setLogs] = useState([])
  const [total, setTotal] = useState(0)
  const [goal] = useState(2500)
  const [customAmount, setCustomAmount] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchWater()
  }, [token, navigate])

  const fetchWater = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/water', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setLogs(data.logs)
      setTotal(data.total)
    } catch (err) {
      console.error(err)
    }
  }

  const logWater = async (amount) => {
    if (!amount || amount <= 0) return
    setLoading(true)
    try {
      await axios.post('http://localhost:5003/api/water',
        { amount: Number(amount), unit: 'ml' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCustomAmount('')
      fetchWater()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/water/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchWater()
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  // Ring calculation
  const pct = Math.min((total / goal) * 100, 100)
  const r = 80
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  // Chart data from logs
  const chartData = quickAmounts.map(a => ({
    amount: `${a}ml`,
    count: logs.filter(l => l.amount === a).length
  }))

  const formatTime = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-black min-h-screen flex text-white">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white/3 border-r border-white/10 flex flex-col min-h-screen fixed z-20`}>
        <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
          {sidebarOpen && (
            <span className="text-xl font-black tracking-widest uppercase">
              Pulse<span className="text-green-400">Fit</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition ml-auto">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${active ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                <Icon size={20} className={active ? 'text-green-400' : 'group-hover:text-white'} />
                {sidebarOpen && <span className="text-sm font-medium">{link.label}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-6 border-t border-white/10">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all w-full">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 flex-1 p-8`}>

        {/* Header */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Track Your</p>
          <h1 className="text-3xl font-black uppercase flex items-center gap-3">
            <Droplet size={28} className="text-green-400" /> Water Intake
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

          {/* Ring + logging */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center">

            {/* Animated Ring */}
            <svg width="200" height="200" className="mb-6">
              <circle cx="100" cy="100" r={r} fill="none" stroke="#ffffff08" strokeWidth="14" />
              <circle
                cx="100" cy="100" r={r} fill="none"
                stroke={pct >= 100 ? '#4ade80' : pct >= 60 ? '#4ade80' : pct >= 30 ? '#facc15' : '#f87171'}
                strokeWidth="14" strokeLinecap="round"
                strokeDasharray={`${dash} ${circ}`}
                strokeDashoffset={circ * 0.25}
                style={{ transition: 'stroke-dasharray 0.8s ease', filter: 'drop-shadow(0 0 10px #4ade80)' }}
              />
              <text x="100" y="90" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold">{total}ml</text>
              <text x="100" y="112" textAnchor="middle" fill="#6b7280" fontSize="13">of {goal}ml</text>
              <text x="100" y="132" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">{Math.round(pct)}%</text>
            </svg>

            {/* Status */}
            <p className={`text-sm font-bold uppercase tracking-wider mb-6 ${pct >= 100 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {pct >= 100 ? '🎉 Goal Reached!' : pct >= 60 ? '💧 Almost there!' : '⚠️ Drink more water!'}
            </p>

            {/* Quick log buttons */}
            <div className="grid grid-cols-4 gap-3 w-full mb-4">
              {quickAmounts.map(amt => (
                <button key={amt} onClick={() => logWater(amt)} disabled={loading}
                  className="bg-green-400/10 border border-green-400/20 text-green-400 font-bold py-3 rounded-xl hover:bg-green-400/20 transition text-sm disabled:opacity-50">
                  +{amt}ml
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="flex gap-3 w-full">
              <input
                type="number"
                placeholder="Custom ml..."
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-400/50 transition"
              />
              <button onClick={() => logWater(customAmount)} disabled={loading || !customAmount}
                className="bg-green-400 text-black font-bold px-5 py-3 rounded-xl hover:bg-green-300 transition disabled:opacity-50">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Today's logs */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-lg font-black uppercase mb-6">Today's Logs</h2>
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-600">
                <Droplet size={40} className="mb-3 opacity-30" />
                <p className="text-sm">No logs yet today. Start drinking!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {[...logs].reverse().map((log) => (
                  <div key={log._id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                        <Droplet size={14} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{log.amount}ml</p>
                        <p className="text-xs text-gray-500">{formatTime(log.date || log.createdAt)}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteLog(log._id)}
                      className="text-gray-600 hover:text-red-400 transition p-1">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-lg font-black uppercase mb-2">Log Breakdown</h2>
          <p className="text-gray-500 text-sm mb-6">How many times you logged each amount today</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barSize={40}>
              <XAxis dataKey="amount" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }}
                formatter={(v) => [`${v} times`, 'Logged']}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </main>
    </div>
  )
}