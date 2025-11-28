import { useDispatch } from "react-redux"
import userService from "../../services/userService"
import todosService from "../../services/todosService"
import { setTodos } from "../../features/todo/todoSlice"
import { loginUser as setCredential } from "../../features/auth/authSlice"

function useRestoreSession() {
    const dispatch = useDispatch()
    const restoreSession = async() => {
        try {
            await userService.refreshAccesstoken()
            const userRes = await userService.userDetail()
            // dispatch user data to redux store
            dispatch(setCredential(userRes.data))
            const todosRes = await todosService.fetchAllTodo()
            dispatch(setTodos(todosRes.data))
      } catch (error) {
            console.log(error);
      }
    }
    return restoreSession
}

export default useRestoreSession
