import { Box, FormControl, FormLabel, Heading, Input, Button, Flex, Center, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import useLoginAlert from '../custom/useLoginAlert';
import { createBlog } from '../redux/blog/blog.action';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Write = () => {
  const [title , setTitle] = useState("");
  const [content , setContent] = useState("");
  const [image , setImage] = useState("");
  const { token } = useSelector((store) => store.auth);
  const {isLoading, isError, blog} = useSelector((store) => store.blogs)
  const { loginAlert } = useLoginAlert()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!token){
      return loginAlert()
    }

    dispatch(createBlog({title,content,image,token}))
    setTitle("")
    setContent("")
    setImage("")
    
  }

   if(isLoading){
    return <Loading />
   }else if(isError){
    return <Error />
   }else

  return (
   <Box w={"100vw"} h={"100vh"} backgroundImage={"https://images.unsplash.com/photo-1662643500140-7c2fdf816dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHx3cml0ZSUyMGJsb2dzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
     <Flex>
      <Sidebar />
      <Center  h="100vh" w="100%">
     <Box w="50%" borderRadius={"10px"} >
        <Heading color={"orange"} fontSize={"3.2rem"} fontWeight={700} fontFamily={"sans-serif"} pb={"30px"} textDecoration={"underline"}>
            Post Your Blogs
        </Heading>
    <form action="" onSubmit={handleSubmit}>
 <FormControl>
    
 <FormLabel  mt={"30px"} m={"10px"} color={"green.300"}>Title :</FormLabel>
   <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} color={"#fff"} name='title' />

   <FormLabel m={"10px"} color={"green.300"}>Content :</FormLabel>
   <Textarea type='text' value={content} onChange={(e) => setContent(e.target.value)}  color={"#fff"} name='content' />

  <FormLabel m={"10px"} color={"green.300"}>Image :</FormLabel>
   <Input type='url' value={image} onChange={(e) => setImage(e.target.value)} color={"#fff"}  name='image' />

   
</FormControl>

<Button type='submit' mt={"30px"} w={"100%"} h={"3rem"} fontSize={"27px"} fontWeight={700} backgroundColor={"green.300"} color={"#fff"}>Post Blog</Button>
</form>    
</Box>
</Center>
</Flex>
    </Box>
  )
}

export default Write