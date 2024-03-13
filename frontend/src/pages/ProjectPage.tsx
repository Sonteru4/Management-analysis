import React, { useEffect, useState } from "react";
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
import { getProjectById } from "../services/projectServices";
import * as projectActions from "../redux/actions/projectActions"
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsFromToken } from "../services/authServices";
import { getUserById } from "../services/userServices";
import * as authActions from "../redux/actions/authActions"
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar";


function ProjectPage() {
  const [addTaskModal,setAddTaskModal]=useState<Boolean>(false)
  const [viewAllTaskModal,setViewAllTaskModal] = useState<Boolean>(false)
  const [userProfileModal,setUserProfileModal]=useState<Boolean>(false)
  const [overallPerformaceModal,setOverallPerformanceModal]=useState<Boolean>(false)
  const [removeMemberModal,setRemoveMemberModal] = useState<any>({isOpen: false, memberData: null})
  const [viewMemberModal,setViewMemberModal] = useState<any>({isOpen: false, memberData: null})
  const [viewMediaModal,setViewMediaModal]=useState<any>({isOpen: false, mediaData: null})
  const [editProjectInfoModal,setEditProjectInfoModal] = useState<Boolean>(false)
  const [addMemberModal,setAddMemberModal] = useState<Boolean>(false)
  const [deleteProjectModal,setDeleteProjetModal] = useState<Boolean>(false)
  const [addMediaModal,setAddMediaModal] = useState<Boolean>(false)
  const [activeProject,setActiveProject] =  useState<any>({})
  const [rerender, setRerender] = useState(false);
  const [myTasks,setMytasks] = useState<any>([])
  const [pendingTasks,setPendingTasks] = useState<any>([])
  const [completedTasks,setCompletedTasks] = useState<any>([])


  const navigate = useNavigate()

  const myProfiledata = useSelector(
    (state: any) => state.authReducer.myUserProfile
  );

  useEffect(()=>{
    Object.keys(activeProject).length!==0?
    window.document.title = activeProject?.projectName:window.document.title ="TMS"
  },[activeProject])
  

  useEffect(() => {
    const queryString = window.location.search;
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);
    const projectId = urlParams.get("id");
    console.log("projectID in projectProject : ", projectId);
    if (projectId) {
      getProjectData(projectId)
    }
    else{
      navigate("*") 
    }
  }, [rerender]);




  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };

  const getProjectData=async(projectId:any)=>{
    const tempOBJ = await getProjectById(projectId)
    console.log("in PROJECTPAGE RETURNED PROJECT ",tempOBJ);
    setActiveProject(tempOBJ)
    // dispatch(projectActions.setActiveProjectAction(tempOBJ))
  }

  useEffect(()=>{
    if (activeProject?.allTasks) {
      const tasks = activeProject.allTasks;

      const pending = tasks.filter((task: any) => task.taskStatus === 'In Progress');
      const completed = tasks.filter((task: any) => task.taskStatus === 'Completed');

      setPendingTasks(pending);
      setCompletedTasks(completed);
    }

  },[activeProject])




  // const activeProject = useSelector(
  //   (state: any) => state.projectReducer.activeProject
  // );
const dispatch = useDispatch()
useEffect(() => {
  const existingUser:any = getUserDetailsFromToken()
  console.log("EXISITING USER ID : ",existingUser)

  if (existingUser?._id) {
     getMyProfileData(existingUser._id)
  }
  else{
    navigate("*") 
  }
}, []);

