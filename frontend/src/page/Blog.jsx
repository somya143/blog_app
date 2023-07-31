import React, { useEffect, useState, useContext, useMemo } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Flex, Heading, Text, Center } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../redux/blog/blog.action';
import BlogCard from '../components/BlogCard';
import jwtDecode from 'jwt-decode';
import { SocketContext } from '../context/SocketContext';
import "./blog.css";
import Pagination from '../components/Pagination';
import SpinnerLoading from '../components/SpinnerLoading';

const Blog = () => {
  const [page , setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const { socket } = useContext(SocketContext);
  const { isError , isLoading, data } = useSelector((store) => store?.blog)
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store?.auth);
  const user = token?jwtDecode(token): null;
  const fetchData = (params) => {
    dispatch(getBlogs(params));
  };
  
  useEffect(() => {
    let params = {
      limit : limit,
      page: page
    };
    fetchData(params);
  }, [dispatch,limit,page]);

  

  const memoisedData = useMemo(() => data, [data]);
  
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
            <Center>
            <SpinnerLoading />
            </Center>
          ) : isError ? (
            <Center>
            <Text>Error occurred while fetching data.</Text>
            </Center>
          ) : (
            memoisedData?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} user={user} token={token} socket={socket} />
            ))
          )}
          </Box>
          
         </Box>
        </Flex>
         {!isError && !isLoading && (<Pagination handlePageClick={(val) => setPage(val)} current={page}  /> )}
    </Box>
  )
}

export default Blog