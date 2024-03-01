import { ACTIVEPROJECT } from "../types"

const projectInitialState = {
 activeProject: null,
  };


  export const projectReducer=(state=projectInitialState,action:any)=>{
    switch(action.type){
        case ACTIVEPROJECT:
            return {
                ...state,
                activeProject: action.payload,
              };
}}

