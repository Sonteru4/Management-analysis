import axios from "axios"
import { ENV } from "../env/environment";

export const createNewProject =async(projectDetails:any,userId:any)=>{
    let newProjectData
    await axios.post(`${ENV}/create-new-project-for-user-id/${userId}`,projectDetails).then((res:any)=>{
        console.log("(inservice)CREATE PROJECT BY USER ID RESULT:",res);
        newProjectData = res.data
    }).catch((err:any)=>{
        newProjectData= err
    }) 
    return newProjectData;
}

export const getProjectById = async(projectId:any)=>{
    let projectData
    await axios.get(`${ENV}/get-project-by-id/${projectId}`).then((res:any)=>{
        console.log("(inservice) GET PROJECT BY ID RESULT: ",res.data)
        projectData = res.data
    }).catch((err:any)=>{
        projectData=err
        console.log("ERROR TO GET PROJECT BY ID : ",err)
    })
    return projectData
}

export const addTaskToProject = async(projectId:string,taskDetails:any)=>{
    let createdTaskResult
    await axios.post(`${ENV}/add-new-task-by-project-id/${projectId}`,taskDetails).then((res:any)=>{
        console.log("(inservice)ADD TASK RESULT : ",res)
        createdTaskResult = res.data
    }).catch((err:any)=>{
        createdTaskResult = err
        console.log("ERROR IN ADD TASK : ",err)
    })
    return createdTaskResult
}

export const deleteProjectById = async(projectId:string)=>{
    let deleteResult
    await axios.delete(`${ENV}/delete-project-by-id/${projectId}`).then((res:any)=>{
        console.log("(inservice)DELETE PROJECT BY ID RESULT :",res)
        deleteResult=res.data
    }).catch((err:any)=> {
        console.log("(inservice)DELETE PROJECT BY ID ERROR:",err)
        deleteResult= err
    });
   return deleteResult
}

export const editProjectById = async(projectId:string,updatedInfo:any)=>{
    let editResult
    await axios.put(`${ENV}/edit-project-by-id/${projectId}`,updatedInfo).then((res:any)=>{
        console.log("(inservice)EDIT PROJECT BY ID RESULT :",res);
        editResult = res.data
    }).catch((err:any)=>{
        editResult = err
    })
    return editResult;
}

export const addMemberToProject = async(projectId:string,userData:any)=>{
    let addMemberResponse 
    await axios.post(`${ENV}/add-new-member-by-project-id/${projectId}`,userData).then((res:any)=>{
        console.log("(inservice)ADDMEMBER PROJECT BY ID RESULT :",res);
        addMemberResponse = res.data
    }).catch((err:any)=>{
        console.log("(inservice)ERROR ADDMEMBER PROJECT BY ID RESULT :",err);
        addMemberResponse = err
    })
    return addMemberResponse
}

export const deleteMemberFromProject = async(projectId:string,userData:any)=>{
    let removeMemberResponse 
    console.log("USERDATA IN SERVICE",userData.memberId)
    await axios.delete(`${ENV}/remove-member-from-project-by-id/${projectId}`, { data: userData }).then((res:any)=>{
        console.log("(inservice)REMOVE MEMBER FROM PROJECT BY ID RESULT :",res);
        removeMemberResponse = res.data
    }).catch((err:any)=>{
        removeMemberResponse = err
    })
    return removeMemberResponse
}


export const addCommentToProjectById = async(projectId:string,commentData:any)=>{
    let addCommentResult
    await axios.post(`${ENV}/add-comment-to-project-by-id/${projectId}`,commentData).then((res:any)=>{
        addCommentResult = res.data
        console.log("(inservice) ADD COMMENT RESULT :",res.data)
    }).catch((err:any)=>{
        addCommentResult = err
        console.log("(inservice) ADD COMMENT ERROR :",err)
    })
    return addCommentResult
}

export const  addMediaToProject = async(projectId:string,mediaDataArray:any)=>{
    let mediaUploadResult
    await axios.post(`${ENV}/add-media-to-project/${projectId}`,{mediaDataArray:mediaDataArray}).then((res:any)=>{
        mediaUploadResult = res.data
        console.log("(INSERVICE) UPLOAD MEDIA RESPONSE",res)
    }).catch((err:any)=>{
        mediaUploadResult = err
        console.log("(INSERVICE) UPLOAD MEDIA ERROR",err)
    })
    return mediaUploadResult
}

export const  deleteMediaFromProject = async(projectId:string,mediaURL:any)=>{
    let mediaDeleteResult
    console.log("DELETE MEDIA PROJECT ID and URL : ",projectId,"  ",mediaURL)
    await axios.delete(`${ENV}/remove-media-from-project/${projectId}`,{data:{mediaURL}}).then((res:any)=>{
        mediaDeleteResult = res.data
        console.log("(INSERVICE) DELETE MEDIA RESPONSE",res)
    }).catch((err:any)=>{
        mediaDeleteResult = err
        console.log("(INSERVICE) DELETE MEDIA ERROR",err)
    })
    return mediaDeleteResult
}





