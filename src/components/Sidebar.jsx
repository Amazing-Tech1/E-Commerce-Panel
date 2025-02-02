import React from 'react'
import { NavLink } from 'react-router-dom'
import add_icon from '../assets/add_icon.png'
import list_icon from '../assets/list_icon.png'

function Sidebar() {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink to="/add" className='flex items-center gap-3 border border-blue-300 border-r-0 px-3 py-2 rounded'>
                    <img src={add_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Add Product</p>
                </NavLink>
                <NavLink to="/list" className='flex items-center gap-3 border border-blue-300 border-r-0 px-3 py-2 rounded'>
                    <img src={list_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>List Products</p>
                </NavLink>
                <NavLink to="/order" className='flex items-center gap-3 border border-blue-300 border-r-0 px-3 py-2 rounded'>
                    <img src={list_icon} alt="" className='w-5 h-5' />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
            </div>

        </div>
    )
}

export default Sidebar
