import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {Link} from "react-router-dom"
import {GoogleLogin} from '@react-oauth/google'
import { toast } from "react-toastify";
import { useState } from "react";
import useSignin from "../../hooks/authentication/useSignin";
const SignIn = () => {
  const [loginData, setLoginData] = useState({email: "", password: ""})
  const {login, signinWithGoogle} = useSignin()
  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(loginData)
  }
  const handleSuccess = async(credentialResponse) => {
    await signinWithGoogle(credentialResponse)
  }
  const handleError = () => {
    console.log("Google login failed");
    toast.error("Google login failed")
  }
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#ffb3ab]">
      {/* Outer Card */}
      <div className="bg-white shadow-xl rounded-2xl w-[90%] max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex items-center border rounded-md mb-4 px-3 py-2">
            <MdEmail className="text-gray-500 mr-3" />
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border rounded-md mb-6 px-3 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-[#ff8b82] hover:bg-[#ff7067] text-white font-semibold py-2 rounded-md transition">
            Log In
          </button>
        </form>

        {/* OR Divider */}
        <div className="text-center mt-6">
          <p className="text-sm mb-3 text-gray-600">Or, Login with</p>
          <div className="flex justify-center space-x-4 text-2xl">
            {/* <FcGoogle className="cursor-pointer" onSuccess={handleSuccess} onError={handleError}/> */}
            <GoogleLogin onSuccess={handleSuccess} onError={handleError}/>
          </div>
        </div>

        {/* Create Account */}
        <p className="text-sm mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">Create One</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;