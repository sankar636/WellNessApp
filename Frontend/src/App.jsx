import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
      {isHome && (
        <div className='min-h-[58.5vh] pt-20'>
          <Routes>
            {/* User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      )}
      
      <Footer />
    </AuthProvider>
  )
}

export default App