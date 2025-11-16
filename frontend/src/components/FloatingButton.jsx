const FloatingButton = ({ icon, onClick, color = "bg-[#ff8b82]" }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} fixed bottom-6 right-6 text-white w-14 h-14 rounded-full shadow-lg flex justify-center items-center text-xl hover:opacity-90 transition`}
    >
      {icon}
    </button>
  );
};

export default FloatingButton;
