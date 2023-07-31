import { Box, Flex, VStack, Text, Spacer, Image, Link } from '@chakra-ui/react'
import React, { useMemo, lazy, Suspense } from 'react';
import moment from "moment"
import { Link as ReachLink } from "react-router-dom";
import DeleteBlog from './DeleteBlog';
import LikeBlog from './LikeBlog';
import Comment from './Comment';
import SpinnerLoading from './SpinnerLoading';
const EditBlog = lazy(() => import("./EditBlog"));

const BlogCard = ({blog,user,token,socket}) => {
  const { author } = blog;
  const formattedDate = useMemo(() => {
   return moment(new Date(blog.createdAt?.toLocaleString())).format(
      ` MMMM Do YYYY, h:mm:ss a`
  )
}, [blog?.createdAt])
  
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
            {formattedDate}
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
          {blog.content?.substring(0, 200)}
          {blog.content?.length > 200 ? "..." : ""}
        </Box>
      </Link>
      <Flex gap={"10px"}>
      <LikeBlog token={token} blogId={blog._id} userId={user? user.id : null} likes={blog.likes} likesCount={blog.likesCount} />
      <Spacer />
      <Comment userId={user?user.id:null} token={token} blogId={blog._id} comments={blog.comment} />
      </Flex>
      <DeleteBlog id={blog._id} blog={blog} token={token} user={user} userId={user?user.id:null}  socket={socket} />
      <Suspense fallback={<div><SpinnerLoading /></div>}>
      <EditBlog id={blog._id} blog={blog} token={token} socket={socket} author={author} userId={user?user.id:null} user={user}  />
      </Suspense>

    </Box>
  )
}

export default BlogCard