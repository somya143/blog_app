import React, { useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    InputRightElement,
    Input,
    InputGroup,
    useDisclosure
  } from '@chakra-ui/react';
  import useLoginAlert from '../custom/useLoginAlert';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../redux/blog/blog.action';
import { SocketContext } from '../context/SocketContext';
import SingleComment from './SingleComment';

const Comment = ({userId,token,blogId,comments,blogAuthor}) => {
  const [text,setText] = useState("");
  const {isOpen,onClose,onOpen} = useDisclosure();
  const { socket } = useContext(SocketContext);
  const { loginAlert } = useLoginAlert();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!userId){
      return loginAlert()
    }else{
      dispatch(commentBlog({socket,token,blogId,comment:text}))
    }
  }
  return (
    <>
     <Button onClick={onOpen} variant={"unstyled"} color={"blue.600"} fontSize={"20px"} pt={"10px"}>{comments.length===1?`View comment`: comments.length>1?`View All ${comments.length} Comments`:"Comment"}</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
             <form onSubmit={handleSubmit}>
                 <InputGroup>
                   <Input type='text' placeholder='Write your comment here' value={text} onChange={(e) => setText(e.target.value)} />
                   <InputRightElement>
                   <Button type='submit'>Reply</Button>
                   </InputRightElement>
                 </InputGroup>
              </form>
    </ModalHeader>
    <ModalBody maxH="60vh"
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
              }}>
                {
                  comments.map((el) => (
                    <SingleComment key={el._id} blogId={blogId} userId={userId} blogAuthor={blogAuthor} comment={el} />
                  ))
                }
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}

export default Comment