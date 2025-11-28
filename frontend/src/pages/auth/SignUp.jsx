import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import {GoogleLogin} from '@react-oauth/google'
import {useState } from "react";
import { toast } from "react-toastify";
import useSignin from "../../hooks/authentication/useSignin";

const SignUp = () => {
  const [signupData, setSignupData] = useState({username: "", email: "", password: ""})
  
  const handleChange = (e) => {
    setSignupData({...signupData, [e.target.name]: e.target.value})
  }
  const {signup, signinWithGoogle} = useSignin()
  const handleSubmit = async(e) => {
    e.preventDefault()
    await signup(signupData)
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
        <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="flex items-center border rounded-md mb-4 px-3 py-2">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center border rounded-md mb-4 px-3 py-2">
            <MdEmail className="text-gray-500 mr-3" />
            <input
              type="email"
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
              name="password"
              type="password"
              placeholder="Enter Password"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Signup Button */}
          <button type="submit" className="w-full bg-[#ff8b82] hover:bg-[#ff7067] text-white font-semibold py-2 rounded-md transition">
            Sign Up
          </button>
        </form>
        {/* OR Divider */}
        <div className="text-center mt-6">
          <p className="text-sm mb-3 text-gray-600">Or, Signup with</p>
          <div className="flex justify-center space-x-4 text-2xl">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError}/>
            
          </div>
        </div>

        {/* Already have an account */}
        <p className="text-sm mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">Sign In</Link>
          {/* <a href="/" className="text-blue-600 hover:underline">
            Sign In
          </a> */}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
