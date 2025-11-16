import { Link } from "react-router-dom";
// Sidebar item component
const SidebarItem = ({ icon, text, active, onClick, isSidebarOpen, to }) => { 
  const classes = `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
    active ? "bg-white text-[#ff8b82]" : "hover:bg-[#ff9c94]"
  }`
  if (to) {
    return  (
      <Link
        to={to} onClick={onClick} className={classes}>
        <span className="text-lg">{icon}</span>
        {isSidebarOpen && <span>{text}</span>}
      </Link>
    )
  }

  return (
    <div onClick={onClick} className={classes + " cursor-pointer"}>
      <span className="text-lg">{icon}</span>
      {isSidebarOpen && <span>{text}</span>}
    </div>
  )
}

export default SidebarItem