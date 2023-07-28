import { Box, Flex, VStack, Text, Spacer, Image, Link, useToast } from '@chakra-ui/react'
import React, { useState } from 'react';
import moment from "moment"
import { Link as ReachLink } from "react-router-dom";
import DeleteBlog from './DeleteBlog';
import EditBlog from './EditBlog';
import LikeBlog from './LikeBlog';
import Comment from './Comment';

const BlogCard = ({blog,user,token,socket}) => {
  const { author } = blog;
  //console.log(blog)
  //console.log(author)
  //console.log(author._id)
  //console.log(user.id)
  
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
            {moment(new Date(blog.createdAt?.toLocaleString())).format(
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
      <Box fontSize="20px" color="whiteAlpha.800" fontWeight="200">
          {blog.content.substring(0, 200)}
          {blog.content.length > 200 ? "..." : ""}
        </Box>
      </Link>
      <Flex gap={"10px"}>
      <LikeBlog token={token} blogId={blog._id} userId={user? user.id : null} likes={blog.likes} likesCount={blog.likesCount} />
      <Spacer />
      <Comment userId={user?user.id:null} token={token} blogId={blog._id} comments={blog.comment} />
      </Flex>

      <DeleteBlog id={blog._id} blog={blog} token={token} user={user} socket={socket} />
      <EditBlog id={blog._id} blog={blog} token={token} socket={socket} author={author} userId={user?user.id:null}   />
    </Box>
  )
}

export default BlogCard