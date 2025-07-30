import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/AuthContext.jsx";
import SearchBar from "./SearchBar.jsx";
import Profile from "./Profile.jsx";

const Navbar = () => {
    const { user, setUser } = useContext(UserDataContext);
    console.log(user);
    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Sessions', path: '/sessions' },
        { name: 'My Sessions', path: '/my-sessions' },
    ];
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleLogout = () => {
        // Implement your logout logic here
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-16 transition-all duration-200 z-50 ${isScrolled ? "bg-white shadow-md py-3 text-black" : "py-4 md:py-6 text-white"}`}>
            {/* Logo */}
            <Link to='/' className="flex items-center">
                <h1 className="font-bold text-2xl">
                    <span className="text-blue-500">Well</span>
                    <span className="text-blue-700">Ness</span>
                </h1>
            </Link>

            {/* Search Bar - Centered */}
            <div className={`hidden md:flex mx-4 flex-1 max-w-md text-black  ${isScrolled ? "text-black" : "text-white"}`}>
                <SearchBar />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link, i) => (
                    <Link 
                        key={i} 
                        to={link.path} 
                        className={`text-black hover:text-blue-600 transition-colors ${isScrolled ? "text-black" : "text-white"}`}
                    >
                        {link.name}
                    </Link>
                ))}

                {/* Auth Buttons */}
                {user && user.username !== "" ? (
                    <>
                        <Profile user={user} onLogout={handleLogout} />
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/signup" 
                            className={`hover:text-blue-600 transition-colors ${isScrolled ? "text-black" : "text-white"}`}
                        >
                            Sign Up
                        </Link>
                        <Link 
                            to="/login" 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-gray-200 transition-all duration-200 z-50 flex flex-col items-center justify-center space-y-6 pt-16">
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="absolute top-4 right-4 text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {navLinks.map((link, i) => (
                        <Link 
                            key={i} 
                            to={link.path} 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-700 text-lg hover:text-blue-600 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex flex-col items-center space-y-4 w-full px-4">
                        {user ? (
                            <>
                                <Profile user={user} onLogout={handleLogout} mobile />
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md w-full max-w-xs hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/signup" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-gray-700 text-lg hover:text-blue-600 transition-colors"
                                >
                                    Sign Up
                                </Link>
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md w-full max-w-xs text-center hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;