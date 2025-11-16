import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryCard = ({ name, createdAt, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition">
      
      {/* Category Name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {name}
      </h3>

      {/* Created At */}
      <p className="text-sm text-gray-500">
        Created: <span className="font-medium text-gray-600">{createdAt}</span>
      </p>

      {/* Bottom Buttons */}
      <div className="mt-4 flex space-x-3">
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-500 text-white py-2 rounded-md text-sm flex justify-center items-center gap-2 hover:bg-blue-600 transition"
        >
          <FaEdit size={14} /> Edit
        </button>

        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 text-white py-2 rounded-md text-sm flex justify-center items-center gap-2 hover:bg-red-600 transition"
        >
          <FaTrash size={14} /> Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
