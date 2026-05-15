import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { GoogleLogin } from '@react-oauth/google'


export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5003/api/auth/login', form)
      login(data, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />

      {/* Logo */}
      <Link to="/" className="text-5xl font-black tracking-widest uppercase text-white mb-12 relative z-10">
        Pulse<span className="text-green-400">Fit</span>
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
        <h2 className="text-4xl font-black uppercase text-white mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-base mb-10">Log in to continue your fitness journey.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-base px-5 py-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-sm uppercase tracking-widest text-gray-500 mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-base placeholder-gray-600 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition"
            />
          </div>

          <div>
            <label className="text-sm uppercase tracking-widest text-gray-500 mb-2 block">Password</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 text-black font-bold py-4 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-base shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-6 flex flex-col items-center gap-4">
  <div className="text-gray-600 text-sm">OR</div>

  <div className="w-full flex justify-center">
  <div className="w-full max-w-[320px] bg-white/5 border border-white/10 rounded-xl p-2 hover:border-green-400/30 hover:bg-white/10 transition duration-300 shadow-[0_0_20px_rgba(74,222,128,0.08)]">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const { data } = await axios.post(
              'http://localhost:5003/api/auth/google',
              {
                token: credentialResponse.credential,
              }
            )

            login(data, data.token)
            navigate('/dashboard')
          } catch (err) {
            setError(err.response?.data?.message || 'Google login failed')
          }
        }}
        onError={() => setError('Google login failed')}
      />
    </div>
  </div>
</div>
        </form>
        <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm text-gray-200 hover:text-green-400 transition">
                Forgot password?
            </Link>
        </div>

        <p className="text-center text-gray-600 text-base mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-400 hover:text-green-300 font-semibold transition">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}