const getMyProfileData =async(myUserId:any)=>{
  const tempOBJ = await getUserById(myUserId)
  console.log("in DAHBOARD FUNCTION: ",tempOBJ);
  dispatch(authActions.loginAction(tempOBJ))

}





  







  return (
    <div className="flex flex-col md:flex-row h-[100vh] text-C11 relative">
      <TopBar
        activePage="projectpage"
        setUserProfileModal={setUserProfileModal}
        />
     <Sidebar 
      setUserProfileModal={setUserProfileModal}
      activePage="project-page"
      />
      {
        activeProject?._id?
      <div className=" bg-C55 py-10 px-5 sm:px-10 flex-1 pt-20 max-h-[100vh] overflow-y-auto">
        {/* Project Info */}
        <ProjectPageProjectInfo
        completedTasks={completedTasks}
        activeProject={activeProject} 
        setAddTaskModal={setAddTaskModal}
        setViewAllTaskModal = {setViewAllTaskModal} 
        setOverallPerformanceModal={setOverallPerformanceModal}
        setEditProjectInfoModal={setEditProjectInfoModal}
        setViewMemberModal={setViewMemberModal}
        setDeleteProjetModal={setDeleteProjetModal}

        />
        <div className=" flex flex-row justify-between pt-10  2xl:gap-[150px] xl:gap-[120px] gap-[50px] flex-wrap lg:flex-nowrap">
          {/* my Taks tasks */}
          <ProjectPageMyTasks setMytasks={setMytasks} activeProject={activeProject} myProfiledata={myProfiledata} myTasks={myTasks}/>

          {/* Project Members */}
          <ProjectPageProjectMembers
            myProfiledata={myProfiledata}
            activeProject={activeProject} 
            setAddMemberModal={setAddMemberModal}
            setViewMemberModal={setViewMemberModal}
            setRemoveMemberModal={setRemoveMemberModal}
          />

        </div>
        <div className="flex flex-row items-start gap-3 mt-10 ">
        <div className="w-full lg:w-[60%] ">
          {/* Attached Media */}
          <ProjectPageAttachedMedia 
          myProfiledata={myProfiledata}
          activeProject={activeProject} 
          setAddMediaModal={setAddMediaModal}
          setViewMediaModal={setViewMediaModal}
          />
        </div>
        <div className='hidden text-[#cfcfcf] flex-1 h-[400px] border-2 border-C44 rounded-[8px] bg-C44 justify-center items-center '>
        No Media Selected
        </div>
        </div>
      </div>:
      <div className="flex items-center justify-center flex-1 w-full">
      <div className="flex justify-center mt-[100px] text-[16px] font-light ">
        <div>Accumulating Project Details...</div>
      </div>
      </div>

      }

    {/*--- Active Modals ----*/}
     { 
    //  Add New Task to project modal
     addTaskModal?
     <AddNewTaskModal 
     triggerRerender={triggerRerender} // Pass the function here
     activeProject={activeProject} 
     setAddTaskModal={setAddTaskModal}
     />:null
     }
     {
      // View all tasks of the project modal 
      viewAllTaskModal?
      <ViewAllTaskModal
      activeProject={activeProject} 
      setViewAllTaskModal = {setViewAllTaskModal} 
      triggerRerender={triggerRerender}
      />:null
     }
     {
      // Show user profile modal
      userProfileModal?
      <UserProfileModal
      triggerRerender={triggerRerender} // Pass the function here
      setUserProfileModal={setUserProfileModal}
      />:null
     }
      {/* {
          // Overall Performance project modal
          overallPerformaceModal?
          <OverallPerformaceModal
          data = {performanceData[1]}
          setOverallPerformanceModal={setOverallPerformanceModal}
          />:null
        } */}
      {
        // Remove Memeber Confirmation Modal
        removeMemberModal.isOpen?
        <RemoveMemberConfirmationModal
        memberData={removeMemberModal.memberData}
        activeProject={activeProject}
        triggerRerender={triggerRerender} // Pass the function here
        setRemoveMemberModal={setRemoveMemberModal}
        />
        :null
      }

      {/* View Project Memeber modal */}
      {
        viewMemberModal.isOpen?
        <ViewMemberModal
        memberData={viewMemberModal.memberData}
        setViewMemberModal={setViewMemberModal}
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
        editProjectInfoModal?
        <EditProjectInfoModal
        triggerRerender={triggerRerender} // Pass the function here
        activeProject={activeProject}
        setEditProjectInfoModal={setEditProjectInfoModal}
        />:null
      }

      {
        addMemberModal?
        <AddNewMemberModal
        activeProject={activeProject}
        triggerRerender={triggerRerender} // Pass the function here
        setAddMemberModal={setAddMemberModal}
        />:null
      }
      {
        deleteProjectModal?
        <DeleteProjectConfirmationModal
        activeProject={activeProject}
        setDeleteProjetModal={setDeleteProjetModal}
        />:null
      }
      {
        addMediaModal?
          <ProjectPageAddMediaModal
          activeProject={activeProject}
          triggerRerender={triggerRerender} // Pass the function here
          setAddMediaModal={setAddMediaModal} 
          />:null
      }



 
    </div>
  );
}

export default ProjectPage;
