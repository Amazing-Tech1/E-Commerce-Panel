import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'



function ProtectedRoute({ auth }) {
    const location = useLocation()

    return (
        auth ?
            <Outlet /> :
            <Navigate to="/unauthorized" state={{ from: location }} replace />

    )
}

export default ProtectedRoute
