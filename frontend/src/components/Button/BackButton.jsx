import { useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-[#090807] font-light mb-4 hover:text-[#585757] transition"
    >
      <HiArrowNarrowLeft />
    </button>
  );
};

export default BackButton;
