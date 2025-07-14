'use client';
import Cookies from 'js-cookie'; 
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../Components/Assets/Picture1.png'; // Adjust path if needed
import { useRouter } from 'next/navigation'; // or 'next/router' for older Next.js

const Login = ({ onLogin }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorField, setErrorField] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setErrorField('');
    setSuccessMessage('');
    setLoading(true);

    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Clear any old tokens first
        Cookies.remove('token');
        Cookies.remove('tenantId');

        // Check hardcoded credentials
        if (userName === 'admin' && password === 'admin123#') {
            // ✅ Set token to simulate login
            Cookies.set('token', 'dummy-token'); // You can add options like expiration if needed

            setSuccessMessage('Login successful! Redirecting...');

            // ✅ Redirect to home page after short delay
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            // Show error based on input
            if (userName !== 'admin') {
                setErrorField('userName');
                setError('Invalid Username');
            } else {
                setErrorField('password');
                setError('Invalid Password');
            }
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred. Please try again.');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-gray-100 w-full text-gray-900">
            <Head>
                <title>Login</title>
            </Head>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <Image src={Logo} alt="Logo" className="w-32" />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {isForgotPassword ? "Forgot Password" : "Login"}
                </h2>

                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div className="mb-5">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className={`w-full p-3 border ${errorField === 'userName' ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                                required
                                maxLength="50"
                                placeholder="Enter Username"
                            />
                            {userName.length > 50 && (
                                <p className="text-red-500 text-xs mt-1">Username cannot exceed 50 characters.</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full p-3 border ${errorField === 'password' ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                                    required
                                    maxLength="50"
                                    placeholder="Enter Password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {password.length > 50 && (
                                <p className="text-red-500 text-xs mt-1">Password cannot exceed 50 characters.</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                )}

                {/* Error Message */}
                {error && (
                    <div className="text-red-700 px-4 py-3 mt-4 border border-red-500 bg-red-100 rounded-lg text-center" role="alert">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="absolute top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transform transition-all duration-500 ease-in-out">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
