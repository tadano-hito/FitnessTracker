import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const nameRegex = /^[a-zA-Z\s]{3,}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/

    if (!nameRegex.test(form.name)) {
      return setError('Name must be at least 3 characters and contain only letters')
    }
    if (!emailRegex.test(form.email)) {
      return setError('Please enter a valid email address')
    }
    if (!passwordRegex.test(form.password)) {
      return setError('Password must be at least 6 characters and include uppercase, lowercase, and a number')
    }
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5003/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      })
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
        <h2 className="text-4xl font-black uppercase text-white mb-2">Create Account</h2>
        <p className="text-gray-500 text-base mb-10">Start tracking your health today.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-sm uppercase tracking-widest text-gray-500 mb-2 block">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Abdullah Saleem"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-base placeholder-gray-600 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition"
            />
          </div>

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

          <div>
            <label className="text-sm uppercase tracking-widest text-gray-500 mb-2 block">Confirm Password</label>
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
            className="w-full bg-green-400 text-black font-bold py-4 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-base shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-base mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}