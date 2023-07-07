import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../redux/blog/blog.action';
import { useNavigate, useParams } from "react-router-dom"

const Blog = () => {
  const {isError , isLoading , blogs} = useSelector((store) => store.blog);
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
   console.log(Array.isArray(blogs))
   console.log(blogs.length)
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])
  return (
    <Box>
        <Flex>
        <Sidebar />
        
         <Box>
          <Heading textAlign={"center"}>
            You Can Read Blogs Here
          </Heading>
          <Box>
            {
              blogs?.map((bl,i) => {
                return(
                  <Box key={i}>
                    
                    bl = {bl}
                  </Box>
                )
              })
            }
          </Box>
         </Box>
        </Flex>
    </Box>
  )
}

export default Blog