import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Flex, Heading, Text, Image, Center } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../redux/blog/blog.action';
const Blog = () => {
  const { isError , isLoading, data } = useSelector((store) => store.blog)
  const dispatch = useDispatch();
  console.log(data)
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])
  return (
    <Box>
        <Flex>
        <Sidebar />
        <Center></Center>
         <Box>
          <Heading textAlign={"center"}>
            You Can Read Blogs Here
          </Heading>
          <Box>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : isError ? (
            <Text>Error occurred while fetching data.</Text>
          ) : (
            data?.map((bl, i) => (
              <Box key={i}>
                <Heading>{bl.title}</Heading>
                <Text>{bl.content}</Text>
               <Image src={bl.image} /> 
              </Box>
            ))
          )}
          </Box>
         </Box>
        </Flex>
    </Box>
  )
}

export default Blog