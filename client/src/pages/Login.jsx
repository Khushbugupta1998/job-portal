import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/authSlice'

const Login = () => {
    const dispatch = useDispatch()
    const handleLogin = () =>{
dispatch(login({ username: 'khushbu', email: 'khushbu@example.com' }))
    }
  return (
    <>
    <h1 className='text-center text-2xl mt-10'>Login Page</h1>
    <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default Login