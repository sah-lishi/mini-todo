import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import CategoryTodoList from "./CategoryTodoList";

const CategoryCard = ({category, children, }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-gray-50 p-4 border-gray-300 rounded-lg mb-1 hover:shadow-md transition cursor-pointer border `}
    >
      <div className="flex justify-between items-center">
        {/* header */}
        <h4 className="font-semibold">{category.name}</h4>
          <div className="flex items-center gap-3">
            {/* Slot for edit/delete buttons */}
            {children}
            {/* Dropdown */}
            <button onClick={() => setOpen(!open)}>
              {open ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
      </div>
        {/* Todo List */}
        {open && (
          <div className="mt-4">
            <CategoryTodoList categoryId={category._id} />
          </div>
        )}
    </div>
  );
};

export default CategoryCard;

