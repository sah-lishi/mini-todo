import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser as loginSlice } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "", password: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/users/login", formData, {withCredentials: true})
            toast.success("Login successful")
            dispatch(loginSlice(res.data.data))
            navigate("/dashboard")

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        }
    }
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login