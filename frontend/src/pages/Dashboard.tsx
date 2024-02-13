import React, { useState } from "react";
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
import CreateNewProjectModal from "../modals/CreateNewProjectModal";
import OverallPerformaceModal from "../modals/OverallPerformaceModal";
import { performanceData } from "../data/data";
import Sidebar from "../components/Sidebar";
import UserProfileModal from "../modals/UserProfileModal";
import Loader from "../common/Loader";

function Dashboard() {
  document.title = "TMS • Dashboard";
  const [createNewProjectModal,setCreateNewProjectModal]=useState<Boolean>(false)
  const [overallPerformaceModal,setOverallPerformanceModal]=useState<Boolean>(false)
  const [userProfileModal,setUserProfileModal]=useState<Boolean>(false)

  return (
    <>
      <div className="flex flex-row h-[100vh] text-C11 relative">

      <Sidebar 
      setUserProfileModal={setUserProfileModal}
      />
        <div className="bg-C55 p-10 flex-1 pt-20 max-h-[100vh] overflow-y-auto">
          <div className="flex flex-row items-center pr-10 ">
          <DashboardGreeting />
          <CircularGraph 
          color={colors.C11} 
          trackColor={colors.C44} 
          percentage={85}
          setOverallPerformanceModal={setOverallPerformanceModal}

          />
          </div>
          <div className=" flex flex-row justify-between pt-10 gap-[150px]">
            <DashboardPendingTasks />
            <DashboardCompletedTasks />
            
          </div>
         <DashboardMyProjects
         setCreateNewProjectModal={setCreateNewProjectModal} 
         />
         <DashboardProjectsInvolved/>
        </div>

        {/* ---- Active Modals----  */}

        {
         //Create project modal
          createNewProjectModal?
          <CreateNewProjectModal
          setCreateNewProjectModal={setCreateNewProjectModal}
          />:null
        }

        {
          // Overall Performance project modal
          overallPerformaceModal?
          <OverallPerformaceModal
          data = {performanceData[1]}
          setOverallPerformanceModal={setOverallPerformanceModal}
          />:null
        }

        {
          // User Profile Modal
          userProfileModal?
          <UserProfileModal 
          setUserProfileModal={setUserProfileModal}
          />:null
        }

        

        
      </div>
    </>
  );
}

export default Dashboard;
