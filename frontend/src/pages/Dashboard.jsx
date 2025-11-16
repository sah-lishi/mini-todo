import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser as logoutSlice } from "../features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Dashboard() {
    const {isAuthenticated, user} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    const handleLogout = () => {
        dispatch(logoutSlice())
        toast.info("Logged out successfully")
        navigate("/")
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-lg">Welcome, <span className="font-bold">{user?.username}</span>👋</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
             onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard