import { Add, Close } from '@mui/icons-material'
import React from 'react'
import { dummyTasks, projectMembers } from '../data/data'
import { Tooltip } from '@mui/material';

function ViewAllTaskModal(props:any) {
  const {setViewAllTaskModal}=props;

  // function to close the modal
  const handleModalClose=()=>{
    setViewAllTaskModal(false);
  }

  return (
    <div className='top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div className='bg-C55 rounded-[8px] p-5 w-[700px]' >
    <div className='flex flex-row items-center justify-between pb-3'>
      <div className='font-bold text-[20px] text-C11'>
        All Tasks
      </div>
      <button className='cursor-pointer'
      onClick={handleModalClose}
      >
        <Close sx={{fontSize:20,fontWeight:800}}/>
      </button>
      </div>
     {/* tasks  */}
     <div className="p-1 flex flex-col gap-2 py-4 overflow-y-auto max-h-[400px]">
          {dummyTasks?.map((node: any) => (
            <Tooltip title="View Task" arrow placement="right">
            <div className="flex flex-row group rounded-[4px]  text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all ">
              <div
                className={`min-w-[10px] group-hover:min-w-[80px] duration-200 flex justify-center items-center  ${
                  node.priority === "high"
                    ? "bg-highPriority"
                    : node.priority === "medium"
                    ? "bg-mediumPriority"
                    : "bg-lowPriority"
                } p-1 rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
              >
                <div className="hidden text-C11 font-semibold group-hover:flex duration-[1s]">
                  {node.taskID}
                </div>
              </div>
              <div className="p-2 max-w-[80%] break-words">{node.taskName}</div>
            </div>
            </Tooltip>
          ))}
        </div>


     {/*  */}
      {/* <div className='flex justify-end gap-4 mt-2'>
      <button className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[14px] py-2 px-5`} onClick={handleModalClose}>Cancel</button>
        <button className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[14px] py-2 px-5`} >Save</button>
      </div> */}
    </div>
  </div>
  )
}

export default ViewAllTaskModal
