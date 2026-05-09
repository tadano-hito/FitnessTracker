import { Link } from 'react-router-dom'
import { 
  Droplet, Moon, HeartPulse, Dumbbell, Apple, Target 
} from 'lucide-react'

const features = [
  { icon: Droplet, title: 'Water Intake', desc: 'Track your daily hydration with animated progress rings and smart reminders.' },
  { icon: Moon, title: 'Sleep Tracking', desc: 'Monitor your sleep quality and duration with beautiful 7-day charts.' },
  { icon: HeartPulse, title: 'Blood Pressure', desc: 'Log and visualize your BP readings with color-coded health zones.' },
  { icon: Dumbbell, title: 'Workout Tracker', desc: 'Create and manage workout routines with sets, reps, and weights.' },
  { icon: Apple, title: 'Nutrition Log', desc: 'Track calories and macros with a comprehensive food database.' },
  { icon: Target, title: 'Goal System', desc: 'Set weight loss or gain targets and track your progress over time.' },
]

const ticker = ['SLEEP', 'HYDRATION', 'BLOOD PRESSURE', 'WORKOUTS', 'NUTRITION', 'RECOVERY', 'GOALS', 'PROGRESS']

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10 relative z-10">
        <span className="text-3xl font-black tracking-widest uppercase text-white">
          Pulse<span className="text-green-400">Fit</span>
        </span>
        <div className="flex items-center gap-8">
          <Link to="/login" className="text-base text-gray-400 hover:text-white transition font-medium">Login</Link>
          <Link to="/register" className="text-base bg-green-400 text-black font-bold px-7 py-3 rounded-full hover:bg-green-300 transition shadow-[0_0_20px_rgba(74,222,128,0.4)]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        
        {/* Glow background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-green-500/10 blur-[120px]" />
        </div>
        <div className="absolute top-10 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[250px] h-[250px] rounded-full bg-green-400/5 blur-[80px] pointer-events-none" />

        {/* Content */}
        <span className="relative z-10 text-xs tracking-widest uppercase text-green-400 mb-4 border border-green-400/30 px-4 py-1 rounded-full">
          Your health. Your data. Your control.
        </span>
        <h1 className="relative z-10 text-6xl md:text-8xl font-black uppercase tracking-tight leading-none mb-6">
          Know Your <br />
          <span className="text-green-400 drop-shadow-[0_0_40px_rgba(74,222,128,0.5)]">Body Better</span>
        </h1>
        <p className="relative z-10 text-gray-400 text-xl max-w-2xl mb-10">
          PulseFit gives you a complete picture of your health — sleep, hydration,
          blood pressure, workouts, and nutrition — all in one place.
        </p>
        <div className="relative z-10 flex gap-4">
          <Link to="/register" className="bg-green-400 text-black font-bold px-10 py-4 rounded-full hover:bg-green-300 transition text-base uppercase tracking-wider shadow-[0_0_20px_rgba(74,222,128,0.4)]">
            Get Started
          </Link>
          <Link to="/login" className="border border-white/20 text-white font-bold px-10 py-4 rounded-full hover:border-white/50 transition text-base uppercase tracking-wider">
            Login
          </Link>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="border-y border-white/10 py-4 overflow-hidden bg-black/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} className="flex items-center gap-4 mx-6 text-sm font-bold tracking-widest uppercase text-gray-500">
              {item}
              <span className="text-green-400 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <section className="border-b border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-6xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.6)]">6+</p>
            <p className="text-gray-400 text-base mt-2 font-medium">Health Modules</p>
          </div>
          <div>
            <p className="text-6xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.6)]">100%</p>
            <p className="text-gray-400 text-base mt-2 font-medium">Data Privacy</p>
          </div>
          <div>
            <p className="text-6xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.6)]">24/7</p>
            <p className="text-gray-400 text-base mt-2 font-medium">Progress Tracking</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-4">
            Everything You <span className="text-green-400">Need</span>
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            Built for people who take their health seriously. No fluff, just data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="group border border-white/10 rounded-3xl p-10 hover:border-green-500/50 hover:bg-white/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.05)]">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 flex items-center justify-center mb-8 group-hover:border-green-400/50 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all">
                    <Icon size={46} className="text-green-400 drop-shadow-[0_0_12px_rgb(74,222,128)]" />
                  </div>
                  <h3 className="text-2xl font-bold mt-2 mb-4">{f.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 text-center border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] rounded-full bg-green-500/8 blur-[100px]" />
        </div>
        <h2 className="relative z-10 text-5xl md:text-7xl font-black uppercase mb-6">
          Ready to <span className="text-green-400 drop-shadow-[0_0_40px_rgba(74,222,128,0.5)]">Level Up?</span>
        </h2>
        <p className="relative z-10 text-gray-400 mb-10 max-w-md mx-auto">
          Join PulseFit today and start understanding your body like never before.
        </p>
        <Link to="/register" className="relative z-10 bg-green-400 text-black font-bold px-10 py-4 rounded-full hover:bg-green-300 transition text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(74,222,128,0.4)]">
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