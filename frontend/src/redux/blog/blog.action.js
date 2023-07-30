import axios from "axios";
import { comment_blog_failure, comment_blog_loading, comment_blog_success, delete_blog_failure, delete_blog_loading, delete_blog_success, get_blog_failure, get_blog_loading, get_blog_success, like_blog_failure, like_blog_loading, like_blog_success, post_blog_failure, post_blog_loading, post_blog_success, remove_comment_failure, remove_comment_loading, remove_comment_success, unlike_blog_failure, unlike_blog_loading, unlike_blog_success, update_blog_failure, update_blog_loadng, update_blog_success } from "./blog.actionType";
import { axios_instance } from "../../utils/axios_instance";


export const getBlogs = (page=1,limit=2) => async(dispatch) => {
    dispatch({ type: get_blog_loading });
    try {
        const response =  await axios.get(`http://localhost:8080/blogs?page=${page}&limit=${limit}`);
        dispatch({ type: get_blog_success, payload: response.data })
        return response.data;
        } catch (error) {
        dispatch({ type: get_blog_failure , payload: error.message });
    }
  };


export const createBlog = ({title,content,image,token,socket}) => async(dispatch) => {
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
        socket.emit("new-blog" , data)
    } catch (error) {
        dispatch({ type: post_blog_failure , payload: error.message });
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
        const response = await axios.delete(`http://localhost:8080/blogs/${payload.id}`, {headers: {authorization: payload.token}});
        if(!response.data.error){
            dispatch({ type: delete_blog_success , payload : payload.id})
            payload.socket.emit("delete-blog" , payload.id)
        }else{
            dispatch({ type: delete_blog_failure , payload : payload.id })
        }
    } catch (error) {
        dispatch({ type: delete_blog_failure , payload: error.message})
    }
}

export const updateBlog = (payload) => async(dispatch) => {
    dispatch({ type: update_blog_loadng });
    try {
        const response = await axios_instance.patch(`http://localhost:8080/blogs/${payload.id}`, {
            title : payload.title,
            content : payload.content
        },
        {
            headers : { authorization : payload.token}
        });
        if(!response.data.error){
            dispatch({ type: update_blog_success , payload: response.data.patchData });
            payload.socket.emit("update-blog" , response.data.patchData)
        }else{
            dispatch({ type: update_blog_failure})
        }
    } catch (error) {
        dispatch({ type: update_blog_failure , payload : error.message });
    }
}

export const likeBlog = (payload) => async (dispatch) => {
    dispatch({ type : like_blog_loading });
    try {
        const response = await axios_instance.patch(`http://localhost:8080/likes/likeBlog` , {
            blogId: payload.blogId,
            likesCount : payload.likesCount,
        },
        {
            headers : {authorization : payload.token}
        })
        if(!response.data.error){
            dispatch({ type: like_blog_success , payload : response.data.data })
            payload.socket.emit("add-like" , response.data.data )
        }else{
            dispatch({ type: like_blog_failure })
        }

    } catch (error) {
        dispatch({ type: like_blog_failure , payload : error.message })
    }
}

export const removeBlogLike = (payload) => async(dispatch) => {
    dispatch({ type: unlike_blog_loading });
    try {
        const response = await axios_instance.patch(`http://localhost:8080/likes/unlikeBlog` , {
            blogId:payload.blogId,
            likesCount:payload.likesCount
        },
        {
            headers : {authorization : payload.token}
        })
        if(!response.data.error){
            dispatch({ type: unlike_blog_success , payload : response.data.data })
            payload.socket.emit("remove-like" , response.data.data )
        }else{
            dispatch({ type: unlike_blog_failure })
        }
    } catch (error) {
        dispatch({ type:unlike_blog_failure , payload:error.message })
    }
}

export const commentBlog = (payload) => async(dispatch) => {
    dispatch({ type: comment_blog_loading });
    try {
        const response = await axios_instance.post(`http://localhost:8080/comments` , {
            blogId : payload.blogId,
            comment : payload.comment
        },
        {
            headers : { authorization : payload.token}
        });
        if(!response.data.error){
            dispatch({ type:comment_blog_success , payload: response.data.commentData })
            payload.socket.emit("new-comment" , response.data.commentData);
        }else{
            dispatch({ type: comment_blog_failure });
        }
    } catch (error) {
        dispatch({ type: comment_blog_failure , payload : error.message })
    }
}

export const removeComment = (payload) => async(dispatch) => {
    dispatch({ type: remove_comment_loading });
    try {
        const response = await axios_instance.patch(`http://localhost:8080/comments` , {
            blogId : payload.blogId,
            commentId : payload.commentId
        },
        {
            headers : {authorization : payload.token}
        })
        if(!response.data.error){
            dispatch({ type: remove_comment_success , payload : response.data.data });
            payload.socket.emit("remove-comment",response.data.data)
        }else{
            dispatch({ type: remove_comment_failure });
        }
    } catch (error) {
        dispatch({ type:remove_comment_failure , payload: error.message })
    }
}