import SidebarItem from "./SideBarItem"
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import { useLocation } from "react-router-dom";
import {
  FaTasks,
  FaListUl,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({isOpen, toggle}) => {
    const [openLogout, setOpenLogout] = useState(false)
    const location = useLocation(); // Detect current URL
    return (
    <div
        className={`${
        isOpen ? "w-64" : "w-20"
        } bg-[#ff8b82] h-full text-white flex flex-col justify-between transition-all duration-250`}
    >
        <div>
        {/* Top section */}
        <div className="flex items-center justify-end px-4 py-5">
            <button
            onClick={toggle}
            className="text-white focus:outline-none"
            >
            <FaBars size={20} />
            </button>
        </div>

        {/* User info */}
        <div
            className={`flex flex-col items-center text-center mb-6 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
        >
            <img
            src="https://via.placeholder.com/80"
            alt="user"
            className="w-20 h-20 rounded-full border-4 border-white mb-3"
            />
            <h3 className="text-lg font-semibold">Sundar Gurung</h3>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 px-3">
            <SidebarItem
            to="/home/dashboard"
            icon={<MdDashboard />}
            text="Dashboard"
            active={location.pathname ==="/home/dashboard"}
            isSidebarOpen={isOpen}
            />
            <SidebarItem
            to="/home/mytodo"
            icon={<FaTasks />}
            text="My Task"
            active={location.pathname.startsWith("/home/mytodo")}
            isSidebarOpen={isOpen}
            />
            <SidebarItem
            to="/home/mycategory"
            icon={<FaListUl />}
            text="Task Categories"
            active={location.pathname.startsWith("/home/mycategory")}
            isSidebarOpen={isOpen}
            />
            <SidebarItem
            to="/home/settings"
            icon={<FaCog />}
            text="Settings"
            active={location.pathname === "/home/settings"}
            isSidebarOpen={isOpen}
            />
            <SidebarItem
            to="/home/help"
            icon={<FaQuestionCircle />}
            text="Help"
            active={location.pathname === "/home/help"}
            isSidebarOpen={isOpen}
            />
        </nav>
        </div>

        {/* Logout button */}
        <div className="px-4 py-6">
        <SidebarItem
            icon={<FaSignOutAlt />}
            text="Logout"
            active={false}
            onClick={() => setOpenLogout(true)}
            isSidebarOpen={isOpen}
        />
        {/* Logout modal */}
        <LogoutModal isOpen={openLogout} onClose={() => setOpenLogout(false)}/>
        </div>
    </div>
    )
}

export default Sidebar