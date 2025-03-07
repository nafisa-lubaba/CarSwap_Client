// import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Car, Mail, Lock } from 'lucide-react';
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";
    const { signIn, signInWithGoogle } = UseAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success("Login Successful");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error("Sign-in error:", error);
                toast.error("Error logging in. Please try again.");
            });
    };

    const handleGoogleSignIn = async () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/');
            })
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Image Section */}
            <div className="lg:w-1/2 bg-teal-50 p-8  hidden lg:flex flex-col justify-center items-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute w-64 h-64 bg-teal-200 rounded-full -top-12 -left-12 animate-pulse"></div>
                    <div className="absolute w-48 h-48 bg-teal-300 rounded-full bottom-12 right-12 animate-pulse delay-300"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-8">
                    <Car className="w-32 h-32 text-teal-600 mx-auto animate-bounce" />
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome to CarSwap</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Join our community of car enthusiasts and experience 
                            the future of car sharing.
                        </p>
                    </div>
                    
                    {/* Feature Points */}
                    <div className="space-y-4 text-left max-w-md mx-auto">
                        <div className="flex items-center space-x-3 animate-fadeIn">
                            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                                <span className="text-white">✓</span>
                            </div>
                            <span className="text-gray-700">Verified car owners and renters</span>
                        </div>
                        <div className="flex items-center space-x-3 animate-fadeIn delay-150">
                            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                                <span className="text-white">✓</span>
                            </div>
                            <span className="text-gray-700">Secure payment system</span>
                        </div>
                        <div className="flex items-center space-x-3 animate-fadeIn delay-300">
                            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                                <span className="text-white">✓</span>
                            </div>
                            <span className="text-gray-700">24/7 customer support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 mt-16 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8 animate-slideUp">
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
                        <div className="h-1 w-16 bg-teal-400 mx-auto rounded-full"></div>
                        <p className="text-gray-500">Sign in to continue your journey</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all outline-none"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    {...register("password", { required: "Password is required" })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all outline-none"
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-teal-400 hover:bg-teal-500 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                        <FcGoogle size={24} />
                        <span>Continue with Google</span>
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Dont have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-teal-500 hover:text-teal-600 transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;