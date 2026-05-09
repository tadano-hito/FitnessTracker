import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dasboard from './pages/Dasboard'
import WaterIntakePage from './pages/WaterIntakePage'
import SleepPage from './pages/SleepPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path="/dashboard" element={<Dasboard/>} />
        <Route path="/water" element={<WaterIntakePage/>} />
        <Route path="/sleep" element={<SleepPage />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App