import { FolderShared } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import { colors } from '../Constants'
import { Link } from 'react-router-dom'

function DashboardProjectsInvolved(props:any) {
  const {involvedProjects}=props
  return (
    <>
     <div className="flex flex-col mt-5 sm:mt-20 ">
            <div className="flex flex-row gap-2 py-2">
              <div>
                <FolderShared sx={{ fontSize: 25, color: colors.C11 }} />
              </div>
              <div className="font-bold text-[18px] ">Involved Projects</div>
            </div>
            <div className={`flex flex-wrap flex-col sm:flex-row  w-full  items-center sm:gap-5 py-2 ${involvedProjects.length===0?"justify-start sm:justify-center flex-col-reverse ":""}`}>
                {
                    involvedProjects?.map((node:any)=>(
                    <Tooltip title={"View Project"} placement='top-end' arrow key={node._id}>
                      <Link to={`/project-page?id=${node?._id}`}>
                        <div className="group w-[320px] h-fit sm:h-[140px] bg-C44 rounded-[6px] sm:rounded-[8px] flex flex-col items-start overflow-hidden hover:shadow-lg cursor-pointer transition-all duration-300">
                        <div className="group-hover:h-full h-[75%] text-left bg-C11 flex flex-row gap-1 w-full items-center p-1 sm:p-2  duration-300 justify-start sm:justify-center">
                            <div className="font-semibold text-C55 p-2 text-[12px] sm:text-[16px] group-hover:font-bold group-hover:text-[18px]">{node?.projectName}</div>
                        </div>
                        {/* <div className="flex group-hover:hidden w-full justify-end flex-1 items-center pr-2 transition-all duration-300 bg-red-400 group-hover:w-[0%] group-hover:h-[0%]">
                            <EmojiEvents sx={{ fontSize: 20, color: colors.C11 }} />
                        </div> */}
                        </div>
                      </Link>  
                    </Tooltip>
                    ))
                }
                {
                  // myProjects.length === 0?
                  // <div className='font-bold text-center text-[20px] text-inactiveC11 '>
                  //     Start By Making a New Project
                  //  </div>
                  // :null
                           
                }
            
               
              </div>
          </div>
    </>
  )
}

export default DashboardProjectsInvolved
