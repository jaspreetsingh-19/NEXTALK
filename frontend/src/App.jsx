
import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import './App.css'

import VideoMeet from './pages/VideoMeet'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Features from './pages/Features'
import ProtectedRoute from './pages/ProtectedRoute'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/features' element={<Features />} />
        <Route path='/register' element={<Register />} />
        <Route path='/meeting/:meetingId' element={<ProtectedRoute><VideoMeet /></ProtectedRoute>} />

        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

    </>
  )
}

export default App
