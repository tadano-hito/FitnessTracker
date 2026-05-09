import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post('http://localhost:5003/api/auth/forgot-password', { email })
      setSuccess(true)
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
              <span className="text-4xl">📧</span>
            </div>
            <h2 className="text-4xl font-black uppercase text-white mb-3">Check Your Email</h2>
            <p className="text-gray-400 text-base mb-8">
              We sent a password reset link to <span className="text-green-400 font-semibold">{email}</span>. 
              It expires in 15 minutes.
            </p>
            <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition text-base">
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-black uppercase text-white mb-2">Forgot Password</h2>
            <p className="text-gray-500 text-base mb-10">
              Enter your email and we'll send you a reset link.
            </p>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-base placeholder-gray-600 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-400 text-black font-bold py-4 rounded-xl hover:bg-green-300 transition uppercase tracking-wider text-base shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-center text-gray-600 text-base mt-8">
              Remember your password?{' '}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}