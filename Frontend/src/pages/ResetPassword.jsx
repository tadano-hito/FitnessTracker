import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ShieldCheck } from 'lucide-react'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
    if (!passwordRegex.test(form.password)) {
      return setError('Password must be at least 6 characters with uppercase, lowercase, and a number')
    }
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)
    try {
      await axios.post(`http://localhost:5003/api/auth/reset-password/${token}`, {
        password: form.password
      })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />

      <Link to="/" className="text-5xl font-black tracking-widest uppercase text-white mb-12 relative z-10">
        Pulse<span className="text-green-400">Fit</span>
      </Link>

      <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
        {success ? (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mx-auto mb-6">
               <ShieldCheck size={42} className="text-green-400 drop-shadow-[0_0_12px_rgb(74,222,128)]" />
            </div>
            <h2 className="text-4xl font-black uppercase text-white mb-3">Password Reset!</h2>
            <p className="text-gray-400 text-base mb-2">
              Your password has been updated successfully.
            </p>
            <p className="text-gray-600 text-sm">Redirecting to login in 3 seconds...</p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-black uppercase text-white mb-2">Reset Password</h2>
            <p className="text-gray-500 text-base mb-10">Enter your new password below.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-base px-5 py-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="text-sm uppercase tracking-widest text-gray-500 mb-2 block">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-base placeholder-gray-600 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition"
                />
              </div>

              <div>
                <label className="text-sm uppercase tracking-widest text-gray-500 mb-2 block">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-base placeholder-gray-600 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-400 text-black font-bold py-4 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-base shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}