import { Box } from '@chakra-ui/react'
import React from 'react'
import { FcFullTrash } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../redux/blog/blog.action';

const DeleteBlog = ({id,token}) => {
    const { isError, isLoading ,data } = useSelector((store) => store.blog);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(deleteBlog({id,token}))
    }
  return (
    <>
     {
      isLoading? (
        <h1>...Loading</h1>
      ): isError? (
        <h1>Something went wrong...</h1>
      ): data? <FcFullTrash size={"40"} onClick={handleClick} /> : data
     }
    </>
  )
}

export default DeleteBlog