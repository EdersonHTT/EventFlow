import React from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoutes({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    if (!token) {
        return <Navigate to="/login"/>;
    }

    if (allowedRoles && !allowedRoles.includes(Number(role))) {
        return <Navigate to={"/dashboard"}/>;
    }

    return children;
}

export default PrivateRoutes