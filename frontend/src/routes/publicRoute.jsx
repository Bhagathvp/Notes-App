import React from "react";
import {Outlet,Navigate} from 'react-router-dom'


const PublicRoute=()=> {
    const auth = localStorage.getItem('auth')
  return (
    auth?<Navigate to='/'/>:<Outlet/>
  )
}

export default PublicRoute