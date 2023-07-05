import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Center, Flex, Heading, StackDivider, VStack } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { getBlog } from '../redux/blog/blog.action';


const Blog = () => {
  const {isError , isLoading , blog} = useSelector((store) => store.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(blog))
  }, [dispatch,blog])
  return (
    <Box>
        <Flex>
        <Sidebar />
        <Center h={"100vh"} w={"100%"} />
         <Box>
          <Heading textAlign={"center"}>
            You Can Read Blogs Here
          </Heading>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
          >
            {
              blog && blog.map((blogs) => {
                return <Box>
                  title={blogs.title}
                  content={blogs.content}
                </Box>
              })
            }
          </VStack>
         </Box>
        </Flex>
    </Box>
  )
}

export default Blog