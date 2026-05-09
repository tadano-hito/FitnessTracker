import { Link } from 'react-router-dom'
import { 
  Droplet, 
  Moon, 
  HeartPulse, 
  Dumbbell, 
  Apple, 
  Target 
} from 'lucide-react'

const features = [
  {
    icon: Droplet,
    title: 'Water Intake',
    desc: 'Track your daily hydration with animated progress rings and smart reminders.'
  },
  {
    icon: Moon,
    title: 'Sleep Tracking',
    desc: 'Monitor your sleep quality and duration with beautiful 7-day charts.'
  },
  {
    icon: HeartPulse,
    title: 'Blood Pressure',
    desc: 'Log and visualize your BP readings with color-coded health zones.'
  },
  {
    icon: Dumbbell,
    title: 'Workout Tracker',
    desc: 'Create and manage workout routines with sets, reps, and weights.'
  },
  {
    icon: Apple,
    title: 'Nutrition Log',
    desc: 'Track calories and macros with a comprehensive food database.'
  },
  {
    icon: Target,
    title: 'Goal System',
    desc: 'Set weight loss or gain targets and track your progress over time.'
  },
]

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-xl font-bold tracking-widest uppercase text-white">
          Pulse<span className="text-green-400">Fit</span>
        </span>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm bg-green-400 text-black font-semibold px-5 py-2 rounded-full hover:bg-green-300 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <span className="text-xs tracking-widest uppercase text-green-400 mb-4 border border-green-400/30 px-4 py-1 rounded-full">
          Your health. Your data. Your control.
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Know Your <br />
          <span className="text-green-400">Body Better</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          PulseFit gives you a complete picture of your health — sleep, hydration,
          blood pressure, workouts, and nutrition — all in one place.
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-green-400 text-black font-bold px-8 py-3 rounded-full hover:bg-green-300 transition text-sm uppercase tracking-wider"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-white/20 text-white font-bold px-8 py-3 rounded-full hover:border-white/50 transition text-sm uppercase tracking-wider"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-black text-green-400">6+</p>
            <p className="text-gray-500 text-sm mt-1">Health Modules</p>
          </div>
          <div>
            <p className="text-3xl font-black text-green-400">100%</p>
            <p className="text-gray-500 text-sm mt-1">Data Privacy</p>
          </div>
          <div>
            <p className="text-3xl font-black text-green-400">24/7</p>
            <p className="text-gray-500 text-sm mt-1">Progress Tracking</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-center mb-4">
            Everything You <span className="text-green-400">Need</span>
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            Built for people who take their health seriously. No fluff, just data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={i}
                  className="group border border-white/10 rounded-3xl p-8 hover:border-green-500/50 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 flex items-center justify-center mb-6 group-hover:border-green-400/50 transition-all">
                    <Icon 
                      size={38} 
                      className="text-green-400 drop-shadow-[0_0_12px_rgb(74,222,128)]" 
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mt-2 mb-3">{f.title}</h3>
                  <p className="text-gray-400 text-[15px] leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
          Ready to <span className="text-green-400">Level Up?</span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-md mx-auto">
          Join PulseFit today and start understanding your body like never before.
        </p>
        <Link
          to="/register"
          className="bg-green-400 text-black font-bold px-10 py-4 rounded-full hover:bg-green-300 transition text-sm uppercase tracking-wider"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-600 text-sm">
        © 2026 PulseFit. Built with 💚 by Team PulseFit.
      </footer>

    </div>
  )
}