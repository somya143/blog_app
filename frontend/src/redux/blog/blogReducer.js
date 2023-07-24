import { comment_blog_failure, comment_blog_loading, comment_blog_success, delete_blog_failure, delete_blog_loading, delete_blog_success, get_blog_failure, get_blog_loading, get_blog_success, like_blog_failure, like_blog_loading, like_blog_success, post_blog_failure, post_blog_loading, post_blog_success, remove_comment_failure, remove_comment_loading, remove_comment_success, unlike_blog_failure, unlike_blog_loading, unlike_blog_success, update_blog_failure, update_blog_loadng, update_blog_success } from "./blog.actionType"

let initialBlogState = {
    data : [],
    isLoading : false,
    isError : false,
}

 const blogReducer = (state= initialBlogState , {type,payload}) => {
    //console.log(type,payload,state.data)
    switch(type){
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
                data : [payload , ...state.data]
            }
        }
        case post_blog_failure : {
            return {
                ...state,
                isError : true,
                isLoading : false
            }
        }
        case get_blog_loading : {
            //console.log(state.data)
            return {
                ...state,
                isLoading : true,
                isError : false
            }
        }
        case get_blog_success : {
            //console.log("blog success")
            return {
                ...state,
                data : [...payload.blog],
                isLoading : false,
                isError : false
            }
        }
        case get_blog_failure : {
            return {
                ...state,
                isLoading : false,
                isError : true
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
            const deleteData = state.data.filter((el) => el._id !== payload )
            console.log(deleteData)
            return {
                ...state,
                isError : false,
                isLoading : false,
                data : deleteData
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
            const updated = state.data.map(el => el._id===payload._id? payload:el);
            return {
                isError : false,
                isLoading : false,
                data : updated
            }
        }
        case update_blog_failure : {
            return {
                isError : true,
                isLoading : false
            }
        }
        case like_blog_loading : {
            return {
                ...state,
                isLoading : true
            }
        }
        case like_blog_success : {
            const likeUpdated = state.data.map((el) => el._id === payload._id? payload : el);
            return {
                ...state,
                isLoading: false,
                isError : false,
                data : likeUpdated
            }
        }
        case like_blog_failure : {
            return {
                ...state,
                isError : true,
                isLoading : false
            }
        }
        case unlike_blog_loading : {
            return {
                ...state,
                isLoading : true,
                isError : false
            }
        }
        case unlike_blog_success : {
           const unlike = state.data.map((el) => el._id === payload._id? payload:el);
           return {
            ...state,
            isLoading: false,
            isError: false,
            data: unlike
           }
        }
        case unlike_blog_failure : {
            return {
            ...state,
            isLoading : false,
            isError : true
            }
        }
        case comment_blog_loading : {
            return {
                ...state,
                isLoading : true,
                isError : false
            }
        }
        case comment_blog_success : {
            const comment = state.data.map((el) => el._id === payload._id? payload:el);
            return {
                ...state,
                isLoading: false,
                isError : false,
                data : comment
            }
        }
        case comment_blog_failure : {
            return {
                ...state,
                isLoading : false,
                isError : true
            }
        }
        case remove_comment_loading : {
            return {
                ...state,
                isLoading : true,
                isError : false
            }
        }
        case remove_comment_success : {
            const remove = state.data.map((el) => el._id === payload._id?payload:el);
            return {
                ...state,
                isLoading : false,
                isError : false,
                data : remove
            }
        }
        case remove_comment_failure : {
            return {
                ...state,
                isLoading : false,
                isError : true
            }
        }
        default : return state
    }
}

export default blogReducer;