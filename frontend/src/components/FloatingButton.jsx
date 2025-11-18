const FloatingButton = ({ icon, onClick, color = "bg-[#ff8b82]" }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} fixed bottom-4 right-4 md:bottom-6 md:right-6 text-white px-5 h-14 rounded-full shadow-lg flex items-center gap-2 text-lg hover:opacity-90 transition  w-14 h-14 text-2xl md:w-auto md:h-10 md:px-6 md:text-lg md:gap-3`}
    >
      <span className="text-xl md:text-xl">{icon}</span>
      <span className="hidden md:inline">Create Todo</span>
    </button>
  );
};

export default FloatingButton;
