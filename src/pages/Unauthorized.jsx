import React from 'react'

function Unauthorized() {
    return (
        <div>
            <p>You are Unauthorized Pls Login</p>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Unauthorized
