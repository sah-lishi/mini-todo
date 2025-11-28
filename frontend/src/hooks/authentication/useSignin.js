import { useDispatch } from "react-redux";
import { loginUser as userAuthSlice } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import googleAuthService from "../../services/googleAuthService";
import { toast } from "react-toastify";

function useSignin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = async (loginData) => {
        try {
            const res = await userService.login(loginData)
            toast.success("Login successful")
            dispatch(userAuthSlice(res.data.user))
            navigate("/home/dashboard")
        } catch (error) {
            toast.error(error?.data?.message || error?.message || "Login failed")
        }
    }
    const signup = async(signupData) => {
        try {
            const res = await userService.registerUser(signupData)
            toast.success("Sign up successful")
            // dispatch user data to redux store
            dispatch(userAuthSlice(res.data.user))
            navigate("/home/dashboard")
        } catch (error) {
            toast.error(error.response?.data?.message || "Sign up failed")
        }
    }
    const signinWithGoogle = async (credentialResponse) => {
        try {
            const res = await googleAuthService.googleSignup({credential: credentialResponse.credential})
            toast.success("Sign up with google successful")
            // dispatch user data to redux store
            dispatch(userAuthSlice(res.data.user))
            navigate("/home/dashboard")
        } catch (error) {
            console.log("SignIn with google failed: ", error);
        }
    }
  return{login, signup, signinWithGoogle} 
}

export default useSignin
