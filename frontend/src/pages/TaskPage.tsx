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
import TopBar from "../components/TopBar";
import ChangeStatusModal from "../modals/ChangeStatusModal";


function TaskPage() {
  const [userProfileModal,setUserProfileModal]=useState<Boolean>(false)
  const [editTaskModal,setEditTaskModal]=useState<Boolean>(false)
  const [viewMediaModal,setViewMediaModal]=useState<any>({isOpen: false, mediaData: null})
  const [deleteTaskModal,setDeleteTaskModal]=useState<Boolean>(false)
  const [viewMemberModal,setViewMemberModal] = useState<any>({isOpen: false, memberData: null})
  const [addMediaModal,setAddMediaModal] = useState<Boolean>(false)
  const [taskStatusModal,setTaskStatusModal] = useState<Boolean>(false)
  const [activeTask,setActiveTask]= useState<any>({})
  const [rerender, setRerender] = useState<Boolean>(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    Object.keys(activeTask).length!==0?
    window.document.title = activeTask?.taskTitle:window.document.title ="TMS"
  },[activeTask])

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
      <div className="flex flex-col md:flex-row h-[100vh] text-C11 relative">
      <TopBar
        activePage="projectpage"
        setUserProfileModal={setUserProfileModal}
        />
      <Sidebar 
      activePage="task-page"
      setUserProfileModal={setUserProfileModal}
      />
      {
        activeTask?._id?
        <div className="py-10 px-5 sm:px-10 flex-col md:flex-row flex flex-1 pt-20 max-h-[100vh] overflow-y-auto  gap-2 ">
          {/* Task Info */}
          <div className="flex flex-col w-full md:max-w-[50%] lg:max-w-[60%] h-fit">
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
      {
  activeTask?.assignedTo?._id===myProfiledata?._id||activeTask?.assignedBy?._id ===myProfiledata?._id?

          <div className="flex flex-col flex-1 gap-2 mb-10 md:mb-0">
            <TaskPageTaskStatusMarker
            triggerRerender={triggerRerender}
            setTaskStatusModal={setTaskStatusModal}  
            myProfiledata={myProfiledata}           
            activeTask={activeTask}
             />
          </div>:null
        }

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
          triggerRerender={triggerRerender}
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
        {
          viewMediaModal.isOpen?
          <ViewMediaModal
          mediaData={viewMediaModal.mediaData}
          setViewMediaModal={setViewMediaModal}

          />:null
        }
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
          triggerRerender={triggerRerender}
          activeTask={activeTask}
          setAddMediaModal={setAddMediaModal} 
          />:null
      }
      {
        taskStatusModal?
        <ChangeStatusModal
        triggerRerender={triggerRerender}
        activeTask={activeTask}
        setTaskStatusModal={setTaskStatusModal}
        />:null
      }

      </div>
    </>
  );
}

export default TaskPage;
