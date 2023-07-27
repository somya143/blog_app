import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Flex, Heading, Text, Image, Center } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../redux/blog/blog.action';
import BlogCard from '../components/BlogCard';
import jwtDecode from 'jwt-decode';
import { SocketContext } from '../context/SocketContext';
import "./blog.css";
import Pagination from '../components/Pagination';
const Blog = () => {
  const [page , setPage] = useState(1);
  const { socket } = useContext(SocketContext);
  const { isError , isLoading, data } = useSelector((store) => store?.blog)
  //const { author, title, content } = data;
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store?.auth);
  const user = token?jwtDecode(token): null;
  // let limit = 2;
   //console.log(data)
  // let total;
  // const totalData = () => {
  //    total = Math.floor((data.length)*page)
  // }
  // totalData();

  useEffect(() => {
    dispatch(getBlogs(page))
    }, [dispatch,page])
  //console.log(total)
  return (
    <Box>
        <Flex>
        <Sidebar />
        <Center></Center>
         <Box bg={"gray.400"} width={"100%"} overflowY={"auto"}>
          <Heading textAlign={"center"}>
             Read Blogs Here
          </Heading>
          <Box className='blogBox'>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : isError ? (
            <Text>Error occurred while fetching data.</Text>
          ) : (
            data?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} user={user} token={token} socket={socket} />
            ))
          )}
          </Box>
          
         </Box>
        </Flex>
         <Pagination handlePageClick={(val) => setPage(val)} current={page} />
    </Box>
  )
}

export default Blog