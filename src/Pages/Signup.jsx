import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import toast from "react-hot-toast";
import Lottie from "react-lottie-player";
import animationData from "../assets/Login.json"; // Adjust the path accordingly

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { createUser, updateUserProfile, signInWithGoogle } = UseAuth();

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
    <div className="min-h-screen flex items-center justify-center bg-teal-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        {/* Lottie Animation */}
        <Lottie
          loop
          animationData={animationData}
          play
          style={{ height: 150, marginBottom: "1.5rem" }}
        />
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>
          <br />
          <div className="h-1 w-16 bg-teal-400 mx-auto rounded-full"></div>
          <p className="text-gray-500">Join us to start your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all outline-none"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: "Photo URL is required" })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter photo URL"
            />
            {errors.photoURL && (
              <p className="mt-1 text-sm text-red-500">{errors.photoURL.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be less than 20 characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character",
                },
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-400 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors duration-200 transform focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
          >
            Create Account
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

        <div className="mt-6">
          <div>
            <button
              onClick={handleGoogleSignIn}
              className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
            >
              <FcGoogle size={32} />
              <p>Continue with Google</p>
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-teal-400 hover:text-teal-600 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
