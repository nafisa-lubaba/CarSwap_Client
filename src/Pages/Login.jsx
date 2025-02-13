import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
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
        <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
            <div className="h-1 w-16 bg-teal-400 mx-auto rounded-full"></div>
            <p className="text-gray-500">Sign in to continue your journey</p>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all outline-none"
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
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal--400 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
  
            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-400 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors duration-200 transform focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
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
  
          <div className="mt-6">
            <div>
              <button
                // disabled={loading}
                onClick={handleGoogleSignIn}
                className=' flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
              >
                <FcGoogle size={32} />
  
                <p>Continue with Google</p>
              </button>
            </div>
          </div>
  
          <p className="text-center text-sm text-gray-500">
            Dont have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-cyan-500 hover:text-cyan-600 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Login;