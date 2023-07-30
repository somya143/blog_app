import { Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateBlog } from '../redux/blog/blog.action';

const EditBlog = React.memo(({blog,token,socket,userId,author,user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [post , setPost] = useState({...blog});
    const dispatch = useDispatch();
    const toast = useToast();
    const handleChange = (e) => {
        setPost({...post, [e.target.name] : e.target.value})
    }
    const showToastMessage = () => {
      toast({
        title: 'Hello Anonymos Person!',
        description: 'You are not authorized to Edit this blog.',
        status: 'error',
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    };
    const showErrorToast = () => {
      toast({
        title: `Hello ${user.name} `,
        description: `You have missed following input. Kindly fill to edit`,
        status: 'error',
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    };
    const handleClick = () => {
      if(!post.title || !post.content){
        return showErrorToast();
        
      }
      if(author._id===userId && author !== null){
        dispatch(updateBlog({
            id:blog._id,
            token,
            socket,
            title:post.title,
            content :post.content
        }))}
        else{(showToastMessage())}
        onClose()
    }
  return (
    <>
     <Button onClick={onOpen} mt={"20px"} width={"100%"} fontSize={"21px"} bg={"orange"}>Edit</Button>
     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody  
              maxH="60vh"
              overflowY="auto"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "blue",
                  borderRadius: "24px",
                },
              }}
              >
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type='text' value={post.title} name='title' onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea value={post.content} name='content' onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClick} >
              {"Update"}
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})

export default EditBlog