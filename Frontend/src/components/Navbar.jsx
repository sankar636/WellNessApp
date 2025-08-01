import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/AuthContext.jsx";
import SearchBar from "./SearchBar.jsx";
import Profile from "./Profile.jsx";
import axios from "axios";

const Navbar = () => {
    const { user, logoutUser, loading } = useContext(UserDataContext);
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

    const handleLogout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        try {
            await axios.post(`${BASE_URL}/auth/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            logoutUser();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) {
        return (
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 py-4 z-50 bg-white shadow-md`}>
                <div className="flex items-center space-x-4">
                    <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </nav>
        );
    }

    return (
        <nav className={`fixed top-0 left-0 w-full flex text-black items-center justify-between px-4 md:px-8 lg:px-16 py-4 transition-all duration-0 z-50 ${isScrolled ? "bg-white shadow-md" : ""}`}>
            <Link to='/' className="flex items-center">
                <h1 className="font-bold text-2xl">
                    <span className="text-blue-500">Well</span>
                    <span className="text-blue-700">Ness</span>
                </h1>
            </Link>

            <div className={`hidden md:flex mx-4 flex-1 md:max-w-md`}>
                <SearchBar />
            </div>

            <div className="hidden sm:flex items-center gap-6">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className={`text-black hover:text-blue-600 transition-colors`}
                    >
                        {link.name}
                    </Link>
                ))}

                {user._id ? (
                    <Profile user={user} onLogout={handleLogout} />
                ) : (
                    <>
                        <Link
                            to="/signup"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
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

            <div className="flex items-center gap-4 md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

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
                        {user._id ? (
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