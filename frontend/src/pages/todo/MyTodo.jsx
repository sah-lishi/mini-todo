import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard";
import TodoModal from "../../components/TodoModal";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import FloatingButton from "../../components/FloatingButton";
import CommonTodoModal from "../../components/CommonTodoModal";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import { setTodos, addTodo, updateTodo, deleteTodo } from "../../features/todo/todoSlice";
const MyTodo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editTodoData, setEditTodoData] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const dispatch = useDispatch()

  const {todos} = useSelector((state) => state.todo)

  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchAllTodo = async() => {
      try {
        const res = await axios.get("/api/v1/todos/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
      await axios.delete(`/api/v1/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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

  const handleSubmit = async(data) => {
    if(editTodoData){
        console.log("Update todo:", data);}
    else{
      try {
        const res = await axios.post(`/api/v1/todos/`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })    
        dispatch(addTodo(res.data.data))
        console.log("Create todo:", data); 
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] relative">
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 transition-all duration-300">
        <FloatingButton icon={<FaPlus/>} onClick={handleAddTodo} />
        {/* TodoModal */}
        <CommonTodoModal
            isOpen={openModal}
            onClose={() => {setOpenModal(false)}}
            initialData={editTodoData}
            onSubmit={handleSubmit}
        />

        <h2 className="text-2xl text-[#ff8b82] font-semibold mb-4">My Tasks</h2>
      
            {/* Grid area */}
            <div className="grid gap-4">
                {todos.map((todo) => (
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
                        onClick={handleEditClick}
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
                ))}
            </div>

            {/* POPUP MODAL */}
            <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
    
        </main>
    </div>

  );
};

export default MyTodo;