import { useSelector } from "react-redux";
import TaskCard from "../Todo/TaskCard";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoryTodoList({ categoryId }) {
  const todos = useSelector(state => state.todo.todos);

  const filtered = todos.filter(todo => todo.category === categoryId);

  if (filtered.length === 0)
    return <p className="text-gray-500">No tasks in this category.</p>;

  return (
    <div className="space-y-2">
      {filtered.map(todo => (
        <TaskCard key={todo._id} todo={todo} > 
        {/* edit/delete buttons must NOT trigger modal → stopPropagation() */}
            {/* <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
            <button
                className="p-2 text-gray-800 border border-blue-600 rounded-md hover:bg-blue-600 flex flex-col items-center"
                onClick={() => handleEditClick(todo)}
            >
                <FaEdit size={14} />
                Edit
            </button>

            <button
                className="p-2 text-gray-800 border border-red-600 rounded-md hover:bg-red-600 flex flex-col items-center"
                onClick={() => handleDelete(todo._id)}
            >
                <FaTrash size={14} />
                Delete
            </button>
            </div> */}
        </TaskCard>
      ))}
    </div>
  );
}
