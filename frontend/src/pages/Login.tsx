import React, { useState } from 'react'
import Logo from '../common/Logo'
import { colors } from '../Constants'
import { Link } from 'react-router-dom'
import ForgotPasswordModal from '../modals/ForgotPasswordModal'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function Login() {
  document.title = "TMS • Login"
  const [showPassword,setShowPassword]=useState<Boolean>(false)
  const [forgotPasswordModal,setForgotPasswordModal] = useState<Boolean>(false)

  return (
   <> 
   <div className='relative '>
    <div className='flex flex-col justify-center py-20 mx-auto  w-[30%]'>
      <div className='flex justify-center p-2 '>
      <Logo size={"0.6"} color={colors.C11}/>
      </div>
      <div className='flex flex-col gap-2 p-2 py-10 '>
              <input type="text" className='bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]' placeholder='Username'  name="username" id="" />
              
              <div className='bg-C44 rounded-[8px]  h-[46px] flex flex-row items-center justify-between focus-within:outline focus-within:outline-2'>
                  <input type={showPassword?"text":"password"} className=' text-[14px] flex-1 bg-C44 focus:outline-none rounded-[8px] p-2 h-[46px]' placeholder='Password'  name="password" id="" />
                  <div onClick={()=>setShowPassword(!showPassword)} className='mr-2 cursor-pointer rounded-full p-1 transition hover:bg-[#00000011]'>
                  
                    {
                    showPassword?
                    <VisibilityOff fontSize ="small" sx={{ color:colors.C11}}/>
                    :
                    <Visibility fontSize ="small" sx={{ color:colors.C11}}/>
                    }
                  </div>
                  
                  
              </div>
              <div className={`text-[11px] text-[#1F7A8C] cursor-pointer text-right`} onClick={()=>setForgotPasswordModal(true)}>
                Forgot Password ?
              </div>
      </div>
      <div className='flex justify-center w-full '>
        <button className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[14px] py-4 px-10 `}>Log In</button>
      </div>
      <Link to={"/register"}>
      <div className={`text-[11px] text-[#1F7A8C] cursor-pointer  text-center py-2`}>
                New to TMS ? Sign Up!
              </div>
      
      </Link>
    </div>
     {/*Forgot Password Modal  */}
     {
      forgotPasswordModal&&
      <ForgotPasswordModal/>
      }
   </div>
   </>
  )
}

export default Login
