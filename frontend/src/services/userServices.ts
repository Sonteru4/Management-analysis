import axios from "axios"
import { ENV } from "../env/environment"
import { loginAction } from "../redux/actions/authActions"
import { useDispatch } from "react-redux"

export const getAllUsers =async()=>{
    let allUsers
    await axios.get(`${ENV}/get-all-users`).then((res:any)=>{
        console.log("ALL users in Cluster : ",res.data)
        allUsers = res.data
    }).catch((err:any)=>{
        allUsers = err
    })
    return  allUsers;
}

export const getUserById =async(userId:any)=>{
    let userData
    console.log("USER ID in userservice : ",userId)
    await axios.get(`${ENV}/get-user-by-id/${userId}`).then((res:any)=>{
        console.log("USERDATA : ",res.data)
         userData= res.data;
        // loginAction(res.data)
    }).catch((err:any)=>{
        userData =err
        console.log("Error : ", err);
    })
    
    return userData
}

export const editUserById = async(userId:string,userData:object)=>{
    let userEditResult
    await axios.put(`${ENV}/update-user-profile/${userId}`,userData).then((res:any)=>{
        console.log("(inservice) EDIT PROFILE RESULT : ",res.data)
        userEditResult= res.data;
    }).catch((err:any)=>{
        userEditResult =err
        console.log("(inservice) EDIT PROFILE ERROR : ", err);
    })
    return userEditResult
}


