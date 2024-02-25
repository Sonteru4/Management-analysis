import React from 'react'
import { projectMembers } from '../data/data';
import { Add, Close } from '@mui/icons-material';
import APIResponseStatus from '../common/APIResponseStatus';
import NoDataMessage from '../common/NoDataMessage';

function OverallPerformaceModal(props:any) {
    const{setOverallPerformanceModal,data}=props;

    // function to close this modal
    const handleModalClose=()=>{
        setOverallPerformanceModal(false)    
    }

  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[700px]' >
      <div className='flex flex-row items-center justify-between'>
      <div className='font-bold text-[20px] text-C11'>
        Overall Performace
      </div>
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>
      </div>
      {/* <APIResponseStatus status={true} message={"Successfully updated"}/> */}
      {/* <APIResponseStatus status={false} message={"An Error Occured"}/> */}
      {/* <NoDataMessage message={"No users Currently"} size={"small"}/>
      <NoDataMessage message={"No users Currently"} size={"medium"}/>
      <NoDataMessage message={"No users Currently"} size={"large"}/> */}



 
      
    </div>
  </div>
  )
}

export default OverallPerformaceModal
