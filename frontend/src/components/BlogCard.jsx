import { Box, Flex, VStack, Text, Spacer, Image, Link } from '@chakra-ui/react'
import React from 'react';
import moment from "moment"
import { Link as ReachLink } from "react-router-dom";
const BlogCard = ({blog,user}) => {
  return (
    <Box bg="blackAlpha.900"
    borderRadius="10px"
    my={5}
    mb="50px"
    key={blog._id}
    padding="2rem"
    width="100%">
     <Flex>
        <VStack align="start">
          {/* <Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
             {blog.author["name"]}
          </Text> */}
          <Text>
            {moment(new Date(blog.createdAt.toLocaleString())).format(
                ` MMMM Do YYYY, h:mm:ss a`
            )}
          </Text>
        </VStack>
        <Spacer />
     </Flex>
      <Link
       as={ReachLink}
       to={`/viewblog/${blog._id}`}
       >
      <Image 
      src={blog.image}
      objectFit="cover"
      w="100%"
      h="40vh"
      mt="20px"
      alt="blog-banner"
      />
      <Text>
        {blog.title}
      </Text>
      <Text>
        {blog.content}
      </Text>
      </Link>
    </Box>
  )
}

export default BlogCard