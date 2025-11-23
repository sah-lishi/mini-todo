import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Dashboard from './pages/dashboard/Dashboard'
import Layout from './Layout'
import MyTodo from './pages/todo/MyTodo'
import MyCategory from './pages/category/MyCategory'
import './App.css';
import { useDispatch } from 'react-redux'
import { loginUser as setCredential} from './features/auth/authSlice'
import { setTodos } from './features/todo/todoSlice'
import { useEffect } from 'react'
import userService from './services/userService'
import todosService from './services/todosService'

function App() {
  const dispatch = useDispatch()
  useEffect(()=> {
    async function restoreSession() {
      try {
        await userService.refreshAccesstoken()
        const userRes = await userService.userDetail()
        dispatch(setCredential(userRes.data))
        const todosRes = await todosService.fetchAllTodo()
        dispatch(setTodos(todosRes.data))
      } catch (error) {
        console.log(error);
      }
    }
    restoreSession()
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/home' element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mytodo" element={<MyTodo />} />
          <Route path="mycategory" element={<MyCategory />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
