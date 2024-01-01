import React, { useState } from 'react'
import Logo from '../common/Logo'
import { Link } from 'react-router-dom'
import { colors } from '../Constants'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { genders } from '../data/data'

function Register() {
 document.title = "TMS • Sign Up"
 const [showPassword,setShowPassword]=useState<Boolean>(false)

  return (
   <>
   <div className='flex flex-col justify-center py-1   mx-auto  w-[30%]'>
    <div className='flex justify-center p-2 '>
    <Logo size={"0.5"} color={colors.C11}/>
    </div>
    <div className='flex flex-col gap-2 p-2 py-5  '>
      <div className='flex flex-row gap-2'>
            <input type="text"  className='flex-1 bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]' placeholder='First Name'  name="firstname" id="" />
            <input type="text" className='flex-1 bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]' placeholder='Last Name'  name="lastname" id="" />
      </div>
            <input type="text" className='bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]' placeholder='Username'  name="username" id="" />
            <div className='flex flex-row justify-between gap-2' >
              <select  className='flex-1 bg-C44 rounded-[8px] p-2 h-[46px] text-[14px] cursor-pointer' name="gender" id="gender">
                <option value="none" selected>Select Gender</option>
                {
                  genders.map((node:any,i:any)=>(
                    <option value={node} key={i}>{node}</option>
                  ))
                }
                <input type="text" placeholder='Specify your gender' />
                {/* <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option> */}
              </select>
              {/*  an input for taking date */}
              <input className='flex-1 bg-C44 rounded-[8px] p-2 h-[46px] text-[14px] cursor-pointer' type="date" name="dob" id="dob"/>
            </div>
            <input type="text" className='bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]' placeholder='Email'  name="email" id="" />
            
            <div className='bg-C44 rounded-[8px]  h-[46px] flex flex-row items-center justify-between focus-within:outline focus-within:outline-2'>
                <input type={showPassword?"text":"password"} className=' text-[14px] flex-1 bg-C44 focus:outline-none rounded-[8px] p-2 h-[46px]' placeholder='Password'  name="password" id="" />
                <div 
                onClick={()=>setShowPassword(!showPassword)}
                className='mr-2 cursor-pointer rounded-full p-1 transition hover:bg-[#00000011]'>
                 
                 {
                    showPassword?
                    <VisibilityOff fontSize ="small" sx={{ color:colors.C11}}/>
                    :
                    <Visibility fontSize ="small" sx={{ color:colors.C11}}/>
                    }
                </div>
                
                
            </div>
            <input type="password" className='bg-C44 rounded-[8px] p-2 h-[46px] text-[14px] focus:outline-none' placeholder='Confirm Password'  name="cpassword" id="" />

     </div>
     <div className='flex justify-center w-full '>
      <button className={`bg-C11 hover:bg-[#012B39] rounded-[8px] text-C55 font-bold text-[14px] py-4 px-10 `}>Sign Up</button>
     </div>
     <Link to={"/login"}>
     <div className={`text-[11px] text-C22 cursor-pointer  text-center py-2`}>
              Already Have an Account? Login
            </div>
     
     </Link>
  </div> 
  
   </>
  )
}

export default Register