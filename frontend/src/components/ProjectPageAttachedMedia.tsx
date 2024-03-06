import React from 'react'
import { colors } from '../Constants'
import { AttachFile, Description, PictureAsPdf, InsertPhoto, AudioFile, VideoFile, FilePresent, Add } from '@mui/icons-material'
import { sampleMedia } from '../data/data'
import { Tooltip } from '@mui/material'
import NoDataMessage from '../common/NoDataMessage'

function ProjectPageAttachedMedia(props:any) {
  const {setAddMediaModal,setViewMediaModal,activeProject}=props
  return (
   <>
     <div >
        <div className='flex flex-row gap-2 '>
        <AttachFile sx={{fontSize:25,color:colors.C11,rotate:"45deg"}}/>
        <h2 className="font-bold text-[18px]">Attached Media</h2>
        <Tooltip title={"Add New Media"} arrow placement="right">
                <button
                  onClick={() => setAddMediaModal(true)}
                  className="text-C55 flex flex-row items-center  rounded-[4px] text-[12px] cursor-pointer "
                >
                  <Add sx={{ fontSize: 20, color: colors.C11 }} />
                </button>
        </Tooltip>
        </div>
        <div className='flex mt-2 flex-wrap flex-row gap-5 py-2  px-1 max-w-[90%] overflow-y-auto max-h-[300px]'>
            {
                activeProject?.attachedMediaURLSet.map((node:any)=>(
                    <Tooltip title="View" placement='top' arrow>
                    <a className='flex flex-row p-2 pr-4 justify-center items-center  bg-C44 gap-2 hover:bg-[#ededed] cursor-pointer border-b-2 border-transparent hover:border-C11'
                    href={node.dataURL} target='_blank'rel='noreferrer' 
                    >
                        <div className=''>
                            {node.type==="docx"?
                            <Description/>:
                             node.type==="pdf"?
                             <PictureAsPdf/>:
                             node.type==="png"||node.type==="jpeg"||node.type==="svg"?
                             <InsertPhoto/>:
                             node.type==="wav"||node.type==="mp3"?
                             <AudioFile/>:
                             node.type==="mp4"||node.type==="mkv"||node.type==="mov"?
                             <VideoFile/>:
                             <FilePresent/>
                            }
                        </div>
                        <div className=' text-[10px] max-w-[90%] break-words'>{node.fileName}</div>
                    </a>
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
