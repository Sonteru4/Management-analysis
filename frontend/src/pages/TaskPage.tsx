import { AccountCircle, Logout } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../Constants";
import Logo from "../common/Logo";
import TaskPageTaskInfo from "../components/TaskPageTaskInfo";
import TaskPageAttachedMedia from "../components/TaskPageAttachedMedia";
import TaskPageTaskStatusMarker from "../components/TaskPageTaskStatusMarker";
import Sidebar from "../components/Sidebar";
import UserProfileModal from "../modals/UserProfileModal";
import EditTaskModal from "../modals/EditTaskModal";
import ViewMediaModal from "../modals/ViewMediaModal";
import DeleteTaskConfirmationModal from "../modals/DeleteTaskConfirmationModal";

function TaskPage() {
  const [userProfileModal,setUserProfileModal]=useState<Boolean>(false)
  const [editTaskModal,setEditTaskModal]=useState<Boolean>(false)
  const [viewMediaModal,setViewMediaModal]=useState<Boolean>(false)
  const [deleteTaskModal,setDeleteTaskModal]=useState<Boolean>(false)


  return (
    <>
      <div className="flex flex-row h-[100vh] text-C11 relative">
      <Sidebar 
      setUserProfileModal={setUserProfileModal}
      />
        <div className=" p-10 flex-row flex flex-1 pt-20 max-h-[100vh] overflow-y-auto  gap-2">
          {/* Task Info */}
          <div className="flex flex-col  max-w-[60%]   h-fit">
            <TaskPageTaskInfo 
            setDeleteTaskModal={setDeleteTaskModal}
            setEditTaskModal={setEditTaskModal}

            />
            <TaskPageAttachedMedia 
            setViewMediaModal={setViewMediaModal}
            />
          </div>

          <div className="flex flex-col flex-1 gap-2 ">
            {/* <div className=" text-[#cfcfcf]  h-[600px] border-2 border-C44 rounded-[8px] bg-C44 justify-center items-center flex">
              No Media Selected
            </div> */}
            <TaskPageTaskStatusMarker/>
          </div>
        </div>

        {/*--- Active modals--- */}
        {
          // User Profile Modal
          userProfileModal?
          <UserProfileModal 
          setUserProfileModal={setUserProfileModal}
          />:null
        }
        {
          editTaskModal?
          <EditTaskModal
          data={"data"}
          setEditTaskModal={setEditTaskModal}
          />:null
        }
        {
          viewMediaModal?
          <ViewMediaModal
          data={"datae"}
          setViewMediaModal={setViewMediaModal}

          />:null
        }
        {
          deleteTaskModal?
          <DeleteTaskConfirmationModal
          setDeleteTaskModal={setDeleteTaskModal}
          />:null
        }
      </div>
    </>
  );
}

export default TaskPage;
