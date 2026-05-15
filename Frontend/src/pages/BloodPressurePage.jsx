import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { HeartPulse, Trash2, Plus } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const getBPStatus = (s, d) => {
  if (s < 120 && d < 80) return { label: 'Normal', color: '#4ade80', bg: '#4ade8015', border: '#4ade8030' }
  if (s < 130 && d < 80) return { label: 'Elevated', color: '#facc15', bg: '#facc1515', border: '#facc1530' }
  if (s < 140 || d < 90) return { label: 'High Stage 1', color: '#fb923c', bg: '#fb923c15', border: '#fb923c30' }
  return { label: 'High Stage 2', color: '#f87171', bg: '#f8717115', border: '#f8717130' }
}

export default function BloodPressurePage() {
  const { token } = useAuth()
  const { darkMode } = useTheme()
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ systolic: '', diastolic: '', pulse: '', notes: '' })

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/bp', {
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
    setLoading(true)
    try {
      await axios.post('http://localhost:5003/api/bp',
        { ...form, systolic: Number(form.systolic), diastolic: Number(form.diastolic), pulse: Number(form.pulse) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setForm({ systolic: '', diastolic: '', pulse: '', notes: '' })
      fetchLogs()
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const deleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/bp/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchLogs()
    } catch (err) { console.error(err) }
  }

  const lastLog = logs[0]
  const lastStatus = lastLog ? getBPStatus(lastLog.systolic, lastLog.diastolic) : null
  const chartData = [...logs].reverse().map(l => ({
    date: new Date(l.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    systolic: l.systolic,
    diastolic: l.diastolic,
  }))

  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`
  const input = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Track Your</p>
        <h1 className="text-2xl md:text-3xl font-black uppercase flex items-center gap-3">
          <HeartPulse size={26} className="text-green-400" /> Blood Pressure
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className={`col-span-2 md:col-span-1 ${card} p-4`}
          style={lastStatus ? { background: lastStatus.bg, borderColor: lastStatus.border } : {}}>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Last Reading</p>
          <p className="text-3xl font-black" style={{ color: lastStatus?.color || '#6b7280' }}>
            {lastLog ? `${lastLog.systolic}/${lastLog.diastolic}` : '--/--'}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: lastStatus?.color || '#6b7280' }}>
            {lastStatus?.label || 'No data'}
          </p>
        </div>
        <div className={`${card} p-4`}>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Systolic</p>
          <p className="text-3xl font-black">{lastLog?.systolic || '--'}</p>
          <p className="text-xs text-gray-500 mt-1">mmHg</p>
        </div>
        <div className={`${card} p-4`}>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Diastolic</p>
          <p className="text-3xl font-black">{lastLog?.diastolic || '--'}</p>
          <p className="text-xs text-gray-500 mt-1">mmHg</p>
        </div>
        <div className={`${card} p-4`}>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Pulse</p>
          <p className="text-3xl font-black">{lastLog?.pulse || '--'}</p>
          <p className="text-xs text-gray-500 mt-1">bpm</p>
        </div>
      </div>

      {/* BP zones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {[
          { label: 'Normal', range: '< 120/80', color: '#4ade80' },
          { label: 'Elevated', range: '120–129 / < 80', color: '#facc15' },
          { label: 'High Stage 1', range: '130–139 / 80–89', color: '#fb923c' },
          { label: 'High Stage 2', range: '≥ 140 / ≥ 90', color: '#f87171' },
        ].map(z => (
          <div key={z.label} className={`flex items-center gap-2 ${card} px-3 py-2`}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: z.color }} />
            <div>
              <p className="text-xs font-bold" style={{ color: z.color }}>{z.label}</p>
              <p className="text-xs text-gray-500">{z.range}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        {/* Log form */}
        <div className={`${card} p-6`}>
          <h2 className="text-base font-black uppercase mb-5 flex items-center gap-2">
            <Plus size={16} className="text-green-400" /> Log Reading
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-1.5 block">Systolic</label>
                <input type="number" min="60" max="250" value={form.systolic}
                  onChange={e => setForm({ ...form, systolic: e.target.value })}
                  placeholder="120" required
                  className={`w-full ${darkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none transition
                    ${Number(form.systolic) >= 140 ? 'border-red-500/50 bg-red-500/5'
                      : Number(form.systolic) >= 130 ? 'border-orange-400/50 bg-white/5'
                      : Number(form.systolic) >= 120 ? 'border-yellow-400/50 bg-white/5'
                      : form.systolic ? 'border-green-400/50 bg-white/5'
                      : darkMode ? 'border-white/10 bg-white/5 focus:border-green-400/50' : 'border-gray-200 bg-gray-50'}`}
                />
                <p className="text-xs mt-1 text-gray-500">Normal: &lt; 120</p>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-1.5 block">Diastolic</label>
                <input type="number" min="40" max="150" value={form.diastolic}
                  onChange={e => setForm({ ...form, diastolic: e.target.value })}
                  placeholder="80" required
                  className={`w-full ${darkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none transition
                    ${Number(form.diastolic) >= 90 ? 'border-red-500/50 bg-red-500/5'
                      : Number(form.diastolic) >= 80 ? 'border-orange-400/50 bg-white/5'
                      : form.diastolic ? 'border-green-400/50 bg-white/5'
                      : darkMode ? 'border-white/10 bg-white/5 focus:border-green-400/50' : 'border-gray-200 bg-gray-50'}`}
                />
                <p className="text-xs mt-1 text-gray-500">Normal: &lt; 80</p>
              </div>
            </div>

            {form.systolic && form.diastolic && (() => {
              const s = getBPStatus(Number(form.systolic), Number(form.diastolic))
              return (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{ background: s.bg, borderColor: s.border }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <p className="text-sm font-bold" style={{ color: s.color }}>{s.label}</p>
                  <p className="text-xs text-gray-500 ml-auto">{form.systolic}/{form.diastolic} mmHg</p>
                </div>
              )
            })()}

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-1.5 block">Pulse (bpm)</label>
              <input type="number" min="30" max="220" value={form.pulse}
                onChange={e => setForm({ ...form, pulse: e.target.value })}
                placeholder="72" className={input} />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-1.5 block">Notes (optional)</label>
              <input type="text" value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. After exercise, morning reading..." className={input} />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50">
              {loading ? 'Logging...' : 'Log Reading'}
            </button>
          </form>
        </div>

        {/* Recent logs */}
        <div className={`${card} p-6`}>
          <h2 className="text-base font-black uppercase mb-5">Recent Readings</h2>
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <HeartPulse size={40} className="mb-3 opacity-30" />
              <p className="text-sm">No readings yet. Log your first!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
              {logs.map(log => {
                const s = getBPStatus(log.systolic, log.diastolic)
                return (
                  <div key={log._id} className="flex items-center justify-between rounded-xl px-4 py-3 border"
                    style={{ background: s.bg, borderColor: s.border }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                        <HeartPulse size={14} style={{ color: s.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black" style={{ color: s.color }}>
                          {log.systolic}/{log.diastolic}
                          <span className="ml-2 text-xs font-normal text-gray-400">mmHg</span>
                          {log.pulse && <span className="ml-2 text-xs text-gray-500">· {log.pulse} bpm</span>}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {s.label} · {new Date(log.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {log.notes && <p className="text-xs text-gray-600 truncate">{log.notes}</p>}
                      </div>
                    </div>
                    <button onClick={() => deleteLog(log._id)} className="text-gray-500 hover:text-red-400 transition p-1 flex-shrink-0 ml-2">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className={`${card} p-6`}>
        <h2 className="text-base font-black uppercase mb-1">BP History</h2>
        <p className="text-gray-500 text-xs mb-5">Systolic vs Diastolic over time</p>
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-500 text-sm">Log readings to see your chart</div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis domain={[40, 180]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: darkMode ? '#111' : '#fff', border: '1px solid #ffffff15', borderRadius: '12px', color: darkMode ? '#fff' : '#111', fontSize: '12px' }}
                labelStyle={{ color: darkMode ? '#fff' : '#111' }}
                itemStyle={{ color: darkMode ? '#fff' : '#111' }}
                formatter={(v, n) => [`${v} mmHg`, n]}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
              <Line type="monotone" dataKey="systolic" stroke="#f87171" strokeWidth={2} dot={{ r: 4, fill: '#f87171' }} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#4ade80" strokeWidth={2} dot={{ r: 4, fill: '#4ade80' }} name="Diastolic" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}