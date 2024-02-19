import { Close } from '@mui/icons-material'
import React from 'react'

function RemoveMemberConfirmationModal(props:any) {

    const {setRemoveMemberModal}=props

    const handleModalClose =()=>{
        setRemoveMemberModal(false)
    }

  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[500px]' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        Remove Member
      </div>
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>
      </div>  
      <div className="mt-4 mb-6 text-[14px]">
        This action is irreversible!<br/>
        Are you sure you want to remove <strong>John Joseph</strong>  from this project ? 
      </div>

      <div className='flex justify-end gap-4 mt-2'>
        <button className={`bg-inactiveC11  rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}  onClick={handleModalClose}>Not Sure</button>
        <button className={` hover:bg-inactiveRed rounded-[8px] text-highPriority font-bold text-[12px] py-2 px-5`}>Remove</button>
      </div> 
    </div>
  </div>
  )
}

export default RemoveMemberConfirmationModal
