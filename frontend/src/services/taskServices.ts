import axios from "axios"
import { ENV } from "../env/environment"

export const getTaskById =async(taskId:any)=>{
    let taskData
    await axios.get(`${ENV}/get-task-by-id/${taskId}`).then((res:any)=>{
        console.log("(inservice)RESPONSE TO GET TASK BY ID : ",res.data)
        taskData = res.data
    }).catch((err:any)=>{
        console.log("(inservice)ERROR TO GET TASK BY ID : ",err)
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