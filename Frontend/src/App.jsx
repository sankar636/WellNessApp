import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AllSessions from './pages/AllSessions.jsx';
import MySessions from './pages/MySessions.jsx';
import AddSession from './pages/AddSession.jsx';
import SessionDetails from './pages/SessionDetails.jsx';

function App() {
  const location = useLocation();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    // Set isHome to false if current route is home ('/'), otherwise true
    setIsHome(location.pathname !== '/');
  }, [location.pathname]); // Re-run when route changes

  return (
    <AuthProvider>
      <Navbar />
      {isHome ? (
        <div className='min-h-[70vh] pt-20'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sessions" element={<AllSessions />} />
            <Route path="/my-sessions" element={<MySessions />} />
            <Route path="/add-session" element={<AddSession />} />
            <Route path="/session/:id" element={<SessionDetails />} />
          </Routes>
        </div>
      ) :
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>}
      <Footer />
    </AuthProvider>
  )
}

export default App