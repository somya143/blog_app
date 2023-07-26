import { 
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
Button,
useDisclosure,
useToast,
Text } from '@chakra-ui/react'
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../redux/blog/blog.action';

const DeleteBlog = ({token,id,user,blog,socket}) => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { author } = blog;
    const showToastMessage = () => {
      toast({
        title: 'Hello Anonymos Person!',
        description: 'You are not authorized to delete this blog.',
        status: 'error',
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    };
    const handleClick = () => {
       (author._id===user.id && author !== null)? (dispatch(deleteBlog({id,token,socket}))) : (showToastMessage())
       onClose()
        }
  return (
    <>
      <Button onClick={onOpen} 
        mt={"20px"}
        fontSize="20px"
        w="100%"
        bg={"red"}
        color="black"
        _hover={{ color: "red", bg: "white", w:"98%" }} >Delete</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this blog</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClick}>
              Yes
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

  
}

export default DeleteBlog