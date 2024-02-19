import { AccountCircle, Logout } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import Logo from '../common/Logo'
import { Link } from 'react-router-dom'
import { colors } from '../Constants'

function Sidebar(props:any) {
    const{setUserProfileModal,setLogoutModal}=props
  return (
    <div className="bg-C44 w-[60px] pt-2 flex flex-col">
    <div className="flex-1 ">
    <Tooltip title="Dashboard" placement="right" arrow>
    <Link to="/dashboard">
        <div className="flex justify-center py-2 cursor-pointer">
          <Logo size={"0.5"} color={colors.C11} />
        </div>
      </Link>
    </Tooltip>
    <Tooltip title="Profile" placement="right" arrow className='mx-auto '>
      <button className="flex justify-center py-2 cursor-pointer"
       onClick={()=>setUserProfileModal(true)}
      >
        <AccountCircle sx={{ fontSize: 30, color: colors.C11 }} />
      </button>
    </Tooltip>
    </div>
    <Tooltip title="Logout" placement="right" arrow>
      <button className="flex justify-center py-4 cursor-pointer"
      onClick={()=>setLogoutModal(true)}
      >
        <Logout sx={{ fontSize: 20, color: colors.C11 }} />
      </button>
    </Tooltip>
  </div>
  )
}

export default Sidebar
