import axios from "axios";
import { delete_blog_loading, delete_blog_success, get_blog_failure, get_blog_loading, get_blog_success, post_blog_failure, post_blog_loading, post_blog_success, update_blog_loadng } from "./blog.actionType";


export const getBlog = () =>  async(dispatch) => {
    dispatch({ type: get_blog_loading});
    try {
        const response = await axios.get("http://localhost:8080/blogs");
        dispatch({type: get_blog_success , payload : response.data});
        return response.data
    } catch (error) {
        dispatch({type: get_blog_failure , payload: error.message})
    }
}

export const createBlog = () => async(dispatch) => {
    dispatch({ type: post_blog_loading });
    try {
        const response = await axios.post("http://localhost:8080/blogs");
        dispatch({ type: post_blog_success , payload: response.data});
        return response.data;
    } catch (error) {
        dispatch({ type: post_blog_failure , payload: error.message });
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
    dispatch({ type: delete_blog_loading });
    try {
        const response = await axios.delete(`http://localhost:8080/blogs/${id}`);
        dispatch({type: delete_blog_success , payload: response.data });
        return response.data
    } catch (error) {
        dispatch({ type: delete_blog_success , payload: error.message})
    }
}

export const updateBlog = () => async(dispatch) => {
    dispatch({ type: update_blog_loadng });
    try {
        const response = await axios.
    } catch (error) {
        
    }
}