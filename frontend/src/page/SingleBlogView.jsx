import { Box, Center, Flex, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import moment from "moment";

const SingleBlogView = () => {
  const { token } = useSelector((store) => store?.auth);
  const {data} = useSelector((store) => store?.blog);  
  const { id } = useParams();
  const user = token? jwtDecode(token):null;
  const [blog , setBlog] = useState(null);
  const formattedDate = useMemo(() => {
    return moment(new Date(blog?.createdAt?.toLocaleString())).format(
      ` MMMM Do YYYY, h:mm:ss a`
  )
  }, [blog])
  useEffect(() => {
    data && setBlog(data.find((el) => el._id === id));
  }, [data,id])
  console.log(blog)
  //console.log(blog.author.name)
  return (
    <Box  minh="100vh" bg="rgba(0,0,0,91%)">
        
          <Box w="90%" m="auto" py="20px " pb="70px">
            { blog?.author && blog.author!==null &&   (<Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
             Author's Name : {blog.author.name}
          </Text>)}

           <Text color={"#fff"}>
            {formattedDate}
          </Text>
          <Image
              src={blog?.image}
              w="100%"
              h="60vh"
              objectFit="cover"
              mb="10px"
            />

            <Text
              fontWeight="800"
              fontSize="2rem"
              color="whiteAlpha.800"
              mb="10px"
            >
              {blog?.title}
            </Text>
            <Text
              fontWeight="200"
              fontSize="1.5rem"
              color="whiteAlpha.800"
              mb="10px"
            >
              {blog?.content}
            </Text>
          </Box>
        
    </Box>
  )
}

export default SingleBlogView