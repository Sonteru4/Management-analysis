import axios from "axios"
import { ENV } from "../env/environment";

export const createNewProject =async(projectDetails:any,userId:any)=>{
    let newProjectData
    await axios.post(`${ENV}/create-new-project-for-user-id/${userId}`,projectDetails).then((res:any)=>{
        console.log("Create Project Response", res)
        newProjectData = res.data
    }).catch((err:any)=>{
        newProjectData= err
    }) 
    return  newProjectData;
}

export const getProjectById = async(projectId:any)=>{
    let projectData
    await axios.get(`${ENV}/get-project-by-id/${projectId}`).then((res:any)=>{
        console.log("RESPONSE TO GET PROJECT BY ID : ",res.data)
        projectData = res.data
    }).catch((err:any)=>{
        console.log("ERROR TO GET PROJECT BY ID : ",err)
    })
    return projectData
}

export const deleteProjectById = async(projectId:any)=>{
    let deleteResult
    await axios.delete(`${ENV}/delete-project-by-id/${projectId}`).then(()=>{
        deleteResult="SUCCESSFULLY DELETED!"
    }).catch((error:any)=> {
        deleteResult= error.response.statusText
    });
   return deleteResult
}