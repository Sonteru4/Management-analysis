import axios from "axios"
import { ENV } from "../env/environment"

export const getTaskById =async(taskId:any)=>{
    let taskData
    await axios.get(`${ENV}/get-task-by-id/${taskId}`).then((res:any)=>{
        console.log("(inservice)RESPONSE TO GET TASK BY ID : ",res.data)
        taskData = res.data
    }).catch((err:any)=>{
        console.log("(inservice)ERROR TO GET TASK BY ID : ",err)
        taskData=err
    })
    return taskData
}

export const editTaskById = async(taskId:string,newTaskData:any)=>{
    let editTaskResult
    await axios.put(`${ENV}/edit-task-by-id/${taskId}`,newTaskData).then((res:any)=>{
        console.log("(inservice)RESPONSE TO EDIT TASK BY ID : ",res.data)
        editTaskResult = res.data
    }).catch((err:any)=>{
        console.log("(inservice)ERROR TO EDIT TASK BY ID : ",err)
        editTaskResult=err
    })
    return editTaskResult
}

export const deleteTaskById = async(taskId:string)=>{
    let deleteTaskResult
    await axios.delete(`${ENV}/delete-task-by-id/${taskId}`).then((res:any)=>{
        console.log("(inservice)RESPONSE TO EDIT TASK BY ID : ",res.data)
        deleteTaskResult = res.data
    }).catch((err:any)=>{
        console.log("(inservice)ERROR TO EDIT TASK BY ID : ",err)
    })
    return deleteTaskResult
}

export const changeTaskStatus = async(taskId:string,status:string)=>{
    let changeTaskStatusResult
    await axios.put(`${ENV}/change-task-status-by-id/${taskId}`,{newStatus:status}).then((res:any)=>{
        console.log("(inservice)RESPONSE TO CHANGE TASK STATUS BY ID : ",res.data)
        changeTaskStatusResult = res.data
    }).catch((err:any)=>{
        console.log("(inservice)ERROR TO CHANGE TASK STATUS BY ID : ",err)
    })
    return changeTaskStatusResult
}

export const addCommentToTaskById = async(taskId:string,commentData:any)=>{
    let addCommentResult
    await axios.post(`${ENV}/add-comment-to-task-by-id/${taskId}`,commentData).then((res:any)=>{
        addCommentResult = res.data
        console.log("(inservice) ADD COMMENT RESULT :",res.data)
    }).catch((err:any)=>{
        addCommentResult = err
        console.log("(inservice) ADD COMMENT ERROR :",err)
    })
    return addCommentResult
}


export const  addMediaToTask = async(taskId:string,mediaDataArray:any)=>{
    let mediaUploadResult
    await axios.post(`${ENV}/add-media-to-task/${taskId}`,{mediaDataArray:mediaDataArray}).then((res:any)=>{
        mediaUploadResult = res.data
        console.log("(INSERVICE) UPLOAD MEDIA RESPONSE",res)
    }).catch((err:any)=>{
        mediaUploadResult = err
        console.log("(INSERVICE) UPLOAD MEDIA ERROR",err)
    })
    return mediaUploadResult
}

export const  deleteMediaFromTask = async(taskId:string,mediaURL:any)=>{
    let mediaDeleteResult
    await axios.delete(`${ENV}/remove-media-from-task/${taskId}`,{data:{mediaURL}}).then((res:any)=>{
        mediaDeleteResult = res.data
        console.log("(INSERVICE) DELETE MEDIA RESPONSE",res)
    }).catch((err:any)=>{
        mediaDeleteResult = err
        console.log("(INSERVICE) DELETE MEDIA ERROR",err)
    })
    return mediaDeleteResult
}