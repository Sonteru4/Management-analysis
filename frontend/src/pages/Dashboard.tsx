import React, { useEffect, useState } from "react";
import Logo from "../common/Logo";
import { colors } from "../Constants";
// import { AccountCircle, Logout } from "@mui/icons-material";
// import { Tooltip } from "@mui/material";
import DashboardGreeting from "../components/DashboardGreeting";
import DashboardPendingTasks from "../components/DashboardPendingTasks";
import DashboardCompletedTasks from "../components/DashboardCompletedTasks";
import DashboardMyProjects from "../components/DashboardMyProjects";
import DashboardProjectsInvolved from "../components/DashboardProjectsInvolved";
// import { Link } from "react-router-dom";
import CircularGraph from "../common/CircularGraph";
import CreateNewProjectModal from "../modals/CreateNewProjectModal";
import OverallPerformaceModal from "../modals/OverallPerformaceModal";
import { performanceData } from "../data/data";
import Sidebar from "../components/Sidebar";
import UserProfileModal from "../modals/UserProfileModal";
// import Loader from "../common/Loader";
import LogoutModal from "../modals/LogoutModal";
// import { url } from "inspector";
import { getUserById } from "../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../redux/actions/authActions"
import MagicLoader from "../common/MagicLoader";
import { getUserDetailsFromToken } from "../services/authServices";

function Dashboard() {
  document.title = "TMS • Dashboard";
  const [createNewProjectModal, setCreateNewProjectModal] =
    useState<Boolean>(false);
  const [overallPerformaceModal, setOverallPerformanceModal] =
    useState<Boolean>(false);
  const [userProfileModal, setUserProfileModal] = useState<Boolean>(false);
  const [logoutModal, setLogoutModal] = useState<Boolean>(false);

  const dispatch = useDispatch()

  useEffect(() => {
    const existingUser:any = getUserDetailsFromToken()
    console.log("EXISITING USER ID : ",existingUser)

    if (existingUser._id && !myProfiledata) {
       getMyProfileData(existingUser._id)
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

  console.log("MYPROFILE : ",myProfiledata);
  

  return (
    <>
      {myProfiledata ? (
        <>
          <div className="flex flex-row h-[100vh] text-C11 relative">
            <Sidebar
              activePage="dashboard"
              setUserProfileModal={setUserProfileModal}
              setLogoutModal={setLogoutModal}
            />
            <div className="bg-C55 p-10 flex-1 pt-20 max-h-[100vh] overflow-y-auto">
              <div className="flex flex-row items-center pr-10 ">
                <DashboardGreeting />
                {
                !( myProfiledata?.pendingTasks.length===0||myProfiledata?.completedTasks.length===0)?
                <CircularGraph
                  color={colors.C11}
                  trackColor={colors.C44}
                  percentage={85}
                  setOverallPerformanceModal={setOverallPerformanceModal}
                />:null
                }

              </div>
              <div className=" flex flex-row justify-between pt-10 gap-[150px]">

                {
                 !( myProfiledata?.pendingTasks.length===0||myProfiledata?.completedTasks.length===0)?
                 <>
                 <DashboardPendingTasks 
                 pendingTasks={myProfiledata?.pendingTasks}
                 />
                 <DashboardCompletedTasks 
                 completedTasks={myProfiledata?.completedTasks}
                 />
                 </>
                 :null
                }

              </div>
              
              <DashboardMyProjects
                myProjects={myProfiledata?.myProjects}
                setCreateNewProjectModal={setCreateNewProjectModal}
              />
              {
                !(myProfiledata?.involvedProjects.length===0)&&
              <DashboardProjectsInvolved />
              }
            </div>

            {/* ---- Active Modals----  */}

            {
              //Create project modal
              createNewProjectModal ? (
                <CreateNewProjectModal
                  setCreateNewProjectModal={setCreateNewProjectModal}
                />
              ) : null
            }

            {
              // Overall Performance project modal
              overallPerformaceModal ? (
                <OverallPerformaceModal
                  data={performanceData[1]}
                  setOverallPerformanceModal={setOverallPerformanceModal}
                />
              ) : null
            }

            {
              // User Profile Modal
              userProfileModal ? (
                <UserProfileModal setUserProfileModal={setUserProfileModal} />
              ) : null
            }
            {logoutModal ? (
              <LogoutModal setLogoutModal={setLogoutModal} />
            ) : null}
          </div>
        </>
      ) :
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">

       <div className="flex justify-center text-[16px] font-light ">
            <div>Setting Up Dashboard...</div>
          </div>
      </div> 
      }
    </>
  );
}

export default Dashboard;
