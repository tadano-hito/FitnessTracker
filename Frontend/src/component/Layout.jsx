import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  LayoutDashboard, Droplet, Moon, HeartPulse,
  Dumbbell, Apple, Target, User, LogOut, Menu, X
} from 'lucide-react'

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Droplet, label: 'Water Intake', path: '/water' },
  { icon: Moon, label: 'Sleep', path: '/sleep' },
  { icon: HeartPulse, label: 'Blood Pressure', path: '/blood-pressure' },
  { icon: Dumbbell, label: 'Workouts', path: '/WorkoutPage' },
  { icon: Apple, label: 'Nutrition', path: '/nutrition' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: User, label: 'Profile', path: '/profile' },
]

export default function Layout({ children }) {
  const { logout } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} min-h-screen flex transition-colors duration-300`}>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ${darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200'} border-r flex flex-col min-h-screen fixed z-20`}>
        <div className={`flex items-center justify-between px-4 py-5 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          {sidebarOpen && (
            <span className="text-lg font-black tracking-widest uppercase">
              Pulse<span className="text-green-400">Fit</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-green-400 transition ml-auto">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${active
                    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                    : darkMode
                      ? 'text-gray-500 hover:text-white hover:bg-white/5'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                <Icon size={18} className={active ? 'text-green-400' : ''} />
                {sidebarOpen && <span className="text-sm font-medium">{link.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Theme toggle + Logout */}
        <div className={`px-2 py-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'} flex flex-col gap-1`}>
          <button onClick={toggleTheme}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all w-full
              ${darkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
            <span className="text-base">{darkMode ? '☀️' : '🌙'}</span>
            {sidebarOpen && <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all w-full">
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Page content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300 flex-1 p-4 md:p-8 min-w-0`}>
        {children}
      </main>
    </div>
  )
}