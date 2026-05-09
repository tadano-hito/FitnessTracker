import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import {
  Droplet, Moon, HeartPulse, Dumbbell, Apple,
  Target, LayoutDashboard, LogOut, Menu, X, Flame
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Droplet, label: 'Water Intake', path: '/water' },
  { icon: Moon, label: 'Sleep', path: '/sleep' },
  { icon: HeartPulse, label: 'Blood Pressure', path: '/blood-pressure' },
  { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  { icon: Apple, label: 'Nutrition', path: '/nutrition' },
  { icon: Target, label: 'Goals', path: '/goals' },
]

const mockSleepData = [
  { day: 'Mon', hours: 6 },
  { day: 'Tue', hours: 7.5 },
  { day: 'Wed', hours: 5.5 },
  { day: 'Thu', hours: 8 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 9 },
  { day: 'Sun', hours: 6.5 },
]

const getSleepColor = (h) => h >= 7 ? '#4ade80' : h >= 6 ? '#facc15' : '#f87171'

export default function Dashboard() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [waterTotal, setWaterTotal] = useState(0)
  const [waterGoal] = useState(2500)

  const fetchWater = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/water', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setWaterTotal(data.total)
    } catch (err) {
      console.error(err)
    }
  }

useEffect(() => {
  if (!token) {
    navigate('/login')
    return
  }
  fetchWater()
}, [token, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const waterPct = Math.min((waterTotal / waterGoal) * 100, 100)
  const circumference = 2 * Math.PI * 54
  const strokeDash = (waterPct / 100) * circumference

  return (
    <div className="bg-black min-h-screen flex text-white">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white/3 border-r border-white/10 flex flex-col min-h-screen fixed z-20`}>
        {/* Logo */}
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

        {/* Nav */}
        <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${active
                    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon size={20} className={active ? 'text-green-400' : 'group-hover:text-white'} />
                {sidebarOpen && <span className="text-sm font-medium">{link.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 flex-1 p-8`}>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Welcome back</p>
            <h1 className="text-3xl font-black uppercase">
              {user?.name?.split(' ')[0]} <span className="text-green-400">💪</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
            <Flame size={18} className="text-orange-400" />
            <span className="text-sm font-bold">3 Day Streak</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

          {/* Water card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center hover:border-green-500/30 transition">
            <svg width="130" height="130" className="mb-4">
              <circle cx="65" cy="65" r="54" fill="none" stroke="#ffffff10" strokeWidth="10" />
              <circle
                cx="65" cy="65" r="54" fill="none"
                stroke="#4ade80" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${circumference}`}
                strokeDashoffset={circumference * 0.25}
                style={{ transition: 'stroke-dasharray 0.8s ease', filter: 'drop-shadow(0 0 8px #4ade80)' }}
              />
              <text x="65" y="60" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">{waterTotal}ml</text>
              <text x="65" y="78" textAnchor="middle" fill="#6b7280" fontSize="11">of {waterGoal}ml</text>
            </svg>
            <div className="flex items-center gap-2">
              <Droplet size={16} className="text-green-400" />
              <span className="text-sm font-semibold text-gray-300">Water Intake</span>
            </div>
            <Link to="/water" className="mt-3 text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">
              Log Water →
            </Link>
          </div>

          {/* Sleep card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-green-500/30 transition">
            <div className="flex items-center gap-2 mb-4">
              <Moon size={16} className="text-green-400" />
              <span className="text-sm font-semibold text-gray-300">Sleep Last Night</span>
            </div>
            <p className="text-4xl font-black text-white mb-1">7.5 <span className="text-lg text-gray-500 font-normal">hrs</span></p>
            <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-4">Good ✓</p>
            <Link to="/sleep" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">
              Log Sleep →
            </Link>
          </div>

          {/* BP card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-green-500/30 transition">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse size={16} className="text-green-400" />
              <span className="text-sm font-semibold text-gray-300">Blood Pressure</span>
            </div>
            <p className="text-4xl font-black text-white mb-1">120<span className="text-lg text-gray-500 font-normal">/80</span></p>
            <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-4">Normal ✓</p>
            <Link to="/blood-pressure" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">
              Log BP →
            </Link>
          </div>

          {/* Streak card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-orange-500/30 transition">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={16} className="text-orange-400" />
              <span className="text-sm font-semibold text-gray-300">Current Streak</span>
            </div>
            <p className="text-4xl font-black text-white mb-1">3 <span className="text-lg text-gray-500 font-normal">days</span></p>
            <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">Keep it up! 🔥</p>
            <p className="text-xs text-gray-600">Log daily to grow streak</p>
          </div>
        </div>

        {/* Sleep Chart */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black uppercase">Sleep This Week</h2>
              <p className="text-gray-500 text-sm">Hours per night — green is 7+, yellow is 6–7, red is under 6</p>
            </div>
            <Link to="/sleep" className="text-xs text-green-400 hover:text-green-300 transition uppercase tracking-wider font-bold">
              View All →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockSleepData} barSize={32}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }}
                formatter={(v) => [`${v} hrs`, 'Sleep']}
              />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                {mockSleepData.map((entry, i) => (
                  <Cell key={i} fill={getSleepColor(entry.hours)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </main>
    </div>
  )
}