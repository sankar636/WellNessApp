import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from '../utils/helper';
import HeroImage1 from '../assets/HeroImage1.jpg'


const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username) {
            setError("Please enter your name.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError(null);

        const newUser = { username, email, password };
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, newUser);

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Signup Error:", error.message);
            setError("Something went wrong while signing up the user");
        }
    };

    return (
        <div className="bg-cyan-50 min-h-fit flex items-center justify-center py-4">
            <div className="container flex flex-col md:flex-row items-center justify-center px-4 md:px-20 w-full">
                <div
                    className="hidden md:flex w-full md:w-1/2 h-[70vh] bg-cover bg-center rounded-lg p-10"
                    style={{ backgroundImage: `url(${HeroImage1})` }}
                >
                    <div className="bg-black/40 p-6 rounded-lg">
                        <h4 className="text-4xl text-white font-semibold leading-tight">
                            Begin Your <br /> Wellness Journey
                        </h4>
                        <p className="text-sm leading-6 mt-4 text-green-100 font-medium">
                            Sign up and unlock personalized yoga routines, calming meditation sessions,
                            and guided wellness plans to help you live a balanced and peaceful life.
                            <br /><br />
                            Create your own wellness sessions and share positive vibes with the community.
                        </p>
                    </div>
                </div>

                {/* Right Signup Form */}
                <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl py-16 md:py-6 lg:py-12 px-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <h4 className="text-3xl font-bold text-center text-gray-800 mb-6">Join Our Wellness Community</h4>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
                        >
                            SIGN UP
                        </button>

                        <div className="relative flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-gray-400 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-white border border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200"
                            onClick={() => navigate("/login")}
                        >
                            LOGIN
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Signup;
