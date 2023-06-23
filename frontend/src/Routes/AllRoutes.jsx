import { Route, Routes } from "react-router-dom";
import Register from "../page/Register";
import Home from "../page/Home";
import Login from "../page/Login";
import Blog from "../page/Blog";

const AllRoutes = () => {
  return (
    <div>
     <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/blogs" element={<Blog></Blog>}></Route>
     </Routes>
    </div>
  )
}

export default AllRoutes