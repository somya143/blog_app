import axios from "axios";
import { delete_blog_failure, delete_blog_loading, delete_blog_success, get_blog_failure, get_blog_loading, get_blog_success, post_blog_failure, post_blog_loading, post_blog_success, update_blog_failure, update_blog_loadng, update_blog_success } from "./blog.actionType";
import { axios_instance } from "../../utils/axios_instance";


export const getBlogs = () => async(dispatch) => {
    dispatch({ type: get_blog_loading });
    try {
        const response =  await axios.get(`http://localhost:8080/blogs`);
        
        dispatch({ type: get_blog_success, payload: response.data });
        console.log(response.data.blog[0].author.name)
        return response.data.blog;
        } catch (error) {
        dispatch({ type: get_blog_failure , payload: error.message });
        //console.log(error.message)
    }
  };


export const createBlog = ({title,content,image,token}) => async(dispatch) => {
    dispatch({ type: post_blog_loading });
    try {
        const { data } = await axios_instance.post(
            `http://localhost:8080/blogs`,
            { title, content, image },
            {
              headers: {
                authorization: token,
              },
            }
          );
        dispatch({ type: post_blog_success , payload: data});
        
    } catch (error) {
        dispatch({ type: post_blog_failure , payload: error.message });
        console.log(error.message)
    }
}

export const getSingleBlog = (id) => async(dispatch) => {
    dispatch({ type: get_blog_loading });
    try {
        const response = await axios.get(`http://localhost:8080/blogs/${id}`);
        dispatch({ type: get_blog_failure , payload : response.data});
        return response.data;
    } catch (error) {
        dispatch({ type: get_blog_failure, payload: error.message})
    }
}

export const deleteBlog = (payload) => async(dispatch) => {
    dispatch({ type: delete_blog_loading });
    try {
        const response = await axios.delete(`http://localhost:8080/blogs/${payload.id}`, {headers: {"authorization": payload.token}});
        if(!response.data.error){
            dispatch({type: delete_blog_success , payload: response.data });
            //return response.data
        }else{
            dispatch({ type: delete_blog_failure , payload : response.data.error })
        }
        console.log(response.data);
    } catch (error) {
        dispatch({ type: delete_blog_failure , payload: error.message})
    }
}

export const updateBlog = (payload) => async(dispatch) => {
    dispatch({ type: update_blog_loadng });
    try {
        const response = await axios_instance.patch(`http://localhost:8080/blogs/${payload.id}`);
        dispatch({ type: update_blog_success , payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: update_blog_failure , payload : error.message });
    }
}