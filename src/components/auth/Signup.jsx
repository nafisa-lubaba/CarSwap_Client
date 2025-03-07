
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Lock, Image } from 'lucide-react';
import Lottie from "react-lottie-player";
import animationData from "../../assets/Login.json";
import UseAuth from "../../hooks/UseAuth";

const Signup = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { createUser, updateUserProfile, signInWithGoogle } = UseAuth();
  console.log( userType,);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      console.log("User created:", result.user);
      reset();
      toast.success("User created successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google Sign-In Success:", result.user);
      toast.success("Google Sign-Up Successful");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Error signing in with Google");
    }
  };

  return (
    <div className=" flex flex-col lg:flex-row">
      {/* Left Side - Form Section */}
      <div className="lg:w-1/2 mt-16 flex items-center justify-center p-8 bg-teal-50">
        <div className="w-full max-w-md space-y-6 animate-slideUp">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>
            <div className="h-1 w-16 bg-teal-400 mx-auto rounded-full"></div>
            <p className="text-gray-500">Join us to start your journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>

            {/* Photo URL Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Photo URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("photoURL", { required: "Photo URL is required" })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all outline-none"
                  placeholder="Enter photo URL"
                />
                {errors.photoURL && (
                  <p className="mt-1 text-sm text-red-500">{errors.photoURL.message}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
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
              Create Account
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-teal-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg p-3 hover:bg-white transition-colors duration-200"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-teal-500 hover:text-teal-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Animation Section */}
      <div className="lg:w-1/2 bg-white p-8 hidden lg:flex flex-col justify-center items-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-64 h-64 bg-teal-100 rounded-full -top-12 -right-12 animate-pulse"></div>
          <div className="absolute w-48 h-48 bg-teal-200 rounded-full bottom-12 left-12 animate-pulse delay-300"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <div className="w-full max-w-md mx-auto">
            <Lottie
              loop
              animationData={animationData}
              play
              style={{ width: "100%", height: "300px" }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Join CarSwap Today</h2>
            <p className="text-gray-600">
              Unlock the full potential of car sharing with our verified community
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 animate-fadeIn">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span className="text-gray-700">Quick and easy registration</span>
            </div>
            <div className="flex items-center space-x-3 animate-fadeIn delay-150">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span className="text-gray-700">Access to exclusive car listings</span>
            </div>
            <div className="flex items-center space-x-3 animate-fadeIn delay-300">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <span className="text-gray-700">Verified user benefits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;