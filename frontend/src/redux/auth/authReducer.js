import { auth_login_failure, auth_login_loading, auth_login_success, auth_register_failure, auth_register_loading, auth_register_success, auth_signout } from "./auth.actionType"

const token = localStorage.getItem("token")
const initialState = {
    isAuth : !false,
    isLoading : false,
    isError : false,
    token : token
} 

const authReducer = (state= initialState , {type,payload}) => {
switch(type){
 case auth_register_loading : {
     return {
        ...state,
        isLoading : true,
        isError : false
     }
 }
 case auth_register_success : {
    return {
        ...state,
        isLoading : false,
        isError : false,
        isAuth : true,
    }
 }
 case auth_register_failure : {
    return {
        ...state,
        isAuth: false,
        isError: true,
        isLoading: false
    }
 }
 case auth_login_loading : {
    return {
        ...state,
        isAuth: false,
        isLoading: true,
        isError: false,
    }
 }
 case auth_login_success : {
    localStorage.setItem("token",payload.token)
    return {
        ...state,
        isAuth: true,
        isError: false,
        isLoading: false,
        token : payload.token
    }
 }
 case auth_login_failure : {
    return {
        ...state,
        isError: true,
        isLoading: false,
        isAuth:false
    }
 }
 case auth_signout : {
    localStorage.setItem("token" , null)
    return {
        isAuth: false,
        token : null,
        isError: false,
        isLoading: false
    }
 }
 default : return state
}
}

export default authReducer;