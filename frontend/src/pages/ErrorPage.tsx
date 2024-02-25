import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    document.title="TMS • Page Not Found"
  return (
    <div className='flex items-center justify-center h-[100vh] bg-C44'>
        <div className='flex flex-col justify-center text-center'>
            <div className='text-[200px] font-bold text-C11 '>404</div>
            <div className='text-[20px] font-medium text-C11'>THE PAGE YOU REQUESTED COULD NOT BE FOUND</div>
            <div className='flex flex-row justify-between w-full mt-10'>
                <Link to="/">
                  <div className='hover:underline text-C22 hover:text-C11 text-[16px] underline-offset-4'>
                  T M S
                  </div>  
                </Link>
                <Link to="/dashboard">
                <div className='hover:underline text-C22 hover:text-C11 text-[16px] underline-offset-4'>
                  Dashboard
                  </div> 
                </Link>
                <Link to="/login">
                <div className='hover:underline text-C22 hover:text-C11 text-[16px] underline-offset-4'>
                  Login
                  </div> 
                </Link>
                <Link to="/register">
                  <div className='hover:underline text-C22 hover:text-C11 text-[16px] underline-offset-4'>
                  Register
                  </div> 
                </Link>
                
            </div>
        </div>

    </div>
  )
}

export default ErrorPage
