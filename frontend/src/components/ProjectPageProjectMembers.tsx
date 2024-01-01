import { Group, Person } from '@mui/icons-material'
import React from 'react'
import { projectMembers } from '../data/data'
import { colors } from '../Constants'
import { Tooltip } from '@mui/material'

function ProjectPageProjectMembers() {
  return (
    <>
    <div className="w-1/2 ">
        <div className="flex flex-row  gap-2 py-1">
          <div>
            <Group sx={{ fontSize: 25 }} />
          </div>
          <div className="font-bold text-[18px]">Project Members</div>
        </div>
        <div className="p-1 flex flex-col gap-2 py-4 overflow-y-auto max-h-[400px]">
          {projectMembers?.map((node: any) => (
            <Tooltip title="View Profile" arrow placement="left">

            <div className="flex flex-row group rounded-[4px]  text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all ">
              <div
                className={`min-w-[10px] group-hover:min-w-[80px] duration-200 flex justify-center items-center bg-C11 p-1 rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
              >
                <div className="hidden text-C55 font-semibold group-hover:flex duration-[1s] px-1">
                  {node.memberRole}
                </div>
              </div>
              <div className='flex items-center px-2'>
              <Person sx={{ fontSize: 12, color: colors.C11 }} />
                <div className="p-2  break-words ">{node.memberName}</div>
              </div>
            </div>
            </Tooltip>
          ))}
        </div>
      </div>

    
    </>
  )
}

export default ProjectPageProjectMembers
