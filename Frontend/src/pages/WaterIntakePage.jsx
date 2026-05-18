import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Droplet, Plus, Trash2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom'

const quickAmounts = [150, 250, 350, 500]

export default function WaterIntakePage() {
  const { token }    = useAuth()
  const { darkMode } = useTheme()
  const navigate     = useNavigate()

  const [logs,         setLogs]         = useState([])
  const [total,        setTotal]        = useState(0)
  const [goal]                          = useState(2500)
  const [customAmount, setCustomAmount] = useState('')
  const [loading,      setLoading]      = useState(false)

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchWater()
  }, [token, navigate])

  const fetchWater = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/water', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLogs(data.logs)
      setTotal(data.total)
    } catch (err) { console.error(err) }
  }

  const logWater = async (amount) => {
    if (!amount || amount <= 0) return
    setLoading(true)
    try {
      await axios.post(
        'http://localhost:5003/api/water',
        { amount: Number(amount), unit: 'ml' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCustomAmount('')
      fetchWater()
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const deleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/water/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchWater()
    } catch (err) { console.error(err) }
  }

  // Ring calculation
  const pct  = Math.min((total / goal) * 100, 100)
  const r    = 80
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  const ringColor =
    pct >= 100 ? '#4ade80' :
    pct >= 60  ? '#4ade80' :
    pct >= 30  ? '#facc15' : '#f87171'

  // Chart data
  const chartData = quickAmounts.map(a => ({
    amount: `${a}ml`,
    count:  logs.filter(l => l.amount === a).length,
  }))

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // ── Reusable theme classes ──────────────────────────────
  const page = darkMode ? 'bg-black text-white'         : 'bg-gray-50 text-gray-900'
  const card = darkMode ? 'bg-white/5 border-white/10'  : 'bg-white border-gray-200'
  const inp  = darkMode
    ? 'bg-white/5 border-white/10 text-white placeholder-gray-600'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  const logRow = darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
  const iconBox = darkMode
    ? 'bg-green-400/10 border-green-400/20'
    : 'bg-green-100 border-green-300'
  const quickBtn = darkMode
    ? 'bg-green-400/10 border-green-400/20 text-green-400 hover:bg-green-400/20'
    : 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'
  const tooltipStyle = darkMode
    ? { background: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }
    : { background: '#fff', border: '1px solid #e5e7eb',  borderRadius: '12px', color: '#111' }
  const ringBg   = darkMode ? '#ffffff08' : '#e5e7eb'
  const textFill = darkMode ? '#fff'      : '#111827'
  const subFill  = darkMode ? '#6b7280'   : '#9ca3af'

  return (
    <div className={`${page} min-h-screen`}>
      <main className="p-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Track Your</p>
          <h1 className="text-3xl font-black uppercase flex items-center gap-3">
            <Droplet size={28} className="text-green-400" />
            Water Intake
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

          {/* Ring + logging */}
          <div className={`${card} border rounded-3xl p-8 flex flex-col items-center`}>

            {/* Animated Ring */}
            <svg width="200" height="200" className="mb-6">
              <circle cx="100" cy="100" r={r} fill="none" stroke={ringBg} strokeWidth="14" />
              <circle
                cx="100" cy="100" r={r} fill="none"
                stroke={ringColor}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circ}`}
                strokeDashoffset={circ * 0.25}
                style={{ transition: 'stroke-dasharray 0.8s ease', filter: 'drop-shadow(0 0 10px #4ade80)' }}
              />
              <text x="100" y="90"  textAnchor="middle" fill={textFill} fontSize="24" fontWeight="bold">{total}ml</text>
              <text x="100" y="112" textAnchor="middle" fill={subFill}  fontSize="13">of {goal}ml</text>
              <text x="100" y="132" textAnchor="middle" fill="#4ade80"  fontSize="13" fontWeight="bold">{Math.round(pct)}%</text>
            </svg>

            {/* Status */}
            <p className={`text-sm font-bold uppercase tracking-wider mb-6 ${
              pct >= 100 ? 'text-green-400' : pct >= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {pct >= 100 ? '🎉 Goal Reached!' : pct >= 60 ? '💧 Almost there!' : '⚠️ Drink more water!'}
            </p>

            {/* Quick log buttons */}
            <div className="grid grid-cols-4 gap-3 w-full mb-4">
              {quickAmounts.map(amt => (
                <button key={amt} onClick={() => logWater(amt)} disabled={loading}
                  className={`${quickBtn} border font-bold py-3 rounded-xl transition text-sm disabled:opacity-50`}>
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
                className={`flex-1 ${inp} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`}
              />
              <button onClick={() => logWater(customAmount)} disabled={loading || !customAmount}
                className="bg-green-400 text-black font-bold px-5 py-3 rounded-xl hover:bg-green-300 transition disabled:opacity-50">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Today's logs */}
          <div className={`${card} border rounded-3xl p-8`}>
            <h2 className="text-lg font-black uppercase mb-6">Today's Logs</h2>

            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                <Droplet size={40} className="mb-3 opacity-30" />
                <p className="text-sm">No logs yet today. Start drinking!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {[...logs].reverse().map(log => (
                  <div key={log._id}
                    className={`${logRow} border flex items-center justify-between rounded-xl px-4 py-3`}>
                    <div className="flex items-center gap-3">
                      <div className={`${iconBox} border w-8 h-8 rounded-lg flex items-center justify-center`}>
                        <Droplet size={14} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{log.amount}ml</p>
                        <p className="text-xs text-gray-500">{formatTime(log.date || log.createdAt)}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteLog(log._id)}
                      className="text-gray-500 hover:text-red-400 transition p-1">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className={`${card} border rounded-3xl p-8`}>
          <h2 className="text-lg font-black uppercase mb-2">Log Breakdown</h2>
          <p className="text-gray-500 text-sm mb-6">How many times you logged each amount today</p>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barSize={40}>
              <XAxis dataKey="amount" axisLine={false} tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => [`${v} times`, 'Logged']} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </main>
    </div>
  )
}