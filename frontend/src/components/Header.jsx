import { FaSearch } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

const Header = () => {
  // Get current day and date dynamically
  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB"); // e.g. 20/06/2023

  return (
    <header id="main-header"
    className="w-full fixed left-0 bg-white shadow-sm flex flex-wrap md:flex-nowrap justify-between items-center gap-4 px-4 sm:px-6 md:px-8 py-4 top-0 z-50">
      {/* Left: Logo */}
      <div className="text-xl sm:text-2xl font-bold select-none shrink-0">
        <span className="text-[#ff8b82]">Mini</span>
        <span className="text-black">Todo</span>
      </div>

      {/* Middle: Search bar */}
      <div className="flex items-center w-full sm:w-[60%] md:w-[45%] bg-gray-100 rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Search your task here..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
        />
        <button className="p-2 bg-[#ff8b82] rounded-full text-white hover:bg-[#ff7067] transition">
          <FaSearch size={14} />
        </button>
      </div>

      {/* Right: Calendar + Date */}
      <div className="flex items-center justify-center md:justify-end space-x-3 w-full sm:w-auto">
          <FaRegCalendarAlt className="text-[#ff8b82] text-lg mr-2 shrink-0" />
          <div className="leading-tight text-xs sm:text-sm flex flex-col items-center">
            <p className="font-medium text-gray-700">{weekday}</p>
            <p className="text-[#03A9F4] font-medium">{date}</p>
          </div>
      </div>
    </header>
  );
};

export default Header;
