import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { User, Camera, Save } from 'lucide-react'

const getBMI = (weight, height) => {
  if (!weight || !height) return null
  const h = height / 100
  return (weight / (h * h)).toFixed(1)
}

const getBMIStatus = (bmi) => {
  if (!bmi) return null
  if (bmi < 18.5) return { label: 'Underweight', color: '#60a5fa' }
  if (bmi < 25) return { label: 'Normal', color: '#4ade80' }
  if (bmi < 30) return { label: 'Overweight', color: '#facc15' }
  return { label: 'Obese', color: '#f87171' }
}

export default function ProfilePage() {
  const { user, token, login } = useAuth()
  const { darkMode } = useTheme()
  const navigate = useNavigate()
  const fileRef = useRef()

  const [form, setForm] = useState({ name: '', age: '', weight: '', height: '', gender: '' })
  const [profilePicture, setProfilePicture] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchProfile()
  }, [token, navigate])

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setForm({ name: data.name || '', age: data.age || '', weight: data.weight || '', height: data.height || '', gender: data.gender || '' })
      setProfilePicture(data.profilePicture || '')
    } catch (err) { console.error(err) }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPreviewUrl(URL.createObjectURL(file))
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('picture', file)
      const { data } = await axios.post('http://localhost:5003/api/auth/profile/picture',
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      )
      setProfilePicture(data.profilePicture)
      setSuccess('Profile picture updated!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) { setError('Failed to upload image') }
    finally { setUploading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const { data } = await axios.put('http://localhost:5003/api/auth/profile', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      login(data, token)
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) { setError('Failed to update profile') }
    finally { setSaving(false) }
  }

  const bmi = getBMI(form.weight, form.height)
  const bmiStatus = getBMIStatus(bmi)
  const bmiPct = bmi ? Math.min((bmi / 40) * 100, 100) : 0

  const card = `${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl`
  const input = `w-full ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400/50 transition`

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Account</p>
        <h1 className="text-2xl md:text-3xl font-black uppercase flex items-center gap-3">
          <User size={26} className="text-green-400" /> My Profile
        </h1>
      </div>

      {success && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl mb-6">✓ {success}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left */}
        <div className="xl:col-span-1 flex flex-col gap-4">

          {/* Avatar */}
          <div className={`${card} p-6 flex flex-col items-center text-center`}>
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full border-2 border-green-400/30 overflow-hidden bg-white/5 flex items-center justify-center">
                {previewUrl || profilePicture ? (
                  <img src={previewUrl || profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-gray-600" />
                )}
              </div>
              <button onClick={() => fileRef.current.click()} disabled={uploading}
                className="absolute bottom-0 right-0 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center hover:bg-green-300 transition shadow-lg disabled:opacity-50">
                {uploading
                  ? <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  : <Camera size={14} className="text-black" />
                }
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
            <h2 className="text-lg font-black uppercase">{form.name || user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-gray-600 text-xs mt-2">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en', { month: 'long', year: 'numeric' }) : 'recently'}
            </p>
            <button onClick={() => fileRef.current.click()}
              className="mt-4 text-xs text-green-400 hover:text-green-300 transition font-bold uppercase tracking-wider">
              Change Photo
            </button>
          </div>

          {/* BMI */}
          {bmi && (
            <div className={`${card} p-6`} style={{ borderColor: `${bmiStatus?.color}30`, background: `${bmiStatus?.color}08` }}>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">BMI Calculator</p>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-4xl font-black" style={{ color: bmiStatus?.color }}>{bmi}</p>
                <p className="text-sm text-gray-500 mb-1">kg/m²</p>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: bmiStatus?.color }}>{bmiStatus?.label}</p>
              <div className="relative w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: '#ffffff10' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${bmiPct}%`, background: bmiStatus?.color, boxShadow: `0 0 8px ${bmiStatus?.color}` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Obese</span>
              </div>
              <p className="text-xs text-gray-600 mt-3">Based on your height & weight</p>
            </div>
          )}

          {/* Quick stats */}
          {(form.weight || form.height || form.age) && (
            <div className={`${card} p-6`}>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">My Stats</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {form.age && <div><p className="text-2xl font-black text-green-400">{form.age}</p><p className="text-xs text-gray-500">Age</p></div>}
                {form.weight && <div><p className="text-2xl font-black text-green-400">{form.weight}</p><p className="text-xs text-gray-500">kg</p></div>}
                {form.height && <div><p className="text-2xl font-black text-green-400">{form.height}</p><p className="text-xs text-gray-500">cm</p></div>}
              </div>
            </div>
          )}
        </div>

        {/* Right — Edit form */}
        <div className={`xl:col-span-2 ${card} p-6 md:p-8`}>
          <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
            <Save size={18} className="text-green-400" /> Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Abdullah Saleem" className={input} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Age</label>
                <input type="number" min="1" max="120" value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                  placeholder="22" className={input} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  {['male', 'female', 'other'].map(g => (
                    <button key={g} type="button" onClick={() => setForm({ ...form, gender: g })}
                      className={`py-3 rounded-xl text-xs font-bold uppercase transition border
                        ${form.gender === g ? 'bg-green-400 border-green-400 text-black'
                          : darkMode ? 'border-white/10 text-gray-500 hover:text-white bg-white/5'
                          : 'border-gray-200 text-gray-500 hover:text-gray-900 bg-gray-50'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Weight (kg)</label>
                <input type="number" min="1" max="500" step="0.1" value={form.weight}
                  onChange={e => setForm({ ...form, weight: e.target.value })}
                  placeholder="70" className={input} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">Height (cm)</label>
                <input type="number" min="1" max="300" value={form.height}
                  onChange={e => setForm({ ...form, height: e.target.value })}
                  placeholder="175" className={input} />
              </div>
            </div>

            {form.weight && form.height && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{ background: `${bmiStatus?.color}10`, borderColor: `${bmiStatus?.color}30` }}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: bmiStatus?.color }} />
                <p className="text-sm font-bold" style={{ color: bmiStatus?.color }}>BMI: {bmi} — {bmiStatus?.label}</p>
              </div>
            )}

            <button type="submit" disabled={saving}
              className="w-full bg-green-400 text-black font-bold py-3 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50 mt-2">
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}