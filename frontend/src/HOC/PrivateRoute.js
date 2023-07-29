import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { isAuth } = useSelector((store) => store?.auth);
    const { pathname } = useLocation()
    if(!isAuth){
        return <Navigate to="/login" state={{from : pathname}} replace />
    }
  return children
}

export default PrivateRoute