import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './component/Layout'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dasboard'
import WaterIntakePage from './pages/WaterIntakePage'
import SleepPage from './pages/SleepPage'
import BloodPressurePage from './pages/BloodPressurePage'
import ProfilePage from './pages/ProfilePage'
import WorkoutPage from './pages/WorkoutPage'
import GoalPage from './pages/GoalPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - no layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected routes - with layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/water" element={<Layout><WaterIntakePage /></Layout>} />
        <Route path="/sleep" element={<Layout><SleepPage /></Layout>} />
        <Route path="/blood-pressure" element={<Layout><BloodPressurePage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/WorkoutPage" element={<Layout><WorkoutPage /></Layout>} />
        <Route path="/GoalPage" element={<Layout><GoalPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App