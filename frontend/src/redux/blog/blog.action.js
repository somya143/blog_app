import axios from "axios";
import { blog_failure, blog_loading, blog_success } from "./blog.actionType";


export const getBlog = () =>  async(dispatch) => {
    dispatch({ type: blog_loading});
    try {
        const response = await axios.get("http://localhost:8080/blogs");
        dispatch({type: blog_success , payload : response.data});
        return response.data
    } catch (error) {
        dispatch({type: blog_failure , payload: error.message})
    }
}

export const createBlog = () => async(dispatch) => {
    dispatch({ type: blog_loading });
    try {
        const response = await axios.post("http://localhost:8080/blogs");
        dispatch({ type: blog_success , payload: response.data});
        return response.data;
    } catch (error) {
        dispatch({ type: blog_failure , payload: error.message });
    }
}

export const getSingleBlog = (id) => async(dispatch) => {
    dispatch({ type: blog_loading });
    try {
        const response = await axios.get(`http://localhost:8080/blogs/${id}`);
        dispatch({ type: blog_failure , payload : response.data});
        return response.data;
    } catch (error) {
        dispatch({ type: blog_failure, payload: error.message})
    }
}

export const deleteBlog = (id) => async(dispatch) => {
    dispatch({ type:blog_loading });
    try {
        const response = await axios.delete(`http://localhost:8080/blogs/${id}`);
        dispatch({type: blog_success , payload: response.data });
        return response.data
    } catch (error) {
        dispatch({ type: blog_failure , payload: error.message})
    }
}