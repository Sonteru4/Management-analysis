import { combineReducers } from "redux";
import { isTemplateExpression } from "typescript";
import {authReducer} from './reducers/authReducer'


export const rootReducer=combineReducers({
    authReducer,
    // userReducer,
    // projectReducer,
    // taskReducer
})