import { auth_login_failure, auth_login_loading, auth_login_success, auth_register_failure, auth_register_loading, auth_register_success, auth_signout } from "./auth.actionType"

const token = localStorage.getItem("token")
const refreshToken = localStorage.getItem("refreshToken")

const initialState = {
    isAuth : !!token,
    isLoading : false,
    isError : false,
    token,
    refreshToken,
    isSignUp : false
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
        isAuth: false,
        isLoading : false,
        isError : false,
        isSignUp : true
    }
 }
 case auth_register_failure : {
    return {
        ...state,
        isError: true,
        isLoading: false
    }
 }
 case auth_login_loading : {
    return {
        ...state,
        isLoading: true,
        isError: false,
    }
 }
 case auth_login_success : {
   if(!payload.error){
       localStorage.setItem("token", payload?.token)
       localStorage.setItem("refreshToken",payload?.token)
       
       return {
           ...state,
           isAuth: true,
           isError: false,
           isLoading: false,
           isSignUp : false,
           token : payload.token,
           refreshToken : payload.refreshToken
       }
       }
       return {
        ...state,
        isAuth: false,
        isError: false,
        isLoading: false,
        isSignUp : false,
        token : payload.token,
        refreshToken : payload.refreshToken
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
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    return {
        ...state,
        isAuth: false,
        token : "",
        refreshToken : "",
        isError: false,
        isLoading: false,
        isSignUp : false
    }
 }
 default : return state
}
}

export default authReducer;