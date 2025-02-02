import React, { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/add'
import List from './pages/list'
import Update from './pages/Update'
import Order from './pages/order'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'
import Home from './pages/Home'
import Missing from './pages/Missing'
import ProtectedRoute from './pages/ProtectedRoute'
import axios from './api/axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function App() {
  const [auth, setAuth] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState(null)
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate()


  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await axios.post('/admin', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(`Welcome ${email}`)
        setAuth(true)
        localStorage.setItem('auth', JSON.stringify(true))
        navigate('/list')
        setEmail("")
        setPassword("")
      }
    } catch (err) {
      console.eror("Login Error:", err);
      if (!err?.response) {
        setErr('No Server Response');
        console.err('No Server Response')
      } else if (err.response?.status === 400) {
        setErr('Missing UserName or Password');
        console.err('Missing UserName or Password')
      } else if (err.response?.status === 401) {
        setErr('Invalid Password or Username');
        console.err('Invalid Password or Username')
      } else {
        setErr('Login Failed')
      }
      errRef.current.focus()
    }
  }
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth))
    }
  }, [])

  return (
    <div className='bg-gray-100 min-h-screen'>
      <ToastContainer />
      {!auth ?
        <Routes>
          <Route path='login' element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} err={err} handleLogin={handleLogin} userRef={userRef} errRef={errRef} />} />
          <Route path='/' element={<Home />} />
        </Routes>
        :
        <>
          <Navbar setAuth={setAuth} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[2%] my-8 text-blue-500 text-base'>

              <Routes>
                <Route path='unauthorized' element={<Unauthorized />} />
                <Route element={<ProtectedRoute auth={auth} />}>
                  <Route path='/add' element={<Add />} />
                  <Route path='/list' element={<List />} />
                  <Route path='/update/:id' element={<Update />} />
                  <Route path='/order' element={<Order auth={auth} />} />
                </Route>
                <Route path='*' element={<Missing />} />
              </Routes>
            </div>
          </div>
        </>
      }

    </div >

  )
}

export default App
