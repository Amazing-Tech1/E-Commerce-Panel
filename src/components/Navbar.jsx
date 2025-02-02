import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'



function Navbar({ setAuth }) {
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            const response = await axios.get('/logout', {
                withCredentials: true
            })
            if (response.data.logout) {
                setAuth(false)
                localStorage.removeItem('auth')
                console.log(response.data)
                navigate('/')
            }

        } catch (error) {
            console.error(error.message)
        }

    }
    return (
        <div className=' flex items-center justify-between py-3 px-[4%]'>
            <div className='flex items-baseline '>
                <img src={logo} alt="" className='w-[6%] h-[100%] sm' />
                <i className='text-blue-500 text-[25px]'>MALL</i>
            </div>

            <div><button className="border rounded-full px-5 py-2 sm:px-7 text-white bg-blue-500" onClick={handleLogout}>Logout</button></div>

        </div>
    )
}

export default Navbar
