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
import APIResponseStatus from "../common/APIResponseStatus";


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
  const [networkError,setNetworkError] = useState<Boolean>(false)
  const [pageLoading, setPageLoading] = useState<any>("not-loaded")
  
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
    await getUserById(myUserId).then((res:any)=>{
      console.log("in DAHBOARD FUNCTION: ",res);
      if(res.code==="ERR_NETWORK"){
        setNetworkError(true)
        console.log("NETWORK ERROR ") 
      }else{

        dispatch(authActions.loginAction(res))
      }
    }).catch((err:any)=>{
      setNetworkError(true)
      console.log("NETWORK ERROR ",err) 
    })
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
    await getTaskById(taskId).then((res:any)=>{
      console.log("in TASKPAGE RETURNED TASK ",res.code);
      if(res.code==="ERR_NETWORK"){
        setNetworkError(true)
        console.log("NETWORK ERROR ")
        setPageLoading("error")
      }
      else{
        setPageLoading("loaded")
        setActiveTask(res)
      }
    }).catch((err:any)=>{
      console.log(err)
    })
  }

  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };


  return (
    <>
    {
      pageLoading==="loaded"?
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

        </div>
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
          type="task"
          activeTask={activeTask}
          triggerRerender={triggerRerender}
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
      :pageLoading==="not-loaded"?
      <div className="flex items-center justify-center flex-1 w-full h-[100vh]">
      <div className="flex justify-center  text-[16px] font-light ">
       <div>Accumulating Task Details...</div>
      </div>
  </div>:
  <div className="flex items-center justify-center flex-1 w-full h-[100vh]">
  <APIResponseStatus status={false} message={`${networkError?"Network Error":"An Error Occured"}`}/>
  </div>
    }
    </>
  );
}

export default TaskPage;
