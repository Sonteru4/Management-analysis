import { Close, Edit } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

function ViewMemberModal(props:any) {
    const {setViewMemberModal}=props
    // function to close this modal
    const handleModalClose=()=>{
        setViewMemberModal(false)    
    }
  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[600px]' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        Member Profile
      </div>
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>
      </div> 
      <div className='flex flex-col text-[14px]'>
        <div className='mx-auto w-[150px] h-[150px] rounded-[8px]  flex justify-center my-2 items-center border-4 border-C44'>
          <img src="" alt="profileimage " />
        </div>

        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>First Name</div>
          <div className='w-1/2 font'>John</div>
        </div>
        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Last Name</div>
          <div className='w-1/2 '>Joseph</div>
        </div>
        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Username</div>
          <div className='w-1/2 '>JJoseph112</div>
        </div>
        <div className='flex flex-row items-center justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Role</div>
          <div className='w-1/2 '>Designer</div>
        </div>
        <div className='flex flex-row items-start justify-between p-1 px-5 my-1 gap-x-2 bg-C44 rounded-[4px]'>
          <div className='w-1/2 font-bold text-C11'>Bio</div>
          <div className='w-1/2 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet repellat magni doloribus at quos commodi id tenetur suscipit. Ipsum consequatur exercitationem saepe aliquam, quas modi animi ex cum quos repellendus.</div>
        </div>
        {/* <Loader/> */}


        

      </div>



    </div>


  </div>
  )
}

export default ViewMemberModal
