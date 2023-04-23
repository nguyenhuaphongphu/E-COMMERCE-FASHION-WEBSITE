import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'



export default function RouteUpdater() {
    let  adminid = JSON.parse(localStorage.getItem("user"))?.roles.includes("ROLE_ADMIN") ? true : false;
    return (
        <>
            {adminid ? <Outlet/> : <Navigate to="/error" />};
        </>

    )

}