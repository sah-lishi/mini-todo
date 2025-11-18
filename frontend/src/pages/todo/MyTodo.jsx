import { useEffect, useState } from "react";
import TaskCard from "../../components/Todo/TaskCard";
import TodoModal from "../../components/Todo/TodoModal";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import FloatingButton from "../../components/Button/FloatingButton";
import CommonTodoModal from "../../components/Todo/CommonTodoModal";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import { setTodos, addTodo, updateTodo, deleteTodo } from "../../features/todo/todoSlice";
const MyTodo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editTodoData, setEditTodoData] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const dispatch = useDispatch()

  const {todos} = useSelector((state) => state.todo)

  useEffect(() => {
    const fetchAllTodo = async() => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todos/", {
          withCredentials: true
        })
        dispatch(setTodos(res.data.data))
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllTodo()
  }, [])
  
  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todos/${id}`, {
        withCredentials: true
      })
      dispatch(deleteTodo(id))
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = () => {
    setOpenModal(true)
    setEditTodoData(null)
  }

  const handleEditClick = (todo) => {
    setEditTodoData(todo)
    setOpenModal(true)
  }

  const handleSubmit = async(todoData) => {
    if(editTodoData){
      try {
        const res = await axios.patch(
          `http://localhost:8000/api/v1/todos/${editTodoData._id}`,
          todoData,
          { withCredentials: true }
        );
        dispatch(updateTodo(res.data.data));
      } catch (error) {
        console.log(error.message);
      }
      }
    else{
      try {
        const res = await axios.post(`http://localhost:8000/api/v1/todos/`, todoData, {withCredentials: true})    
        dispatch(addTodo(res.data.data))
        console.log("Create todo:", todoData); 
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] relative">
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 transition-all duration-300">
          {todos?.length > 0 && (
            <FloatingButton icon={<FaPlus/>} onClick={handleAddTodo} />
          )}
          {/* TodoModal for add/edit todo */}
          <CommonTodoModal
              isOpen={openModal}
              onClose={() => {setOpenModal(false)}}
              initialData={editTodoData}
              onSubmit={handleSubmit}
          />
          {/* Page title */}
          <h2 className="text-2xl text-[#ff8b82] font-semibold mb-4">My Todos</h2>
        
          {/* Grid area */}
          <div className="grid gap-4">
            {todos?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
                
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3m0 0h3m-3 0v3m0-3V9m9 3A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-semibold text-gray-700">
                  No Tasks Yet
                </h2>

                <p className="text-sm text-gray-500 max-w-xs mt-1">
                  Looks like you haven't created any tasks. Start by adding your first one!
                </p>

                <button
                  onClick={handleAddTodo}
                  className="mt-6 bg-[#ff8b82] text-white px-6 py-2 rounded-xl hover:bg-[#ff7166] transition-all"
                >
                  Create Task
                </button>

              </div>

            )}
              {todos?.length > 0 && todos.map((todo) => (
                <TaskCard
                    key={todo._id}
                    title={todo.title}
                    desc={todo.description}
                    priority={todo.priority}
                    status={todo.status}
                    color={todo.color}
                    onClick={() => setSelectedTodo(todo)}
                >
                    {/* edit/delete buttons must NOT trigger modal → stopPropagation() */}
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
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
                    </div>
                  </TaskCard>
                ))
              }
          </div>

          {/* POPUP MODAL for viewing todo*/}
          <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
        </main>
    </div>

  );
};

export default MyTodo;