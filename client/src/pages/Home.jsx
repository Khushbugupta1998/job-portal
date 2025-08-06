import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const {isLoggedIn, user} = useSelector((state) => state.auth)
  return (
    <>
    <h1 className='text-center text-2xl mt-10'>Home Page</h1>
        {isLoggedIn ? (
        <div>
          <p>Welcome, {user.username}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </>
  )
}

export default Home