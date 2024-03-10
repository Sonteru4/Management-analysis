import { Close } from '@mui/icons-material'
import React from 'react'
import { Document,Page  } from 'react-pdf'
import { pdfjs } from 'react-pdf';


  function ViewMediaModal(props:any) {
  const{setViewMediaModal ,mediaData}=props

   // function to close this modal
   const handleModalClose=()=>{
    setViewMediaModal(false)    
}
  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 shadow-xl max-h-[500px]' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        {mediaData.mediaName}
      </div>
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>
      </div> 

      <div className='flex items-center justify-center mt-3 mb-4 '>
        <img src={mediaData?.mediaURL} className='border max-h-[400px] border-black aspect-auto' alt="" />
      </div>  
    </div>
  </div>
  )
}

export default ViewMediaModal
