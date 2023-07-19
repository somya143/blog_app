import { Box, Flex, VStack, Text, Spacer, Image, Link } from '@chakra-ui/react'
import React from 'react';
import moment from "moment"
import { Link as ReachLink } from "react-router-dom";
import DeleteBlog from './DeleteBlog';
const BlogCard = ({blog,user,token,authorId}) => {
  const { author } = blog
  //console.log(authorId)
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
         {author && author!==null?   (<Text fontSize="20px" fontWeight="400" color="whiteAlpha.800">
             Author's Name : {author.name}
          </Text>)
          :
          (<Text color={"#fff"}>Author is anonymus</Text>)
          }
          <Text color={"#fff"}>
            {moment(new Date(blog.createdAt.toLocaleString())).format(
                ` MMMM Do YYYY, h:mm:ss a`
            )}
          </Text>
        </VStack>
        <Spacer />
     </Flex>
      <Link
       as={ReachLink}
       to={`/SingleBlogView/${blog._id}`}
       >
      <Image 
      src={blog.image}
      objectFit="cover"
      w="100%"
      h="40vh"
      mt="20px"
      alt="blog-banner"
      />
      <Text color={"#fff"}>
        {blog.title}
      </Text>
      <Text color={"#fff"}>
        {blog.content}
      </Text>
      </Link>
      <DeleteBlog id={blog._id} token={token} />
    </Box>
  )
}

export default BlogCard