import { AccountCircle, Logout } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import ViewMemberModal from "../modals/ViewMemberModal";
import TaskPageAddMediaModal from "../modals/TaskPageAddMediaModal";
import { getUserDetailsFromToken } from "../services/authServices";
import { getUserById } from "../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../redux/actions/authActions"
import { getTaskById } from "../services/taskServices";


function TaskPage() {
  const [userProfileModal,setUserProfileModal]=useState<Boolean>(false)
  const [editTaskModal,setEditTaskModal]=useState<Boolean>(false)
  const [viewMediaModal,setViewMediaModal]=useState<Boolean>()
  const [deleteTaskModal,setDeleteTaskModal]=useState<Boolean>(false)
  const [viewMemberModal,setViewMemberModal] = useState<any>({isOpen: false, memberData: null})
  const [addMediaModal,setAddMediaModal] = useState<Boolean>(false)
  const [activeTask,setActiveTask]= useState<any>(null)
  const [rerender, setRerender] = useState<Boolean>(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const existingUser:any = getUserDetailsFromToken()
    console.log("EXISITING USER ID : ",existingUser)

    if (existingUser?._id) {
       getMyProfileData(existingUser._id)
    }
    else{
      navigate("/login") 
    }
  }, []);
  const getMyProfileData =async(myUserId:any)=>{
    const tempOBJ = await getUserById(myUserId)
    console.log("in DAHBOARD FUNCTION: ",tempOBJ);
    dispatch(authActions.loginAction(tempOBJ))
}
    
  const myProfiledata = useSelector(
    (state: any) => state.authReducer.myUserProfile
  );

  useEffect(() => {
    const queryString = window.location.search;
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    const taskId = urlParams.get("id");
    console.log("TaskID in TASKPAGE : ", taskId);
    if (taskId) {
      getTaskData(taskId)
    }
    else{
      navigate("*")
    }
  }, [rerender]);

  const getTaskData=async(taskId:any)=>{
    const tempOBJ = await getTaskById(taskId)
    console.log("in TASKPAGE RETURNED TASK ",tempOBJ);
    setActiveTask(tempOBJ)
  }

  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };


  return (
    <>
      <div className="flex flex-row h-[100vh] text-C11 relative">
      <Sidebar 
      activePage="task-page"
      setUserProfileModal={setUserProfileModal}
      />
      {
        activeTask?._id?
        <div className=" p-10 flex-row flex flex-1 pt-20 max-h-[100vh] overflow-y-auto  gap-2">
          {/* Task Info */}
          <div className="flex flex-col  max-w-[60%]   h-fit">
            <TaskPageTaskInfo 
            triggerRerender={triggerRerender}
            myProfiledata={myProfiledata}
            setDeleteTaskModal={setDeleteTaskModal}
            setEditTaskModal={setEditTaskModal}
            setViewMemberModal={setViewMemberModal}
            activeTask={activeTask}

            />
            <TaskPageAttachedMedia 
            myProfiledata={myProfiledata}
            activeTask={activeTask}
            setViewMediaModal={setViewMediaModal}
            setAddMediaModal={setAddMediaModal} 
            />
          </div>

          <div className="flex flex-col flex-1 gap-2 ">
            {/* <div className=" text-[#cfcfcf]  h-[600px] border-2 border-C44 rounded-[8px] bg-C44 justify-center items-center flex">
              No Media Selected
            </div> */}
            <TaskPageTaskStatusMarker  
            myProfiledata={myProfiledata}           
            activeTask={activeTask}
             />
          </div>
        </div>:
        <div className="flex items-center justify-center flex-1 w-full">
            <div className="flex justify-center mt-[100px] text-[16px] font-light ">
             <div>Accumulating Task Details...</div>
            </div>
        </div>

      }

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
          triggerRerender={triggerRerender}
          activeTask={activeTask}
          data={"data"}
          setEditTaskModal={setEditTaskModal}
          />:null
        }
        {/* {
          viewMediaModal?
          <ViewMediaModal
          data={"datae"}
          setViewMediaModal={setViewMediaModal}

          />:null
        } */}
        {
          deleteTaskModal?
          <DeleteTaskConfirmationModal
          activeTask={activeTask}
          setDeleteTaskModal={setDeleteTaskModal}
          />:null
        }
        {
        viewMemberModal.isOpen?
        <ViewMemberModal
        memberData ={viewMemberModal.memberData}
        setViewMemberModal={setViewMemberModal}
        />:null
      }
       {
        addMediaModal?
          <TaskPageAddMediaModal
          setAddMediaModal={setAddMediaModal} 
          />:null
      }

      </div>
    </>
  );
}

export default TaskPage;
