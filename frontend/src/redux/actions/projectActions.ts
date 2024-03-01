import { ACTIVEPROJECT } from "../types"

export const setActiveProjectAction=(projectData:any)=>{
    console.log("IN ACTIVE PROJECT Action :",projectData)
    return{
        type:ACTIVEPROJECT,
        payload:projectData
    }
}
