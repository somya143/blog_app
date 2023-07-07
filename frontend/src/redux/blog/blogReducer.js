import { delete_blog_failure, delete_blog_loading, delete_blog_success, get_blog_failure, get_blog_loading, get_blog_success, post_blog_failure, post_blog_loading, post_blog_success, update_blog_failure, update_blog_loadng, update_blog_success } from "./blog.actionType"

const initialBlogState = {
    blogs : [],
    isLoading : false,
    isError : false
}

 const blogReducer = (state= initialBlogState , {type,payload}) => {
    switch(type){
        case get_blog_loading : {
            return {
                ...state,
                isLoading : true,
                isError : false
            }
        }
        case get_blog_success : {
            return {
                ...state,
                blogs : [...payload] ,
                isLoading : false,
                isError : false
            }
        }
        case get_blog_failure : {
            return {
                ...state,
                isError: true,
                isLoading : false
            }
        }
        case post_blog_loading : {
            return {
                ...state,
                isError : false,
                isLoading : true,
            }
        }
        case post_blog_success : {
            return {
                ...state,
                isError : false,
                isLoading : false,
                blogs : payload
            }
        }
        case post_blog_failure : {
            return {
                ...state,
                isError : true,
                isLoading : false
            }
        }
        case delete_blog_loading : {
            return {
                ...state,
                isError : false,
                isLoading : true
            }
        }
        case delete_blog_success : {
            return {
                ...state,
                isError : false,
                isLoading : false,
                blogs : state.blogs.filter(el => el._id!==payload )
            }
        }
        case delete_blog_failure : {
            return {
                ...state,
                isError : true,
                isLoading : false
            }
        }
        case update_blog_loadng : {
            return {
                ...state,
                isError : false,
                isLoading : true,
            }
        }
        case update_blog_success : {
            return {
                isError : false,
                isLoading : false,
                blogs : state.blogs.map(el => el._id===payload._id? payload:el)
            }
        }
        case update_blog_failure : {
            return {
                isError : true,
                isLoading : false
            }
        }
        default : return state
    }
}

export default blogReducer;