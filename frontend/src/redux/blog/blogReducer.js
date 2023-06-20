import { blog_failure, blog_loading, blog_success } from "./blog.actionType"

const initialBlogState = {
    blog : [],
    isLoading : false,
    isError : false
}

const blogReducer = (state= initialBlogState , {type,payload}) => {
    switch(type){
        case blog_loading : {
            return {
                ...state,
                isLoading : true,
                isError : false
            }
        }
        case blog_success : {
            return {
                ...state,
                blog : payload,
                isLoading : false,
                isError : false
            }
        }
        case blog_failure : {
            return {
                ...state,
                isError: true,
                isLoading : false
            }
        }
        default : return state
    }
}