import { ManageSearchRounded } from '@mui/icons-material'
import React from 'react'

function NoDataMessage(props:any) {
   const {size,message}=props
  return (
    <>
    {
    size==="large"?
    <div className='flex flex-col p-2'>
        <div className='flex items-center justify-center text-inactiveC11'>
            <ManageSearchRounded sx={{fontSize:100}}/>
        </div>
        <div className='font-bold text-center text-[22px] text-inactiveC11'>
            {message}
        </div>
    </div>:
    size==="medium"?
    <div className='flex flex-col p-2'>
    <div className='flex items-center justify-center text-inactiveC11'>
        <ManageSearchRounded sx={{fontSize:65}}/>
    </div>
    <div className='font-bold text-center text-[16px] text-inactiveC11'>
        {message}
    </div>
    </div>
    :
    size==="small"?
    <div className='flex flex-col p-2'>
    <div className='flex items-center justify-center text-inactiveC11'>
        <ManageSearchRounded sx={{fontSize:45}}/>
    </div>
    <div className='font-bold text-center text-[12px] text-inactiveC11'>
        {message}
    </div>
    </div>
    :null
    }
   </>
  )
}

export default NoDataMessage
