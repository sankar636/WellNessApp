import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
      </Routes>
      <Footer />
    </AuthProvider>
  )
}


export default App
