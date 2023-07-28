import { auth_login_failure, auth_login_loading, auth_login_success, auth_register_failure, auth_register_loading, auth_register_success, auth_signout } from "./auth.actionType"
import axios from "axios";

export const getRegister = (payload) => async(dispatch) => {
    dispatch({type: auth_register_loading})
    try {
    const response = await axios.post("http://localhost:8080/auths/signup", payload);
    dispatch({type: auth_register_success , payload : response.data})
    payload.socket.emit("new-user-signedup" , response.data)
    return response.data; 
    } catch (error) {
        dispatch({type: auth_register_failure , payload : error.message})
        
    }
}

export const getLogin = (paylaod) => async(dispatch) => {
    dispatch({type: auth_login_loading});
    try {
    const response = await axios.post("http://localhost:8080/auths/login", paylaod);
    if(response.data && response.data.error === false){
    dispatch({ type: auth_login_success, payload: response.data });
    }else{
    dispatch({type: auth_login_failure , payload : response.data })
   }  
  console.log(response.data)
   } catch (error) {
        dispatch({type: auth_login_failure , payload : error.message})

    }
}

export const getSignout = () => {
    return ({type: auth_signout})
}