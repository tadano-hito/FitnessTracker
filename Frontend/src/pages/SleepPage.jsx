import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import {
  Moon, Trash2, LayoutDashboard, Droplet,
  HeartPulse, Dumbbell, Apple, Target, LogOut, Menu, X, Plus
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Droplet, label: 'Water Intake', path: '/water' },
  { icon: Moon, label: 'Sleep', path: '/sleep' },
  { icon: HeartPulse, label: 'Blood Pressure', path: '/blood-pressure' },
  { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  { icon: Apple, label: 'Nutrition', path: '/nutrition' },
  { icon: Target, label: 'Goals', path: '/goals' },
]

const qualityOptions = ['poor', 'fair', 'good', 'excellent']
const qualityColors = { poor: '#f87171', fair: '#facc15', good: '#4ade80', excellent: '#34d399' }
const sleepColor = (h) => h >= 7 ? '#4ade80' : h >= 6 ? '#facc15' : '#f87171'

export default function SleepPage() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ hoursSlept: '', quality: 'good', bedTime: '', wakeTime: '', notes: '' })

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/sleep', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setLogs(data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchLogs()
  }, [token, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.hoursSlept || Number(form.hoursSlept) > 24) return
    setLoading(true)
    try {
      await axios.post('http://localhost:5003/api/sleep',
        { ...form, hoursSlept: Number(form.hoursSlept) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setForm({ hoursSlept: '', quality: 'good', bedTime: '', wakeTime: '', notes: '' })
      fetchLogs()
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const deleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/sleep/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchLogs()
    } catch (err) { console.error(err) }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const chartData = [...logs].reverse().map((l) => ({
    day: new Date(l.date || l.createdAt).toLocaleDateString('en', { weekday: 'short' }),
    hours: l.hoursSlept
  }))

  const avgHours = logs.length ? (logs.reduce((s, l) => s + l.hoursSlept, 0) / logs.length).toFixed(1) : 0
  const lastLog = logs[0]

  return (
    <div className="bg-black min-h-screen flex text-white">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white/3 border-r border-white/10 flex flex-col min-h-screen fixed z-20`}>
        <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
          {sidebarOpen && <span className="text-xl font-black tracking-widest uppercase">Pulse<span className="text-green-400">Fit</span></span>}
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
                  ${active ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                <Icon size={20} className={active ? 'text-green-400' : 'group-hover:text-white'} />
                {sidebarOpen && <span className="text-sm font-medium">{link.label}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-6 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all w-full">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 flex-1 p-8`}>

        <div className="mb-10">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Track Your</p>
          <h1 className="text-3xl font-black uppercase flex items-center gap-3">
            <Moon size={28} className="text-green-400" /> Sleep
          </h1>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Last Night</p>
            <p className="text-4xl font-black" style={{ color: lastLog ? sleepColor(lastLog.hoursSlept) : '#6b7280' }}>
              {lastLog ? lastLog.hoursSlept : '--'} <span className="text-lg text-gray-500 font-normal">hrs</span>
            </p>
            {lastLog && <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: qualityColors[lastLog.quality] }}>{lastLog.quality} quality</p>}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">7-Day Average</p>
            <p className="text-4xl font-black" style={{ color: sleepColor(avgHours) }}>
              {avgHours} <span className="text-lg text-gray-500 font-normal">hrs</span>
            </p>
            <p className="text-xs text-gray-600 mt-2">Based on last {logs.length} logs</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Sleep Goal</p>
            <p className="text-4xl font-black text-green-400">8 <span className="text-lg text-gray-500 font-normal">hrs</span></p>
            <p className="text-xs text-gray-600 mt-2">Recommended daily sleep</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

          {/* Log form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
              <Plus size={18} className="text-green-400" /> Log Sleep
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Hours slept */}
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Hours Slept</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-green-400 font-black text-base pointer-events-none select-none">+</span>
                  <input
                    type="number" step="0.5" min="0" max="24"
                    value={form.hoursSlept}
                    onChange={e => setForm({ ...form, hoursSlept: e.target.value })}
                    placeholder="e.g. 7.5" required
                    className={`w-full bg-white/5 border rounded-xl pl-8 pr-20 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition
                      ${Number(form.hoursSlept) > 24
                        ? 'border-red-500/70 bg-red-500/10 focus:border-red-500'
                        : Number(form.hoursSlept) > 0
                          ? 'border-green-400/50 focus:border-green-400/70'
                          : 'border-white/10 focus:border-green-400/50'}`}
                  />
                  {Number(form.hoursSlept) > 24 && (
                    <span className="absolute right-4 text-red-400 text-xs font-bold">Max 24!</span>
                  )}
                </div>
                {Number(form.hoursSlept) > 24 && (
                  <p className="text-red-400 text-xs mt-1 ml-1">Hours slept cannot exceed 24 hours.</p>
                )}
              </div>

              {/* Quality */}
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Sleep Quality</label>
                <div className="grid grid-cols-4 gap-2">
                  {qualityOptions.map(q => (
                    <button key={q} type="button"
                      onClick={() => setForm({ ...form, quality: q })}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition border
                        ${form.quality === q ? 'border-transparent text-black' : 'border-white/10 text-gray-500 hover:text-white bg-white/5'}`}
                      style={form.quality === q ? { background: qualityColors[q] } : {}}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Bed Time</label>
                  <input type="time" value={form.bedTime}
                    onChange={e => setForm({ ...form, bedTime: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-400/50 transition mb-2"
                  />
                  <div className="grid grid-cols-3 gap-1">
                    {[['10 PM', '22:00'], ['11 PM', '23:00'], ['12 AM', '00:00']].map(([label, val]) => (
                      <button key={label} type="button"
                        onClick={() => setForm({ ...form, bedTime: val })}
                        className="text-xs bg-white/5 border border-white/10 rounded-lg py-1.5 text-gray-400 hover:text-green-400 hover:border-green-400/30 transition text-center">
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Wake Time</label>
                  <input type="time" value={form.wakeTime}
                    onChange={e => setForm({ ...form, wakeTime: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-400/50 transition mb-2"
                  />
                  <div className="grid grid-cols-3 gap-1">
                    {[['5 AM', '05:00'], ['6 AM', '06:00'], ['7 AM', '07:00']].map(([label, val]) => (
                      <button key={label} type="button"
                        onClick={() => setForm({ ...form, wakeTime: val })}
                        className="text-xs bg-white/5 border border-white/10 rounded-lg py-1.5 text-gray-400 hover:text-green-400 hover:border-green-400/30 transition text-center">
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Notes (optional)</label>
                <input type="text" value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="How did you sleep?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-400/50 transition"
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50 mt-2">
                {loading ? 'Logging...' : 'Log Sleep'}
              </button>
            </form>
          </div>

          {/* Recent logs */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-lg font-black uppercase mb-6">Recent Logs</h2>
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-600">
                <Moon size={40} className="mb-3 opacity-30" />
                <p className="text-sm">No sleep logs yet. Log your first night!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div key={log._id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${sleepColor(log.hoursSlept)}15`, border: `1px solid ${sleepColor(log.hoursSlept)}30` }}>
                        <Moon size={14} style={{ color: sleepColor(log.hoursSlept) }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{log.hoursSlept} hrs
                          <span className="ml-2 text-xs font-normal px-2 py-0.5 rounded-full"
                            style={{ background: `${qualityColors[log.quality]}15`, color: qualityColors[log.quality] }}>
                            {log.quality}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {log.bedTime && log.wakeTime ? `${log.bedTime} → ${log.wakeTime}` : new Date(log.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => deleteLog(log._id)} className="text-gray-600 hover:text-red-400 transition p-1">
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
          <h2 className="text-lg font-black uppercase mb-2">Sleep History</h2>
          <p className="text-gray-500 text-sm mb-6">Last 7 nights — green 7+hrs, yellow 6–7hrs, red under 6hrs</p>
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-600 text-sm">Log some sleep to see your chart</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barSize={36}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis domain={[0, 12]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }}
                  formatter={(v) => [`${v} hrs`, 'Sleep']}
                />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]} fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </main>
    </div>
  )
}