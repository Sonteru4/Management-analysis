import React, { useState } from "react";
import ProjectPageProjectInfo from "../components/ProjectPageProjectInfo";
import ProjectPageMyTasks from "../components/ProjectPageMyTasks";
import ProjectPageProjectMembers from "../components/ProjectPageProjectMembers";
import ProjectPageAttachedMedia from "../components/ProjectPageAttachedMedia";
import AddNewTaskModal from "../modals/AddNewTaskModal";
import ViewAllTaskModal from "../modals/ViewAllTaskModal";
import Sidebar from "../components/Sidebar";
import UserProfileModal from "../modals/UserProfileModal";
import OverallPerformaceModal from "../modals/OverallPerformaceModal";
import { performanceData } from "../data/data";
import RemoveMemberConfirmationModal from "../modals/RemoveMemberConfirmationModal";
import ViewMemberModal from "../modals/ViewMemberModal";
import EditProjectInfoModal from "../modals/EditProjectInfoModal";
import AddNewMemberModal from "../modals/AddNewMemberModal";
import DeleteProjectConfirmationModal from "../modals/DeleteProjectConfirmationModal";
import ProjectPageAddMediaModal from "../modals/ProjectPageAddMediaModal";
import ViewMediaModal from "../modals/ViewMediaModal";

function ProjectPage() {
  const [addTaskModal,setAddTaskModal]=useState<Boolean>(false)
  const [viewAllTaskModal,setViewAllTaskModal] = useState<Boolean>(false)
  const [userProfileModal,setUserProfileModal]=useState<Boolean>(false)
  const [overallPerformaceModal,setOverallPerformanceModal]=useState<Boolean>(false)
  const [removeMemberModal,setRemoveMemberModal] = useState<Boolean>(false)
  const [viewMemberModal,setViewMemberModal] = useState<Boolean>(false)
  const [viewMediaModal,setViewMediaModal]=useState<Boolean>(false)
  const [editProjectInfoModal,setEditProjectInfoModal] = useState<Boolean>(false)
  const [addMemberModal,setAddMemberModal] = useState<Boolean>(false)
  const [deleteProjectModal,setDeleteProjetModal] = useState<Boolean>(false)
  const [addMediaModal,setAddMediaModal] = useState<Boolean>(false)


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
        setEditProjectInfoModal={setEditProjectInfoModal}
        setViewMemberModal={setViewMemberModal}
        setDeleteProjetModal={setDeleteProjetModal}

        />
        <div className=" flex flex-row justify-between pt-10 gap-[200px]">
          {/* my Taks tasks */}
          <ProjectPageMyTasks/>

          {/* Project Members */}
          <ProjectPageProjectMembers
            setAddMemberModal={setAddMemberModal}
            setViewMemberModal={setViewMemberModal}
            setRemoveMemberModal={setRemoveMemberModal}
          />

        </div>
        <div className="flex flex-row items-start gap-3 mt-10 ">
        <div className="w-[60%] ">
          {/* Attached Media */}
          <ProjectPageAttachedMedia 
          setAddMediaModal={setAddMediaModal}
          setViewMediaModal={setViewMediaModal}
          />
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
      {
        // Remove Memeber Confirmation Modal
        removeMemberModal?
        <RemoveMemberConfirmationModal
        setRemoveMemberModal={setRemoveMemberModal}
        />
        :null
      }

      {/* View Project Memeber modal */}
      {
        viewMemberModal?
        <ViewMemberModal
        setViewMemberModal={setViewMemberModal}
        />:null
      }
              {/* {
      viewMediaModal?
          <ViewMediaModal
          dataURL={"https://www.clickdimensions.com/links/TestPDFfile.pdf"}
          setViewMediaModal={setViewMediaModal}

          />:null
        } */}

      {
        editProjectInfoModal?
        <EditProjectInfoModal
        setEditProjectInfoModal={setEditProjectInfoModal}
        />:null
      }

      {
        addMemberModal?
        <AddNewMemberModal
        setAddMemberModal={setAddMemberModal}
        />:null
      }
      {
        deleteProjectModal?
        <DeleteProjectConfirmationModal
        setDeleteProjetModal={setDeleteProjetModal}
        />:null
      }
      {
        addMediaModal?
          <ProjectPageAddMediaModal
          setAddMediaModal={setAddMediaModal} 
          />:null
      }



 
    </div>
  );
}

export default ProjectPage;
