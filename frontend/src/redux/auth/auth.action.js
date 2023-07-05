import { auth_login_failure, auth_login_loading, auth_login_success, auth_register_failure, auth_register_loading, auth_register_success, auth_signout } from "./auth.actionType"
import axios from "axios";

export const getRegister = (cred) => async(dispatch) => {
    dispatch({type: auth_register_loading})
    try {
    const response = await axios.post("http://localhost:8080/auths/signup", cred);
    dispatch({type: auth_register_success , payload : response.data})
    console.log(response.data)
    return response.data; 
    } catch (error) {
        dispatch({type: auth_register_failure , payload : error.message})
        
    }
}

export const getLogin = (Credential) => async(dispatch) => {
    dispatch({type: auth_login_loading});
    try {
    const response = await axios.post("http://localhost:8080/auths/login", Credential);
    dispatch({type: auth_login_success , payload: response.data});
    return response.data;    
    } catch (error) {
        dispatch({type: auth_login_failure , payload : error.message})
    }
}

export const getSignout = () => {
    return ({type: auth_signout})
}