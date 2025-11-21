import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Dashboard from './pages/dashboard/Dashboard'
import Layout from './Layout'
import MyTodo from './pages/todo/MyTodo'
import MyCategory from './pages/category/MyCategory'
import './App.css';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { loginUser as setCredential} from './features/auth/authSlice'
import { setTodos } from './features/todo/todoSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  useEffect(()=> {
    async function restoreSession() {
      try {
        await axios.post("http://localhost:8000/api/v1/users/access-token", {}, {withCredentials: true})
        const userRes = await axios.get("http://localhost:8000/api/v1/users/current-user", {withCredentials: true})
        dispatch(setCredential(userRes.data.data))
        const todosRes = await axios.get("http://localhost:8000/api/v1/todos/", {withCredentials: true})
        dispatch(setTodos(todosRes.data.data))
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
