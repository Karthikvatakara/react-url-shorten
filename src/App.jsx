import { useState } from 'react'
import Login from './components/Auth/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Auth/Signup'
import Landing from './components/Landing/Landing';
import ProtectedRoute from './components/protectedRoute';
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './components/PublicRoute';

function App() {

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
            <Route path='/login' element={
              <PublicRoute>
              <Login/>
              </PublicRoute>
              } />
            <Route path='/signup' element={
              <PublicRoute>
              <Signup/>
              </PublicRoute>
              } />
            <Route path='/' element={
              <ProtectedRoute>
              <Landing/>
              </ProtectedRoute>
              } />
        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
