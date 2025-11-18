import { useNavigate} from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import axios from 'axios'
import {useDispatch} from "react-redux"
export default function LogoutModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  if (!isOpen) return null;

  const handleLogout = async() => {
    try {
      axios.defaults.withCredentials = true
      await axios.post("http://localhost:8000/api/v1/users/logout")
      toast.success("Log out successful")
      // dispatch user data to redux store
      dispatch(logoutUser())
      // Navigate to login page
      navigate("/")
    } catch (error) {
      console.log(error);
      
      toast.error(error.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      
      <div className="bg-white w-[350px] p-6 rounded-xl shadow-xl">
        {/* Warning */}
        <div className="text-[#ff8b82] p-3 rounded mb-6">
          <p className="text-center text-2xl font-semibold">
            Are you sure you want to log out?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-[#ff8b82] text-white py-2 rounded-full font-medium hover:bg-[#fb756c] transition"
          >
            Log out
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="border bg-gray-400 py-2 rounded-full font-medium hover:bg-gray-500 transition"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}
