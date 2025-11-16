import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

function Home() {
    const {isAuthenticated} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(()=> {
        if (isAuthenticated) {
            navigate("/dashboard")
        }
    }, [isAuthenticated, navigate])
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-semibold">Welcome to TODO</h1>
            <div className="flex gap-4">
                <GoogleLoginBtn/><br />
                <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Sign Up
                </Link><br />
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Home