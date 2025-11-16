import {GoogleLogin} from '@react-oauth/google'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {loginUser as signupSlice} from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const GoogleLoginBtn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSuccess = async(credentialResponse) => {
        try {
            const res = await axios.post("/api/v1/gauth/google-signup", {credential: credentialResponse.credential}, {withCredentials: true})

            console.log("Login success:", res.data);
            toast.success("Sign up with google successful")
            // dispatch user data to redux store
            dispatch(signupSlice(res.data.data))
            navigate("/dashboard")
            
        } catch (error) {
            console.log("Login failed: ", error);
            
        }
    }

    const handleError = () => {
        console.log("Google login failed");
        toast.error("Google login failed")
    }

    return (
        <div className="flex justify-center mt-4">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError}/>
        </div>
    )
}

export default GoogleLoginBtn