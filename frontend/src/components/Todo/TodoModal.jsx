const TodoModal = ({ todo, onClose }) => {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h3 className="text-2xl font-semibold mb-4 text-[#ff8b82]">
          {todo.title}
        </h3>

        <p className="text-gray-700 mb-4">{todo.description}</p>

        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
          <p><strong>Priority:</strong> {todo.priority}</p>
          <p><strong>Status:</strong> {todo.status}</p>
          <p><strong>Created:</strong> {todo.createdAt}</p>
          <p><strong>Due Date:</strong> {todo.dueDate || "—"}</p>
          <p><strong>Completed:</strong> {todo.completedAt || "Not Completed"}</p>
          <p><strong>Category:</strong> {todo.category || "—"}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
