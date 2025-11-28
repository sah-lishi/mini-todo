import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Dashboard from './pages/dashboard/Dashboard'
import Layout from './Layout'
import MyTodo from './pages/todo/MyTodo'
import MyCategory from './pages/category/MyCategory'
import './App.css';
import { useEffect } from 'react'
import useRestoreSession from './hooks/session/useRestoreSession'

function App() {
  const restoreSession = useRestoreSession()
  useEffect(()=> {
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
