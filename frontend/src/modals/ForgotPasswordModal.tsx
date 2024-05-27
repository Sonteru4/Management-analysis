import React, { useState } from 'react'

function ForgotPasswordModal() {
    // CMFS - Confirmation Mail Sent 
    const [CMFS,setCMFS] = useState<Boolean>(false)

    const handleEmailConfirmation = ()=>{
      setCMFS(true)
    }

  return (
    <>
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#0000005b] flex justify-center items-center'>
        <div className='bg-white rounded-[8px] p-10 w-[500px]'>
            <div className='font-bold text-[22px] text-[#012B39]'>Forgot Password</div>
            <div className='my-1 text-[14px]'>Enter your email connected to TMS and very to recieve a mail regarding the password change</div>
            <input type="email" className=' text-[14px] w-full mt-2 flex-1 bg-[#F4F4F4] outline-none rounded-[8px] p-2 h-[40px]' placeholder='Email'  name="email" id="" />
            <div className='flex justify-end mt-2'>
            <button className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[14px] py-2 px-5`} onClick={()=>handleEmailConfirmation()}>Verify</button>
            </div>

            {
              CMFS&&
              <>
              <div className='mt-2 text-emerald-500'>
                Email has been confirmed. Please check your inbox for further instructions.
              </div>
              
              </>

              
            }
        </div>
        

    </div>
    </>
  )
}

export default ForgotPasswordModal
