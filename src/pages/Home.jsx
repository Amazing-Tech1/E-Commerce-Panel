import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='h-screen overflow-hidden'>
      <div className=' flex items-center justify-between py-2 px-[4%] h-[10%]'>
        <div className='flex items-baseline'>
          <img src={logo} alt="" className='w-[6%] sm' />
          <i className='text-blue-500 text-[20px] sm:text-[35px] md:text-[50px]'>MALL</i>
        </div>

        <Link to='/login'><button className="border rounded-full px-5 py-2 sm:px-7 text-white bg-blue-500">Login</button></Link>
      </div>
      <hr />
      <div className='flex flex-col items-center h-[94%] bg-blue-400 text-white text-[3vw] justify-center'>
        <p>E-Commerce Admin Panel</p>
        <p>Admin login <Link to='/login'><i>here</i></Link></p>


      </div>
    </div>
  )
}

export default Home
