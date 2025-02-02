import axios from '../api/axios';

import React, { useEffect } from 'react'


function Login({ email, setEmail, password, setPassword, err, handleLogin, userRef, errRef }) {

    useEffect(() => {
        userRef.current.focus()
    }, [])

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <section className="max-w-[300px] bg-blue-400 text-white p-4 pb-7 h-auto w-full rounded-xl ">
                <p ref={errRef} className={err ? "bg-red-300 text-xl text-red-500 px-1 py-2" : "hidden"} >{err}</p>
                <h1 className="text-2xl text-left pt-2 pb-6 font-bold">Admin Panel</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username" className='text-xl font-serif'>Email:
                    </label>
                    <input
                        className='flex w-full h-[30px] rounded-2xl mb-2 px-4 text-xl text-black'
                        type="text"
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label htmlFor="password" className='text-xl mt-3 font-serif'>Password:
                    </label>
                    <input
                        className='flex w-full h-[30px] rounded-2xl mb-2 px-4 text-xl text-black'
                        type="password"
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button className='bg-gray-200 text-black w-full h-[40px] text-xl font-bold rounded-2xl mt-7 shadow-md'>
                        Log In
                    </button>
                </form>
            </section>
        </div>
    )
}

export default Login
