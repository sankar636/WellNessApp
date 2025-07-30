import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper.js';
import axios from 'axios';
import HeroImage1 from '../assets/HeroImage1.jpg'
const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError(null);
        const user = { email, password };

        const baseURL = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.post(`${baseURL}/auth/signin`, user);
            if (response.status === 200) {
                const data = response.data.data;
                localStorage.setItem('token', data.token);
                navigate('/home'); // redirect after login
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong while signing in the user");
        }
    };

    return (
        <div className="bg-cyan-50 min-h-fit flex items-center justify-center pt-4">
            <div className="container flex flex-col md:flex-row items-center justify-center px-4 md:px-20 w-full">

                {/* Left Image Section */}
                <div className="hidden md:flex w-full md:w-1/2 h-[70vh] bg-cover bg-center rounded-lg p-10"
                style={{ backgroundImage: `url(${HeroImage1})` }}
                >
                    <div className="bg-black/40 p-6 rounded-lg">
                        <h4 className="text-4xl text-white font-semibold leading-tight">
                            Discover Your <br /> Path to Wellness
                        </h4>
                        <p className="text-sm leading-6 mt-4 text-green-100 font-medium">
                            Join our community to explore mindful yoga sessions, guided meditation, and holistic wellness resources.
                            <br /><br />
                            Create and share your own healing sessions, track your journey, and find peace every day.
                        </p>
                    </div>
                </div>


                {/* Right Login Form */}
                <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl py-16 px-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h4 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h4>

                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
                        >
                            LOGIN
                        </button>

                        <div className="relative flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-gray-400 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-white border border-blue-500 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
                            onClick={() => navigate("/signup")}
                        >
                            CREATE ACCOUNT
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
