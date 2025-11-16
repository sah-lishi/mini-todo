import {useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {loginUser as signupSlice} from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        username: "", email: "", password: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/users/register", formData, {withCredentials: true})
            toast.success("Sign up successful")
            // dispatch user data to redux store
            dispatch(signupSlice(res.data.data))
            navigate("/dashboard")
        
        } catch (error) {
            toast.error(error.response?.data?.message || "Sign up failed")
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} /><br />
                <input name="email" placeholder="Email" onChange={handleChange} /><br />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup