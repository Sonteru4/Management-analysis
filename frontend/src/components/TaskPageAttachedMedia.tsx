import { Add, AttachFile, Description, FilePresent, InsertPhoto, PictureAsPdf } from '@mui/icons-material'
import React from 'react'
import { colors } from '../Constants'
import { Tooltip } from '@mui/material'
import NoDataMessage from '../common/NoDataMessage'

function TaskPageAttachedMedia(props:any) {
    const{setViewMediaModal,setAddMediaModal ,activeTask ,myProfiledata}=props

  return (
    <>
    <div className='my-10'>
        <div className='flex flex-row gap-2'>
        <AttachFile sx={{fontSize:25,color:colors.C11,rotate:"45deg"}}/>
        <h2 className="font-bold text-[18px]">Attached Media</h2>
        {myProfiledata?._id===activeTask?.assignedBy?._id||myProfiledata?._id===activeTask?.assignedTo._id?
        <Tooltip title={"Add New Media"} arrow placement="right">
                <button
                  onClick={() => setAddMediaModal(true)}
                  className="text-C55 flex flex-row items-center  rounded-[4px] text-[12px] cursor-pointer "
                >
                  <Add sx={{ fontSize: 20, color: colors.C11 }} />
                </button>
        </Tooltip>:null  
        }
        </div>
        <div className='flex mt-2 flex-wrap flex-row gap-5 py-2  px-1 max-w-[90%] overflow-y-auto max-h-[300px]'>
            {
                activeTask?.attachedMediaURLSet?.map((node:any)=>(
                    <Tooltip title="View" placement='top' arrow key={node.mediaURL}>
                    <>{
                      node.mediaType==="image/png"||node.mediaType==="image/jpeg"||node.type==="image/jpg"?  
                      <div 
                      onClick={()=>setViewMediaModal({[`isOpen`]:true,[`mediaData`]:node})}
                      className='flex flex-row p-2 pr-4 md:justify-center items-center  bg-C44 gap-2 hover:bg-[#ededed] cursor-pointer border-b-2 border-transparent hover:border-C11' 
                      >
                          <div className='hidden md:flex'>
                              {node.mediaType===".txt"?
                              <Description/>:
                               node.mediaType==="application/pdf"?
                               <PictureAsPdf/>:
                               node.mediaType==="image/png"||node.mediaType==="image/jpeg"||node.type==="image/jpg"?
                               <InsertPhoto/>:
                               <FilePresent/>
                              }
                          </div>
                          <div className=' text-[10px] md:max-w-[90%] break-words'>{node?.mediaName}</div>
                      </div>  :             
                    <a className='flex flex-row p-2 pr-4 md:justify-center items-center  bg-C44 gap-2 hover:bg-[#ededed] cursor-pointer border-b-2 border-transparent hover:border-C11'
                    href={node?.mediaURL} download target='_blank'rel='noreferrer' 
                    >
                        <div className='hidden md:flex'>
                            {node.mediaType===".txt"?
                            <Description/>:
                             node.mediaType==="application/pdf"?
                             <PictureAsPdf/>:
                             node.mediaType==="image/png"||node.mediaType==="image/jpeg"||node.type==="image/jpg"?
                             <InsertPhoto/>:
                             <FilePresent/>
                            }
                        </div>
                        <div className=' text-[10px] md:max-w-[90%] break-words'>{node?.mediaName}</div>
                    </a>
                    
                    }
                     
                     </> 
                    </Tooltip>
                ))

            }
        </div>
        {
          activeTask?.attachedMediaURLSet.length===0&&
          <NoDataMessage message="No Media Regarding this Task" size="small"/>
        }
    </div>
    </>
  )
}

export default TaskPageAttachedMedia
