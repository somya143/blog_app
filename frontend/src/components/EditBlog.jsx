import { Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateBlog } from '../redux/blog/blog.action';

const EditBlog = ({blog,token,socket}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [post , setPost] = useState({...blog});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setPost({...post, [e.target.name] : [e.target.value]})
    }
    const handleClick = () => {
        dispatch(updateBlog({
            id:blog._id,
            token,
            socket,
            title:post.title,
            content :post.content
        }))
    }
  return (
    <>
     <Button onClick={onOpen}>Edit</Button>
     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
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
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditBlog