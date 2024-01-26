import { AccountCircle, Logout } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../Constants";
import Logo from "../common/Logo";
import ProjectPageProjectInfo from "../components/ProjectPageProjectInfo";
import { Link } from "react-router-dom";
import ProjectPageMyTasks from "../components/ProjectPageMyTasks";
import ProjectPageProjectMembers from "../components/ProjectPageProjectMembers";
import ProjectPageAttachedMedia from "../components/ProjectPageAttachedMedia";
import AddNewTaskModal from "../modals/AddNewTaskModal";
import ViewAllTaskModal from "../modals/ViewAllTaskModal";
import Sidebar from "../components/Sidebar";
import UserProfileModal from "../modals/UserProfileModal";
import OverallPerformaceModal from "../modals/OverallPerformaceModal";
import { performanceData } from "../data/data";

function ProjectPage() {
  const [addTaskModal,setAddTaskModal]=useState<Boolean>(false)
  const [viewAllTaskModal,setViewAllTaskModal] = useState<Boolean>(false)
  const [userProfileModal,setUserProfileModal]=useState<Boolean>(false)
  const [overallPerformaceModal,setOverallPerformanceModal]=useState<Boolean>(false)


  return (
    <div className="flex flex-row h-[100vh] text-C11 relative">
     <Sidebar 
      setUserProfileModal={setUserProfileModal}
      />
      <div className=" bg-C55 p-10 flex-1 pt-20 max-h-[100vh] overflow-y-auto">
        {/* Project Info */}
        <ProjectPageProjectInfo 
        setAddTaskModal={setAddTaskModal}
        setViewAllTaskModal = {setViewAllTaskModal} 
        setOverallPerformanceModal={setOverallPerformanceModal}

        />
        <div className=" flex flex-row justify-between pt-10 gap-[200px]">
          {/* my Taks tasks */}
          <ProjectPageMyTasks/>

          {/* Project Members */}
          <ProjectPageProjectMembers/>

        </div>
        <div className="flex flex-row items-start gap-3 mt-10 ">
        <div className="w-[60%] ">
          {/* Attached Media */}
          <ProjectPageAttachedMedia/>
        </div>
        <div className=' text-[#cfcfcf] flex-1 h-[400px] border-2 border-C44 rounded-[8px] bg-C44 justify-center items-center flex'>
        No Media Selected
        </div>
        </div>
      </div>

    {/*--- Active Modals ----*/}
     { 
    //  Add New Task to project modal
     addTaskModal?
     <AddNewTaskModal 
     setAddTaskModal={setAddTaskModal}
     />:null
     }
     {
      // View all tasks of the project modal 
      viewAllTaskModal?
      <ViewAllTaskModal 
      setViewAllTaskModal = {setViewAllTaskModal} 
      />:null
     }
     {
      // Show user profile modal
      userProfileModal?
      <UserProfileModal
      setUserProfileModal={setUserProfileModal}
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
 
    </div>
  );
}

export default ProjectPage;
