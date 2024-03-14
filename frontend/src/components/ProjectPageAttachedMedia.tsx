import React from 'react'
import { colors } from '../Constants'
import { AttachFile, Description, PictureAsPdf, InsertPhoto, FilePresent, Add } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import NoDataMessage from '../common/NoDataMessage'

function ProjectPageAttachedMedia(props:any) {
  const {setAddMediaModal,setViewMediaModal,activeProject,myProfiledata}=props
  const isUserProjectMember = activeProject?.projectMembers.some((member:any) => member._id === myProfiledata?._id);
  return (
   <>
     <div className='w-full lg:w-1/2' >
        <div className='flex flex-row justify-between gap-2 md:justify-start'>
        <div className='flex flex-row items-center '>
        <AttachFile sx={{fontSize:25,color:colors.C11,rotate:"45deg"}}/>
        <h2 className="font-bold text-[18px]">Attached Media</h2>
          </div>  
        {isUserProjectMember&&
        <Tooltip title={"Add New Media"} arrow placement="right">
                <button
                  onClick={() => setAddMediaModal(true)}
                  className="text-C55 flex flex-row items-center  rounded-[4px] text-[12px] cursor-pointer "
                >
                  <Add sx={{ fontSize: 20, color: colors.C11 }} />
                </button>
        </Tooltip>
        }
        </div>
        <div className='flex mt-2 flex-wrap flex-col sm:flex-row gap-2 md:gap-5 py-2  px-1 md:max-w-[90%] overflow-y-auto max-h-[300px]'>
            {
                activeProject?.attachedMediaURLSet.map((node:any)=>(
                    <Tooltip title="View" placement='top' arrow key={node.mediaURL}>
                      <div 
                      onClick={()=>setViewMediaModal({[`isOpen`]:true,[`mediaData`]:node})}
                      className='flex flex-row p-2 pr-4 md:justify-center items-center  bg-C44 gap-2 hover:bg-[#ededed] cursor-pointer border-b-2 border-transparent hover:border-C11' 
                      >
                          <div className='hidden md:flex'>
                              {node.mediaType===".txt"?
                              <Description/>:
                               node.mediaType==="application/pdf"?
                               <PictureAsPdf/>:
                               (node.type === "image/jpeg"||node.type === "image/jpg"||node.type === "image/png")?
                               <InsertPhoto/>:
                               <FilePresent/>
                              }
                          </div>
                          <div className=' text-[10px] md:max-w-[90%] break-words'>{node?.mediaName}</div>
                      </div>                 
                    </Tooltip>
                ))

            }
        </div>
            {activeProject?.attachedMediaURLSet.length===0?
              <NoDataMessage size="small" message="No Media Regarding This Project"/>:null}
    </div>
   
   </>
  )
}

export default ProjectPageAttachedMedia
