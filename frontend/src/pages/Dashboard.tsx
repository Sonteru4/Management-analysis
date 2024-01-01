import React from "react";
import Logo from "../common/Logo";
import { colors } from "../Constants";
import { AccountCircle, Logout } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import DashboardGreeting from "../components/DashboardGreeting";
import DashboardPendingTasks from "../components/DashboardPendingTasks";
import DashboardCompletedTasks from "../components/DashboardCompletedTasks";
import DashboardMyProjects from "../components/DashboardMyProjects";
import DashboardProjectsInvolved from "../components/DashboardProjectsInvolved";
import { Link } from "react-router-dom";
import CircularGraph from "../common/CircularGraph";

function Dashboard() {
  document.title = "TMS • Dashboard";
  return (
    <>
      <div className="flex flex-row h-[100vh] text-C11">
        <div className="bg-C44 w-[60px] pt-2 flex flex-col">
          <div className="flex-1">
          <Tooltip title="Dashboard" placement="right" arrow>
          <Link to="/dashboard">
              <div className="justify-center flex py-2 cursor-pointer">
                <Logo size={"0.5"} color={colors.C11} />
              </div>
            </Link>
          </Tooltip>
          <Tooltip title="Profile" placement="right" arrow>
            <div className="justify-center flex py-2 cursor-pointer">
              <AccountCircle sx={{ fontSize: 30, color: colors.C11 }} />
            </div>
          </Tooltip>
          </div>
          <Tooltip title="Logout" placement="right" arrow>
            <div className="justify-center flex py-4 cursor-pointer">
              <Logout sx={{ fontSize: 20, color: colors.C11 }} />
            </div>
          </Tooltip>
        </div>
        <div className="bg-C55 p-10 flex-1 pt-20 max-h-[100vh] overflow-y-auto">
          <div className=" flex flex-row items-center  pr-10 ">
          <DashboardGreeting />
          <CircularGraph color={colors.C11} trackColor={colors.C44} percentage={85}/>
          </div>
          <div className=" flex flex-row justify-between pt-10 gap-[200px]">
            <DashboardPendingTasks />
            <DashboardCompletedTasks />
            
          </div>
         <DashboardMyProjects/>
         <DashboardProjectsInvolved/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
