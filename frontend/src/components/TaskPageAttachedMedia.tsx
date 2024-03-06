import { Add, AttachFile, AudioFile, Description, FilePresent, InsertDriveFile, InsertPhoto, PictureAsPdf, VideoFile } from '@mui/icons-material'
import React from 'react'
import { colors } from '../Constants'
import { sampleMedia } from '../data/data'
import { Tooltip } from '@mui/material'
import NoDataMessage from '../common/NoDataMessage'

function TaskPageAttachedMedia(props:any) {
    const{setViewMediaModal,setAddMediaModal ,activeTask}=props
  return (
    <>
    <div className='my-10'>
        <div className='flex flex-row gap-2'>
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
                activeTask?.taskAttachedMediaURLSet.map((node:any)=>(
                    <Tooltip title="View" placement='top' arrow>

                    <button 
                    onClick={()=>setViewMediaModal(true)}
                    className='flex flex-row p-2 pr-4 justify-center items-center  bg-C44 gap-2 hover:bg-[#ededed] cursor-pointer border-b-2 border-transparent hover:border-C11'>
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
                        <div className=' text-[10px] max-w-[90%] break-words '>{node.fileName}</div>
                    </button>
                    </Tooltip>
                ))

            }
        </div>
        {
          activeTask?.taskAttachedMediaURLSet.length===0&&
          <NoDataMessage message="No Media Regarding this Task" size="small"/>
        }
    </div>
    </>
  )
}

export default TaskPageAttachedMedia
