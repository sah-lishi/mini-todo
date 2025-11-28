import { useDispatch } from "react-redux";
import { setTodos, addTodo as add, updateTodo as update, deleteTodo} from "../../features/todo/todoSlice";
import todosService from '../../services/todosService'

function useMyTodo() {
    const dispatch = useDispatch()
    const getLatestTodos = async() => {
      try {
        const res = await todosService.fetchAllTodo()
        dispatch(setTodos(res.data))
      } catch (error) {
        console.log(error);
      }
    }
    const deleteATodo = async(id) => {
        try {
            await todosService.deleteTodo(id)
            dispatch(deleteTodo(id))
        } catch (error) {
            console.log(error);
        }
    }
    const editTodo = async (id, todoData) => {
        try {
            const res = await todosService.updateTodo(id, todoData)
            dispatch(update(res.data));
      } catch (error) {
            console.log(error.message);
      }
    }
    const addTodo = async (todoData) => {
      try {
          const res = await todosService.addNewTodo(todoData)
          dispatch(add(res.data))
      } catch (error) {
            console.log(error.message);
      }
    }

  return {getLatestTodos, deleteATodo, editTodo, addTodo}
}

export default useMyTodo
