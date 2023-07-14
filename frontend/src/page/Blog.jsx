import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Flex, Heading, Text, Image, Center } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../redux/blog/blog.action';
import BlogCard from '../components/BlogCard';
import jwtDecode from 'jwt-decode';
import "./blog.css";
import DeleteBlog from '../components/DeleteBlog';
const Blog = () => {
  const { isError , isLoading, data } = useSelector((store) => store.blog)
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const user = token?jwtDecode(token): null;
  //console.log(data)
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])
  return (
    <Box>
        <Flex>
        <Sidebar />
        <Center></Center>
         <Box bg={"gray.400"} width={"100%"}>
          <Heading textAlign={"center"}>
            You Can Read Blogs Here
          </Heading>
          <Box className='blogBox'>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : isError ? (
            <Text>Error occurred while fetching data.</Text>
          ) : (
            data?.map((blog) => (
              // <Box key={i} className='blogCard'>
              //   <Image src={bl.image} />
              //   <Heading>{bl.title}</Heading>
              //   <Text>{bl.content}</Text>
              //   <Text>{bl.author["name"]}</Text>
              //   <span><DeleteBlog />  </span>
              //   </Box>
              <BlogCard key={blog._id} blog={blog} user={user} />
            ))
          )}
          </Box>
         </Box>
        </Flex>
    </Box>
  )
}

export default Blog